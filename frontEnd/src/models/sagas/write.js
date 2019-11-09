import { takeLatest } from 'redux-saga/effects';
import * as postAPI from '../../lib/api/post';
import createRequestSaga from './createRequestSaga';
import {
  POSTING,
} from '../actions/write';

const postingSaga = createRequestSaga(POSTING, postAPI.write);

export default function* writeSaga() {
  yield takeLatest(POSTING, postingSaga);
}
