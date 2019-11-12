import { takeLatest } from 'redux-saga/effects';
import * as postsAPI from '../../lib/api/posts';
import createRequestSaga from './createRequestSaga';
import {
  READ_POSTS,
} from '../actions/posts';

const readPostsSaga = createRequestSaga(READ_POSTS, postsAPI.list);

export default function* postsSaga() {
  yield takeLatest(READ_POSTS, readPostsSaga);
}
