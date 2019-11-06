import { takeLatest } from 'redux-saga/effects';
import * as authAPI from '../../lib/api/auth';
import createRequestSaga from './createRequestSaga';
import {
  CHECK,
  CHECK_FAILURE,
} from '../actions/user';

const checkSaga = createRequestSaga(CHECK, authAPI.check);

function checkFailureSaga() {
  try {
    localStorage.removeItem('user');
  } catch (e) {
    console.log('localstorage is not working...');
  }
}

export default function* userSaga() {
  yield takeLatest(CHECK, checkSaga);
  yield takeLatest(CHECK_FAILURE, checkFailureSaga);
}
