import { takeLatest } from 'redux-saga/effects';
import * as postAPI from '../../lib/api/post';
import createRequestSaga from './createRequestSaga';
import {
  POSTING,
  UPDATE,
  COMMENTING,
} from '../actions/write';

const postingSaga = createRequestSaga(POSTING, postAPI.write);
const updateSaga = createRequestSaga(UPDATE, postAPI.update);
const commentingSaga = createRequestSaga(COMMENTING, postAPI.writeComment);

export default function* writeSaga() {
  yield takeLatest(POSTING, postingSaga);
  yield takeLatest(UPDATE, updateSaga);
  yield takeLatest(COMMENTING, commentingSaga);
}
