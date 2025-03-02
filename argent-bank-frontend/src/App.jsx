import React from "react";
import { Route, Routes, Navigate, BrowserRouter as Router } from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import store from "./redux/Reduxstore.js";

import Header from "./layouts/Header/Header.jsx";
import Footer from "./layouts/Footer/Footer.jsx";
import Home from "./pages/Home/Home.jsx";
import SignIn from "./pages/SignIn/SignIn.jsx";
import User from "./pages/User/User.jsx";
import Error from "./pages/Error/Error.jsx";
import "./App.css";

// Composant gérant les routes principales de l'application
function MainRoutes() {
  // Récupération du token depuis le state Redux
  const token = useSelector((state) => state.auth.token);
  // Vérification si l'utilisateur est connecté
  const isConnected = !!token;

  return (
    <Routes>
      {/* Route vers la page d'accueil */}
      <Route path="/" element={<Home />} />

      {/* Route vers la page de connexion */}
      <Route path="/signin" element={<SignIn />} />

      {/* Route vers la page utilisateur, accessible uniquement si connecté */}
      <Route path="/user" element={isConnected ? <User /> : <Navigate to="/signin" />} />

      {/* Route pour les pages non trouvées */}
      <Route path="*" element={<Error />} />
    </Routes>
  );
}

// Composant principal de l'application
export default function App() {
  return (
    // Fourniture du store Redux à l'application
    <Provider store={store}>
      {/* Définition du routeur pour gérer la navigation */}
      <Router>
        {/* Affichage du header sur toutes les pages */}
        <Header />
        
        {/* Chargement des routes principales */}
        <MainRoutes />
        
        {/* Affichage du footer sur toutes les pages */}
        <Footer />
      </Router>
    </Provider>
  );
}


