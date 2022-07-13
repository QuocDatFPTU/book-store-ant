import { all } from 'redux-saga/effects';
import watchAuth from './features/auth/saga';

export default function* rootSaga() {
  yield all([watchAuth()]);
}
