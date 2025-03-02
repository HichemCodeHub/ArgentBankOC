// services/authService.js
const API_URL = "http://localhost:3001/api/v1";

export const loginUser = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      return data.body; // Retourne les données (token et profil utilisateur)
    } else {
      throw new Error("Incorrect email/password");
    }
  } catch (error) {
    throw error;
  }
};
