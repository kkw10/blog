import { all } from 'redux-saga/effects';
import authSaga from './auth';
import userSaga from './user';
import writeSaga from './write';
import postSaga from './post';
import postsSaga from './posts';

export default function* rootSaga() {
  yield all([
    authSaga(),
    userSaga(),
    writeSaga(),
    postSaga(),
    postsSaga(),
  ]);
}
