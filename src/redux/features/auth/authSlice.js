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
      return {
        ...state,
        role: action.payload.role,
      };
    },

    logoutStart(state, action) {
      return {
        ...state,
      };
    },

    logoutSuccess(state) {
      state.currentUser = undefined;
      state.role = 'R02';
    },

    logoutFail(state, action) {
      return {
        ...state,
        error: action.payload,
      };

    },
  },
});

export const authAction = authSlice.actions;
export default authSlice.reducer;
