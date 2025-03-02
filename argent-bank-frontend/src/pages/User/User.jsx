import React, { useEffect } from "react"; // Importation de React et du hook useEffect
import { useSelector, useDispatch } from "react-redux"; // Importation de useSelector et useDispatch de Redux
import { setUserProfile } from "../../redux/userSlice"; // Importation de l'action setUserProfile de userSlice
import { fetchUserDataAPI } from "../../services/userdataService"; // Importation de la fonction API
import UserData from "../../components/User/Userdata"; // Importation du composant UserData pour afficher les informations utilisateur
import Account from "../../components/Account/Account"; // Importation du composant Account pour afficher les comptes bancaires
import "./User.css"; // Importation du fichier CSS pour le style de la page

function User() {
  const token = useSelector((state) => state.auth.token); // Récupération du token d'authentification depuis Redux
  const dispatch = useDispatch(); // Hook pour envoyer des actions Redux

  useEffect(() => {
    // Si le token est disponible, on lance la récupération des données utilisateur
    if (token) {
      const fetchUserData = async () => {
        try {
          // Utilisation de la fonction API pour récupérer les données utilisateur
          const userData = await fetchUserDataAPI(token);

          if (userData) {
            // Si les données sont valides, on prépare les données utilisateur à stocker dans Redux
            const userProfile = {
              id: userData.id,
              email: userData.email,
              firstname: userData.firstName,
              lastname: userData.lastName,
              username: userData.userName,
              createdAt: userData.createdAt,
              updatedAt: userData.updatedAt,
            };

            // Envoi des données utilisateur à Redux via l'action setUserProfile
            dispatch(setUserProfile(userProfile));
          } else {
            console.error("Réponse API invalide :", userData); // Si les données sont invalides
          }
        } catch (error) {
          console.error("Erreur lors de la récupération des données utilisateur :", error.message); // Gestion des erreurs
        }
      };

      fetchUserData(); // Appel de la fonction pour récupérer les données utilisateur
    }
  }, [dispatch, token]); // L'effet se déclenche à chaque fois que dispatch ou token changent

  return (
    <div className="profile-page">
      <main className="bg-dark">
        {/* Utilisation du composant UserData pour afficher les informations utilisateur */}
        <UserData />

        {/* Comptes bancaires */}
        <Account key="1" title="Compte courant Argent Bank (x8349)" amount="2 082,79 €" description="Solde disponible" />
        <Account key="2" title="Compte épargne Argent Bank (x6712)" amount="10 928,42 €" description="Solde disponible" />
        <Account key="3" title="Carte de crédit Argent Bank (x8349)" amount="184,30 €" description="Solde actuel" />
      </main>
    </div>
  );
}

export default User;

