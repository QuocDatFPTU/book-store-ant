import environment from 'environments/environment';
import {
  call,
  fork,
  put,
  take,
  takeEvery,
  takeLeading,
} from 'redux-saga/effects';
import request from 'util/request';
import authSlice, {
  authAction,
  loginFail,
  loginStart,
  loginSuccess,
  logoutStart,
  logoutSuccess,
} from './authSlice';
import jwt from 'jsonwebtoken';
import { message } from 'antd';
import axiosClient from 'util/axiosClient';

function* login(action) {
  try {
    const { username, password } = action.payload;
    const data = yield call(
      request,
      environment.api.login,
      {
        email: username,
        password,
      },
      'POST'
    );

    if (!data.token) {
      return;
    }
    const decode_token = jwt.decode(data.token);
    const user = _.omit(data?.user, ['tokens']);
    localStorage.setItem('__role', decode_token?.role);
    localStorage.setItem('__token', data.token);

    yield put(
      authAction.loginSuccess({
        ...user,
        role: decode_token?.role,
      })
    );
  } catch (error) {
    yield put(authAction.loginFail(error?.message));
    message.error('Đăng nhập không thành công');
  }
}

function* logout(action) {
  yield call(request, '/user/logout', {}, 'POST');
  localStorage.removeItem('__role');
  localStorage.removeItem('__token');
  axiosClient.delete('/session');
}

function* watchLoginFlown() {
  while (true) {
    const isLoginIn = Boolean(localStorage.getItem('__token'));
    if (!isLoginIn) {
      const action = yield take(authAction.loginStart.type);
      yield call(login, action);
    } else {
      yield take(authAction.logout.type);
      yield call(logout);
    }
  }
}

export default function* authSaga() {
  yield fork(watchLoginFlown);
}
// function* logout(action) {
//     try {
//         yield call(request, '/user/logoutAll', {});
//         yield localStorage.removeItem('__role');
//         yield localStorage.removeItem('__token');
//         yield put(logoutSuccess());
//         debugger
//     } catch (error) {
//         yield put(logoutFail(error?.message));
//     }
// }
// export default function* watchAuth() {
//     yield takeLeading(loginStart.type, login);
//     yield takeLeading(logoutStart.type, logout);
// }
