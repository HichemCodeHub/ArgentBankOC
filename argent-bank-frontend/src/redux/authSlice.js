import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null,
  userData: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.token = action.payload.token;
      state.userData = action.payload.userProfile; 
    },
    logout: (state) => {
      state.token = null;
      state.userData = null;
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;