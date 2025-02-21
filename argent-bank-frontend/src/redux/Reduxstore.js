import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice.js"; 
import userReducer from "./userSlice.js";

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
  },
  devTools: true, // Active Redux DevTools pour le débogage
});

export default store;