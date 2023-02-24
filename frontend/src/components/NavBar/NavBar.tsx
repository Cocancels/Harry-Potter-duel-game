import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
const NavBar = () => {
  const [actualUser, setActualUser] = useState<any>(null);

  window.addEventListener("storage", () => {
    const actualUser = localStorage.getItem("actualUser");
    if (actualUser) {
      setActualUser(JSON.parse(actualUser));
    }
  });

  useEffect(() => {
    const actualUser = localStorage.getItem("actualUser");
    if (actualUser) {
      setActualUser(JSON.parse(actualUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("actualUser");
    setActualUser(null);
  };

  return (
    <nav>
      <ul>
        {actualUser ? (
          <>
            <li>
              <Link to="/game">
                <img src="https://i.ibb.co/J5k9TGc/potter-hat.png" alt="" />
                HarryTour
              </Link>
            </li>
            <li>
              <Link to="/" onClick={handleLogout}>
                Déconnexion
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/character">Create account</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
