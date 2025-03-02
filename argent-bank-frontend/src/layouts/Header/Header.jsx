import React from "react";
import { useSelector, useDispatch } from "react-redux"; // Import des hooks pour accéder au state et dispatcher des actions
import { Link } from "react-router-dom"; // Import de Link pour la navigation entre les pages
import { useNavigate } from "react-router-dom"; // Import de useNavigate pour naviguer programmatiquement
import Logo from "../../assets/img/argentBankLogo.webp"; // Import du logo de la banque
import { logout } from "../../redux/authSlice"; // Import de l'action logout pour déconnecter l'utilisateur
import { clearUserProfile } from "../../redux/userSlice"; // Import de l'action pour effacer les données utilisateur
import "./Header.css"; // Import du fichier CSS pour la mise en forme

function Header() {
  // Récupération du statut de connexion et du nom d'utilisateur depuis Redux
  const isConnected = useSelector((state) => state.auth.token); // Vérifie si l'utilisateur est connecté (token)
  const username = useSelector((state) => state.user.userData?.username); // Récupère le nom d'utilisateur, ajout de l'opérateur de chaînage optionnel

  const dispatch = useDispatch(); // Hook pour envoyer des actions au store Redux
  const navigate = useNavigate(); // Hook pour naviguer vers une autre page de manière programmatique

  /* Fonction pour gérer la déconnexion */
  const logoutHandler = () => {
    dispatch(logout()); // Envoie l'action de déconnexion
    dispatch(clearUserProfile()); // Efface les données utilisateur du Redux store
    sessionStorage.clear(); // Efface les données stockées dans sessionStorage
    localStorage.clear(); // Efface les données stockées dans localStorage
    navigate("/"); // Redirige l'utilisateur vers la page d'accueil après la déconnexion
  };

  return (
    <header>
      <h1 className="sr-only"></h1> {/* Utilisé pour l'accessibilité, cache le titre à l'écran mais le rend accessible pour les lecteurs d'écran */}
      <nav>
        <Link to="/"> {/* Lien vers la page d'accueil */}
          <img src={Logo} alt="Bank Logo" /> {/* Affiche le logo de la banque */}
        </Link>

        {/* Si l'utilisateur est connecté, afficher son nom et un bouton de déconnexion */}
        {isConnected ? (
          <div className="connected">
            <Link to="/user"> {/* Lien vers la page du profil utilisateur */}
              <i className="fa fa-user-circle" /> {/* Icône de l'utilisateur */}
              <p>{username || "User"}</p> {/* Affiche le nom d'utilisateur ou "User" si aucune donnée n'est disponible */}
            </Link>
            <Link to="/" onClick={logoutHandler}> {/* Lien pour se déconnecter */}
              <i className="fa fa-sign-out" /> {/* Icône de déconnexion */}
              <p> Sign out </p> {/* Texte de déconnexion */}
            </Link>
          </div>
        ) : (
          // Si l'utilisateur n'est pas connecté, afficher le lien pour se connecter
          <div className="not-connected">
            <Link to="/signin">
              <i className="fa fa-user-circle"></i> {/* Icône de connexion */}
              <p>Sign In</p> {/* Texte pour se connecter */}
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Header;
