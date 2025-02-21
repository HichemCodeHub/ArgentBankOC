import React from "react";

/* Fonction du composant qui retourne un compte utilisateur */
function Account({ title, amount, description }) {
  // Log des props reçues pour le composant Account (titre, montant et description du compte)
  console.log("Account props:", { title, amount, description });

  return (
    <section className="account">
      {/* Titre caché pour l'accessibilité (utile pour les lecteurs d'écran) */}
      <h2 className="sr-only">Accounts</h2>

      {/* Wrapper principal contenant les informations du compte */}
      <div className="account-content-wrapper">
        {/* Affichage du titre du compte */}
        <h3 className="account-title">{title}</h3>

        {/* Affichage du montant du compte */}
        <p className="account-amount">{amount}</p>

        {/* Affichage de la description du compte */}
        <p className="account-amount-description">{description}</p>
      </div>

      {/* Wrapper pour le bouton d'action (pour visualiser les transactions) */}
      <div className="account-content-wrapper cta">
        {/* Bouton pour voir les transactions du compte */}
        <button className="transaction-button">View transactions</button>
      </div>
    </section>
  );
}

export default Account;
