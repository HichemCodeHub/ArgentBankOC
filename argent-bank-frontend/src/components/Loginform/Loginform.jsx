import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginSuccess } from "../../redux/authSlice";
import { loginUser } from "../../services/authService"; // Importation de la fonction d'API

import "./Loginform.css";

// Fonction pour valider l'adresse e-mail
const ValidEmail = (email) => {
  const regex = /^\S+@\S+\.\S+$/;
  return regex.test(email);
};

// Fonction pour valider le mot de passe
const ValidPassword = (password) => {
  const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{3,}$/;
  return regex.test(password);
};

function Loginform() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validation de l'email et du mot de passe
    if (!ValidEmail(email)) {
      setErrorMessage("Invalid email address");
      return;
    }

    if (!ValidPassword(password)) {
      setErrorMessage("Invalid password");
      return;
    }

    try {
      // Appel à la fonction d'API de connexion
      const data = await loginUser(email, password);
      const { token, userProfile } = data;

      // Dispatch de l'action loginSuccess
      dispatch(loginSuccess({ token, userProfile }));

      // Sauvegarde du token dans sessionStorage et localStorage
      sessionStorage.setItem("token", token);
      if (rememberMe) {
        localStorage.setItem("token", token);
      }

      // Redirection vers la page du profil utilisateur
      navigate("/user");
    } catch (error) {
      setErrorMessage(error.message); // Affichage de l'erreur
    }
  };

  return (
    <section className="sign-in-content">
      <i className="fa fa-user-circle"></i>
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="input-wrapper">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div className="input-remember">
          <input
            id="remember-me"
            type="checkbox"
            checked={rememberMe}
            onChange={(event) => setRememberMe(event.target.checked)}
          />
          <label htmlFor="remember-me">Remember me</label>
        </div>
        <button className="sign-in-button">Sign In</button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
    </section>
  );
}

export default Loginform;