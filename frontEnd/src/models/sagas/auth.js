import * as authAPI from '../../lib/api/auth';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga from './createRequestSaga';
import { 
  REGISTER
} from '../actions/auth';

const registerSaga = createRequestSaga(REGISTER, authAPI.register);

export default function* authSaga() {
  yield takeLatest(REGISTER, registerSaga);
}