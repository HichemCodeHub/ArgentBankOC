import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: {
    username: "",
    firstname: "",
    lastname: "",
    email: "",
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Met à jour uniquement le username
    updateUsername: (state, action) => {
      state.userData.username = action.payload;
    },
    // Stocke toutes les données utilisateur après la connexion
    setUserProfile: (state, action) => {
      state.userData = action.payload;
    },
    // Réinitialise les données utilisateur (utile à la déconnexion)
    clearUserProfile: (state) => {
      state.userData = initialState.userData;
    },
  },
});

export const { updateUsername, setUserProfile, clearUserProfile } = userSlice.actions;
export default userSlice.reducer;
