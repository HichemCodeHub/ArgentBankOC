// src/services/userService.js

export const fetchUserDataAPI = async (token) => {
    try {
      const response = await fetch("http://localhost:3001/api/v1/user/profile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération du profil");
      }
  
      const data = await response.json();
      return data.body;
    } catch (error) {
      throw new Error(`Erreur réseau : ${error.message}`);
    }
  };