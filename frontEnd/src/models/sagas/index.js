import { all, call } from 'redux-saga/effects';
import authSaga from './auth';

export default function* rootSaga() {
  yield all([
    authSaga()
  ])
};
