import { takeLatest } from 'redux-saga/effects';
import * as postAPI from '../../lib/api/post';
import createRequestSaga from './createRequestSaga';
import {
  READ_POST,
  READ_COMMENTS,
} from '../actions/post';

const readPostSaga = createRequestSaga(READ_POST, postAPI.read);
const readCommentsSaga = createRequestSaga(READ_COMMENTS, postAPI.readComments);

export default function* postSaga() {
  yield takeLatest(READ_POST, readPostSaga);
  yield takeLatest(READ_COMMENTS, readCommentsSaga);
}
