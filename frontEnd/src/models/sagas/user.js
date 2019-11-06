import { takeLatest } from 'redux-saga/effects';
import * as authAPI from '../../lib/api/auth';
import createRequestSaga from './createRequestSaga';
import {
  CHECK,
} from '../actions/user';

const checkSaga = createRequestSaga(CHECK, authAPI.check);

export default function* userSaga() {
  yield takeLatest(CHECK, checkSaga);
}
