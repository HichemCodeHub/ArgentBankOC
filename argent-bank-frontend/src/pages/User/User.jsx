import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUserProfile } from "../../redux/userSlice.js";
import UserData from "../../components/User/Userdata.jsx";
import Account from "../../components/Account/Account";
import "./User.css";

function User() {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      const fetchUserData = async () => {
        try {
          const response = await fetch("http://localhost:3001/api/v1/user/profile", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const data = await response.json();
            console.log("Données utilisateur récupérées :", data);

            if (data.body) {
              const userData = {
                id: data.body.id,
                email: data.body.email,
                firstname: data.body.firstName,
                lastname: data.body.lastName,
                username: data.body.userName,
                createdAt: data.body.createdAt,
                updatedAt: data.body.updatedAt,
              };

              dispatch(setUserProfile(userData));
            } else {
              console.error("Réponse API invalide :", data);
            }
          } else {
            console.error("Erreur lors de la récupération du profil :", response.statusText);
          }
        } catch (error) {
          console.error("Erreur réseau :", error);
        }
      };

      fetchUserData();
    }
  }, [dispatch, token]);

  return (
    <div className="profile-page">
      <main className="bg-dark">
        {/* Utilisation du nouveau composant UserData */}
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
