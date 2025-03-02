export const updateUsernameAPI = async (newUsername, token) => {
    try {
      const response = await fetch("http://localhost:3001/api/v1/user/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userName: newUsername }),
      });
  
      if (!response.ok) {
        throw new Error("Erreur lors de la mise à jour du nom d'utilisateur");
      }
  
      const data = await response.json();
      return data.body.userName;
    } catch (err) {
      throw new Error(`Erreur réseau : ${err.message}`);
    }
  };