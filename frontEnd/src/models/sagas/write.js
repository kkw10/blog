import { takeLatest } from 'redux-saga/effects';
import * as postAPI from '../../lib/api/post';
import createRequestSaga from './createRequestSaga';
import {
  POSTING,
  UPDATE,
} from '../actions/write';

const postingSaga = createRequestSaga(POSTING, postAPI.write);
const updateSaga = createRequestSaga(UPDATE, postAPI.update);

export default function* writeSaga() {
  yield takeLatest(POSTING, postingSaga);
  yield takeLatest(UPDATE, updateSaga);
}
