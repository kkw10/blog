import { takeLatest } from 'redux-saga/effects';
import * as postAPI from '../../lib/api/post';
import * as profileAPI from '../../lib/api/profile';
import createRequestSaga from './createRequestSaga';
import {
  POSTING,
  UPDATE,
  COMMENTING,
  UPLOAD_PORTRAIT,
} from '../actions/write';

const postingSaga = createRequestSaga(POSTING, postAPI.write);
const updateSaga = createRequestSaga(UPDATE, postAPI.update);
const commentingSaga = createRequestSaga(COMMENTING, postAPI.writeComment);
const uploadPortraitSaga = createRequestSaga(UPLOAD_PORTRAIT, profileAPI.uploadImage);

export default function* writeSaga() {
  yield takeLatest(POSTING, postingSaga);
  yield takeLatest(UPDATE, updateSaga);
  yield takeLatest(COMMENTING, commentingSaga);
  yield takeLatest(UPLOAD_PORTRAIT, uploadPortraitSaga);
}
