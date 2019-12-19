import { takeLatest, throttle } from 'redux-saga/effects';
import * as postAPI from '../../lib/api/post';
import createRequestSaga from './createRequestSaga';
import {
  READ_POST,
  COMMENTING,
  READ_COMMENTS,
  THUMBS,
  RECOMEND,
  DELETE_COMMENT,
  UPDATE_COMMENT,
  UPDATE_SUB_COMMENT,
  SUB_COMMENTING,
  READ_SUB_COMMENTS,
  REFRESH_COMMENTS,
} from '../actions/post';

const readPostSaga = createRequestSaga(READ_POST, postAPI.read);
const readCommentsSaga = createRequestSaga(READ_COMMENTS, postAPI.readComments);
const commentingSaga = createRequestSaga(COMMENTING, postAPI.writeComment);
const readSubCommentsSaga = createRequestSaga(READ_SUB_COMMENTS, postAPI.readSubComments);
const recomendSaga = createRequestSaga(RECOMEND, postAPI.recomend);
const thumbsSaga = createRequestSaga(THUMBS, postAPI.commentThumbs);
const deleteCommentSaga = createRequestSaga(DELETE_COMMENT, postAPI.removeComment);
const updateCommentSaga = createRequestSaga(UPDATE_COMMENT, postAPI.updateComment);
const updateSubCommentSaga = createRequestSaga(UPDATE_SUB_COMMENT, postAPI.updateSubComment);
const subCommentingSaga = createRequestSaga(SUB_COMMENTING, postAPI.writeSubComment);
const refreshCommentsSaga = createRequestSaga(REFRESH_COMMENTS, postAPI.readComments);

export default function* postSaga() {
  yield takeLatest(READ_POST, readPostSaga);
  yield takeLatest(COMMENTING, commentingSaga);
  yield throttle(1000, READ_COMMENTS, readCommentsSaga);
  yield takeLatest(READ_SUB_COMMENTS, readSubCommentsSaga);
  yield takeLatest(RECOMEND, recomendSaga);
  yield takeLatest(THUMBS, thumbsSaga);
  yield takeLatest(DELETE_COMMENT, deleteCommentSaga);
  yield takeLatest(UPDATE_COMMENT, updateCommentSaga);
  yield takeLatest(UPDATE_SUB_COMMENT, updateSubCommentSaga);
  yield takeLatest(SUB_COMMENTING, subCommentingSaga);
  yield takeLatest(REFRESH_COMMENTS, refreshCommentsSaga);
}
