import React, { useState } from "react"; // Importation de React et du hook useState
import { useDispatch, useSelector } from "react-redux"; // Importation de useDispatch et useSelector de Redux
import { updateUsername } from "../../redux/userSlice"; // Importation de l'action updateUsername de userSlice
import { updateUsernameAPI } from "../../services/userService"; // Importation de la fonction API
import "./Userdata.css"; // Importation du fichier CSS pour le style

/* Fonction pour valider le pseudo */
const validateUsername = (name) => /^[a-zA-Z]+(?:[-']?[a-zA-Z]+)*$/.test(name); // Expression régulière pour valider un nom d'utilisateur valide

function Userdata() {
  const dispatch = useDispatch(); // Hook pour envoyer des actions Redux
  const token = useSelector((state) => state.auth.token); // Récupération du token d'authentification depuis Redux
  const { username, firstname, lastname } = useSelector(
    (state) => state.user.userData
  ); // Récupération des données utilisateur depuis Redux (username, firstname, lastname)

  // Déclaration des états pour gérer l'édition et les erreurs
  const [isEditing, setIsEditing] = useState(false); // État pour savoir si l'utilisateur est en mode édition
  const [newUsername, setNewUsername] = useState(""); // État pour stocker le nouveau nom d'utilisateur
  const [error, setError] = useState(""); // État pour stocker les messages d'erreur

  // Fonction pour activer/désactiver le mode édition
  const toggleEditing = () => setIsEditing((prev) => !prev);

  // Fonction pour gérer le changement du nom d'utilisateur
  const handleUsernameChange = (e) => setNewUsername(e.target.value);

  // Fonction pour soumettre le formulaire de modification du nom d'utilisateur
  const handleSubmit = async (e) => {
    e.preventDefault(); // Empêche le comportement par défaut du formulaire (rechargement de la page)
    // Vérifie si le nouveau nom d'utilisateur est valide
    if (!validateUsername(newUsername)) {
      setError("Nom d'utilisateur invalide"); // Affiche un message d'erreur si le pseudo est invalide
      return; // Arrête la fonction si le pseudo est invalide
    }
    setError(""); // Réinitialise l'erreur si le pseudo est valide

    try {
      const updatedUsername = await updateUsernameAPI(newUsername, token); // Appel de la fonction API pour mettre à jour le nom d'utilisateur
      dispatch(updateUsername(updatedUsername)); // Envoie l'action updateUsername au store Redux pour mettre à jour le nom d'utilisateur
      toggleEditing(); // Désactive le mode édition
    } catch (err) {
      setError(err.message); // Affiche le message d'erreur si l'appel API échoue
    }
  };

  return (
    <div className="header">
      {isEditing ? (
        <div>
          <h2>Edit user info</h2>
          <form onSubmit={handleSubmit}>
            <div className="edit-input">
              <label htmlFor="username">Username :</label>
              <input
                type="text"
                id="username"
                defaultValue={username}
                onChange={handleUsernameChange}
              />
            </div>
            <div className="edit-input">
              <label htmlFor="firstname">First name :</label>
              <input type="text" id="firstname" value={firstname} disabled />
            </div>
            <div className="edit-input">
              <label htmlFor="lastname">Last name :</label>
              <input type="text" id="lastname" value={lastname} disabled />
            </div>
            <div className="buttons">
              <button type="submit" className="edit-username-button">
                Save
              </button>
              <button
                type="button"
                className="edit-username-button"
                onClick={toggleEditing}
              >
                Cancel
              </button>
            </div>
            {error && <p className="error-message">{error}</p>}
          </form>
        </div>
      ) : (
        <div>
          <h2>
            Welcome back <br />
            {firstname} {lastname} !
          </h2>
          <button className="edit-button" onClick={toggleEditing}>
            Edit Name
          </button>
        </div>
      )}
    </div>
  );
}

export default Userdata;
