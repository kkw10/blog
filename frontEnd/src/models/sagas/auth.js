import { takeLatest } from 'redux-saga/effects';
import * as authAPI from '../../lib/api/auth';
import createRequestSaga from './createRequestSaga';
import {
  REGISTER,
  LOGIN,
} from '../actions/auth';

const registerSaga = createRequestSaga(REGISTER, authAPI.register);
const loginSaga = createRequestSaga(LOGIN, authAPI.login);

export default function* authSaga() {
  yield takeLatest(REGISTER, registerSaga);
  yield takeLatest(LOGIN, loginSaga);
}
