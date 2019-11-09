import { all } from 'redux-saga/effects';
import authSaga from './auth';
import userSaga from './user';
import writeSaga from './write';

export default function* rootSaga() {
  yield all([
    authSaga(),
    userSaga(),
    writeSaga(),
  ]);
}
