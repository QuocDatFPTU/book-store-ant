import environment from 'environments/environment';
import { call, put, takeLeading } from 'redux-saga/effects'
import request from 'util/request';
import authSlice, { loginFail, loginStart, loginSuccess } from './authSlice';
import jwt from 'jsonwebtoken';

function* login(action) {
    try {
        const { username, password } = action.payload;
        const data = yield call(request, environment.api.login, {
            email: username,
            password
        }, 'POST');

        if (!data.token) {
            return;
        }
        const decode_token = jwt.decode(data.token);
        localStorage.setItem('__role', decode_token?.role);
        localStorage.setItem('__token', data.token);
        yield put(loginSuccess({
            ...data,
            role: decode_token?.role
        }
        ));

    } catch (error) {
        yield (put(loginFail(error?.message)))
    }
}

// fucntion* logout(action) {

// }
export default function* watchAuth() {
    yield takeLeading(loginStart.type, login);
}