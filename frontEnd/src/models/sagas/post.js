import { takeLatest } from 'redux-saga/effects';
import * as postAPI from '../../lib/api/post';
import createRequestSaga from './createRequestSaga';
import {
  READ_POST,
} from '../actions/post';

const readPostSaga = createRequestSaga(READ_POST, postAPI.read);

export default function* postSaga() {
  yield takeLatest(READ_POST, readPostSaga);
}
