import { all } from 'redux-saga/effects';
import authSaga from './features/auth/saga';
import watchAuth from './features/auth/saga';

export default function* rootSaga() {
  yield all([authSaga()]);
}
