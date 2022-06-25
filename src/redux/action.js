import jwt from 'jsonwebtoken';
import axiosClient from 'util/axiosClient';
// import axiosClient from "../util/axiosClient";
import * as types from './actionTypes';

const loginStart = () => ({
  type: types.LOGIN_START,
});

const loginSuccess = (user) => ({
  type: types.LOGIN_SUCCESS,
  payload: user,
});

const loginFail = (error) => ({
  type: types.LOGIN_FAIL,
  payload: error,
});

const logoutStart = () => ({
  type: types.LOGOUT_START,
});

const logoutSuccess = () => ({
  type: types.LOGOUT_SUCCESS,
});

const logoutFail = (error) => ({
  type: types.LOGOUT_FAIL,
  payload: error,
});

//  return function(dispatch) {
//     dispatch(loginStart());
//     //lấy token từ firebase
//     try {
//       const res =   auth.signInWithEmailAndPassword(email, password);
//       if (res.user) {
//         const token =  res.user.getIdToken();
//         const db_token =   axiosClient.post('authentication/login/login', token);
//         const decode_token = jwt.decode(db_token);
//         const user = {...decode_token};
//         dispatch(loginSuccess(user));
//       }
//     } catch (error) {
//       dispatch(loginFail(error.message))
//     }

// auth.signInWithEmailAndPassword(email, password).then(() => {
//   const token = await res.user.getIdToken();
//   const db_token = await axiosClient.post('authentication/login/login', token);
//   const decode_token = jwt.decode(db_token);
//   const user = {...decode_token};
//   dispatch(loginSuccess(user));
// }
// ).catch((error) =>  dispatch(loginFail(error.message))
export const loginInitiate = (email, password) => async (dispatch) => {
  dispatch(loginStart);
  try {
    const auth_token = await axiosClient.post(
      '/user/login',
      { email, password },
      { headers: { 'Content-Type': 'application/json' } }
    );
    console.log(auth_token);
    const decode_token = jwt.decode(auth_token.token);
    const user = { ...decode_token };
    localStorage.setItem('__token', auth_token?.token);
    localStorage.setItem('__role', user.role);
    dispatch(loginSuccess(user));

    return 'Đăng nhập thành công';
  } catch (error) {
    dispatch(loginFail(error.response.data.error));
    throw new Error(error.response.data.error);
  }
  //  return function(dispatch) {
  //     dispatch(loginStart());
  //     //lấy token từ firebase
  //     try {
  //       const res =   auth.signInWithEmailAndPassword(email, password);
  //       if (res.user) {
  //         const token =  res.user.getIdToken();
  //         const db_token =   axiosClient.post('authentication/login/login', token);
  //         const decode_token = jwt.decode(db_token);
  //         const user = {...decode_token};
  //         dispatch(loginSuccess(user));
  //       }
  //     } catch (error) {
  //       dispatch(loginFail(error.message))
  //     }

  // auth.signInWithEmailAndPassword(email, password).then(() => {
  //   const token = await res.user.getIdToken();
  //   const db_token = await axiosClient.post('authentication/login/login', token);
  //   const decode_token = jwt.decode(db_token);
  //   const user = {...decode_token};
  //   dispatch(loginSuccess(user));
  // }
  // ).catch((error) =>  dispatch(loginFail(error.message))

  // auth
  //   .signInWithEmailAndPassword(email, password)
  //   .then(( res ) => {
  //     const token = res.user.getIdToken();
  //     // dispatch(loginSuccess(user));
  //   })
  //   .catch((error) => dispatch(loginFail(error.message)));
};
// };

export const logoutInitiate = () => {
  // return function (dispatch) {
  // 	dispatch(logoutStart());
  // 	auth
  // 		.signOut()
  // 		.then((res) => dispatch(logoutSuccess()))
  // 		.catch((error) => dispatch(logoutFail(error.message)));
  // };
  return async function (dispatch) {
    dispatch(logoutStart());
    await axiosClient.post(
      'user/logoutAll',
      {},
      { headers: { 'content-type': 'application/json-patch+json' } }
    );
  };
};
