import { takeLatest } from 'redux-saga/effects';
import * as postAPI from '../../lib/api/post';
import createRequestSaga from './createRequestSaga';
import {
  READ_POST,
  READ_COMMENTS,
  THUMBS_UP,
  THUMBS_DOWN,
  RECOMEND,
} from '../actions/post';

const readPostSaga = createRequestSaga(READ_POST, postAPI.read);
const readCommentsSaga = createRequestSaga(READ_COMMENTS, postAPI.readComments);
const recomendSaga = createRequestSaga(RECOMEND, postAPI.recomend);
const thumbsUpSaga = createRequestSaga(THUMBS_UP, postAPI.commentUp);
const thumbsDownSaga = createRequestSaga(THUMBS_DOWN, postAPI.commentDown);

export default function* postSaga() {
  yield takeLatest(READ_POST, readPostSaga);
  yield takeLatest(READ_COMMENTS, readCommentsSaga);
  yield takeLatest(RECOMEND, recomendSaga);
  yield takeLatest(THUMBS_UP, thumbsUpSaga);
  yield takeLatest(THUMBS_DOWN, thumbsDownSaga);
}
