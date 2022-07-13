import environment from 'environments/environment';
import { call, put, takeLeading } from 'redux-saga/effects';
import request from 'util/request';
import authSlice, {
  loginFail,
  loginStart,
  loginSuccess,
  logoutStart,
  logoutSuccess,
} from './authSlice';
import jwt from 'jsonwebtoken';
import { message } from 'antd';

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
    localStorage.setItem('__role', decode_token?.role);
    localStorage.setItem('__token', data.token);

    yield put(
      loginSuccess({
        ...data,
        role: decode_token?.role,
      })
    );
  } catch (error) {
    yield put(loginFail(error?.message));
    message.error('Đăng nhập không thành công');
  }
}

function* logout(action) {
  try {
    yield call(request, '/user/logoutAll', {});
    yield localStorage.removeItem('__role');
    yield localStorage.removeItem('__token');
    yield put(logoutSuccess({}));
  } catch (error) {
    yield put(logoutFail(error?.message));
  }
}
export default function* watchAuth() {
  yield takeLeading(loginStart.type, login);
  yield takeLeading(logoutStart.type, logout);
}
