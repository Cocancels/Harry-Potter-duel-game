const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

module.exports = function (app, rooms, database) {
  router.get("/rooms", (req, res) => {
    return res.status(200).json({ rooms });
  });

  router.post("/register", async (req, res) => {
    let firstname = req.body.firstName;
    let lastname = req.body.lastName;
    let house = req.body.house;
    let nickname = req.body.nickName;
    let password = req.body.password;

    let x = bcrypt
      .genSalt(10)
      .then((salt) => {
        return bcrypt.hash(password, salt);
      })
      .then((hash) => {
        return hash;
      })
      .catch((err) => console.error(err.message));

    let hashPassword = await x;

    const sql = `INSERT INTO users (firstname, lastname, house, wins, loses, nickname, password) VALUES ('${firstname}', '${lastname}', '${house}', 0, 0, '${nickname}', '${hashPassword}');
                   INSERT INTO user_character (user_id, maxHealth, maxMana, attack) VALUES (LAST_INSERT_ID(), 100, 100, 10);`;

    database.query(sql, (err, result) => {
      if (err) {
        return res.status(404).json({ err });
      }

      res.send(result);
    });
  });

  router.post("/login", async (req, res) => {
    const nickname = req.body.nickName;
    const password = req.body.password;

    console.log(nickname, password);

    const sql = `SELECT * FROM users WHERE nickname = '${nickname}'`;

    let match = false;
    let user;
    let character;

    database.query(sql, async (err, result) => {
      if (err) {
        return res.status(404).json({ err });
      }

      if (result.length > 0) {
        user = result[0];
        match = await bcrypt.compare(password, user.password);

        if (match) {
          const sql2 = `SELECT * FROM user_character WHERE user_id = '${user.id}'`;

          database.query(sql2, (err, result) => {
            if (err) {
              return res.status(404).json({ err });
            }

            character = result[0];
            user = { ...user, character };
            return res.status(200).json({ user });
          });
        } else {
          return res.status(404).json({ err: "Wrong password" });
        }
      } else {
        return res.status(404).json({ err: "User not found" });
      }
    });
  });

  app.use(router);
};
