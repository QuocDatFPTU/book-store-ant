import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  currentUser: null,
  error: null,
  role: 'R02',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart(state, action) {
      return {
        ...state,
        loading: false,
        currentUser: action.payload,
      };
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

export const {
  loginStart,
  loginFail,
  loginSuccess,
  logoutSuccess,
  logoutFail,
  logoutStart,
} = authSlice.actions;

export default authSlice.reducer;
