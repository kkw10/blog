import { takeLatest, call } from 'redux-saga/effects';
import * as authAPI from '../../lib/api/auth';
import createRequestSaga from './createRequestSaga';
import {
  CHECK,
  CHECK_FAILURE,
  LOGOUT,
} from '../actions/user';

const checkSaga = createRequestSaga(CHECK, authAPI.check);

function checkFailureSaga() {
  try {
    localStorage.removeItem('user');
  } catch (e) {
    console.log('localstorage is not working...');
  }
}

function* logoutSaga() {
  try {
    yield call(authAPI.logout);
    localStorage.removeItem('user');
  } catch (e) {
    console.error(e);
  }
}

export default function* userSaga() {
  yield takeLatest(CHECK, checkSaga);
  yield takeLatest(CHECK_FAILURE, checkFailureSaga);
  yield takeLatest(LOGOUT, logoutSaga);
}
