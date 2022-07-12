import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    loading: false,
    currentUser: null,
    error: null,
    role: 'R01'
}

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
                role: action.payload.role
            }
        },
        loginFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        },
        logoutSuccess(state) {
            return {
                ...state,
                currentUser: null
              };
        }
    },
})

export const { loginStart, loginFail, loginSuccess } = authSlice.actions
export default authSlice.reducer