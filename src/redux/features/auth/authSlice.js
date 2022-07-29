import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  logging: false,
  currentUser: {
    role: 'R02'
  },
  error: null,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart(state, action) {
      state.logging = true;
    },

    loginSuccess(state, action) {
      state.logging = false;
      state.currentUser = action.payload;
    },
    loginFail(state, action) {
      state.logging = false;
      state.error = action.payload;
    },
    logout(state, action) {
      state.isLoggedIn = false;
      state.currentUser = { role: 'R02' };
      state.error = undefined;
    },
  },
});

export const authAction = authSlice.actions;
export default authSlice.reducer;
