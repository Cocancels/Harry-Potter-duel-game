import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setUser } from "../../store/User/userSlice";
import "./LoginForm.css";
const CreateUserForm = () => {
  const [nickName, setFirstName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const sendForm = (event: any) => {
    event.preventDefault();
    if (nickName === "" || password === "") {
      setErrorMessage("Merci de remplir tous les champs");
    } else {
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
          handleOnLogin(data);
        })
        .catch((error) => {
          setErrorMessage(error.toString());
        });
    }
  };
  const handleOnLogin = (data: any) => {
    dispatch(setUser(data.user));
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
