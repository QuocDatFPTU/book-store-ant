import * as types from './actionTypes';
const initialState = {
  loading: false,
  currentUser: null,
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    //LOGIN
    case types.LOGIN_START:
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        currentUser: action.payload,
      };
    case types.LOGIN_FAIL:

    //LOGOUT
    case types.LOGOUT_START:
      return {
        ...state,
        loading: true,
      };
    case types.LOGOUT_SUCCESS:
      return {
        ...state,
        currentUser: null,
      };
    case types.LOGOUT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    //REGISTER
    case types.REGISTER_START:
    case types.REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        currentUser: action.payload,
      };
    case types.REGISTER_FAIL:

    default:
      return state;
  }
};

export default userReducer;
