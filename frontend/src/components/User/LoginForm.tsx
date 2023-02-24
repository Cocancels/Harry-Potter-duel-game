import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LoginForm.css";
const CreateUserForm = () => {
  const [nickName, setFirstName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const sendForm = (event: any) => {
    let body = {
      name: nickName,
      password: password,
    };

    if (nickName === "" || password === "") {
      setErrorMessage("Merci de remplir tous les champs");
    } else {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      };
      setErrorMessage("");
      fetch("https://hp-api-iim.azurewebsites.net/auth/log-in", requestOptions)
        .then(async (response) => {
          const data = await response.json();

          if (!response.ok) {
            let error = (data && data.message) || response.statusText;

            if (response.status === 500) {
              error = "Mot de passe incorrect.";
            } else if (response.status === 404) {
              error = "Cet utilisateur n'existe pas, veuillez créer un compte.";
            }
            return Promise.reject(error);
          } else {
            localStorage.setItem("userToken", data.token);
          }
        })

        .then(async (response) => {
          let body = {
            nickName,
            password,
          };

          const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          };
          setErrorMessage("");
          fetch("http://localhost:3001/login", requestOptions)
            .then(async (response) => {
              const data = await response.json();
              handleLocalStorage(data);
            })
            .catch((error) => {
              setErrorMessage(error.toString());
            });
        })

        .catch((error) => {
          setErrorMessage(error);
        });
    }
    event.preventDefault();
  };
  const handleLocalStorage = (data: any) => {
    localStorage.setItem("actualUser", JSON.stringify(data.user));
    window.dispatchEvent(new Event("storage"));
    navigate("/game");
  };

  return (
    <div className="container-inscription">
      <form onSubmit={sendForm} className=" harry-potter-form">
        <h2>Connexion</h2>

        <label>
          Nick name:
          <input
            type="text"
            name="nickName"
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>
        <br />
        <br />
        <label>
          Password:
          <input
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <br />

        <input type="submit" value="Submit" />

        <p>{errorMessage}</p>
        <div className="inscription-link">
          Pas de compte ?<Link to="/character"> S'inscrire</Link>
        </div>
      </form>
    </div>
  );
};

export default CreateUserForm;
