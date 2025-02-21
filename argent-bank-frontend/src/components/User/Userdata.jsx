import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUsername } from "../../redux/userSlice"; 
import "./Userdata.css";



/* Fonction pour valider le pseudo */
const validateUsername = (name) => /^[a-zA-Z]+(?:[-']?[a-zA-Z]+)*$/.test(name);

function Userdata() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const { username, firstname, lastname } = useSelector(
    (state) => state.user.userData
  );

  const [isEditing, setIsEditing] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [error, setError] = useState("");

  const toggleEditing = () => setIsEditing((prev) => !prev);
  const handleUsernameChange = (e) => setNewUsername(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateUsername(newUsername)) {
      setError("Nom d'utilisateur invalide");
      return;
    }
    setError("");

    try {
      const response = await fetch("http://localhost:3001/api/v1/user/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userName: newUsername }),
      });

      if (response.ok) {
        const data = await response.json();
        dispatch(updateUsername(data.body.userName));
        toggleEditing();
      } else {
        console.error("Erreur lors de la mise à jour du nom d'utilisateur");
      }
    } catch (err) {
      console.error("Erreur réseau :", err);
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
              <button type="submit" className="edit-username-button">Save</button>
              <button type="button" className="edit-username-button" onClick={toggleEditing}>Cancel</button>
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
          <button className="edit-button" onClick={toggleEditing}>Edit Name</button>
        </div>
      )}
    </div>
  );
}

export default Userdata;
