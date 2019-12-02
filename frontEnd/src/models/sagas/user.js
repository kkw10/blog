import { takeLatest, call } from 'redux-saga/effects';
import * as authAPI from '../../lib/api/auth';
import * as profileAPI from '../../lib/api/profile';
import * as userAPI from '../../lib/api/user';
import createRequestSaga from './createRequestSaga';
import {
  CHECK,
  CHECK_FAILURE,
  LOGOUT,
  UPLOAD_PROFILE,
  GET_TARGET_PROFILE,
  FOLLOW,
  UNFOLLOW,
} from '../actions/user';

const checkSaga = createRequestSaga(CHECK, authAPI.check);
const uploadProfileSaga = createRequestSaga(UPLOAD_PROFILE, profileAPI.uploadProfile);
const getTargetProfileSaga = createRequestSaga(GET_TARGET_PROFILE, profileAPI.getProfile);
const followSaga = createRequestSaga(FOLLOW, userAPI.follow);
const unfollowSaga = createRequestSaga(UNFOLLOW, userAPI.unfollow);

function checkFailureSaga() {
  try {
    localStorage.removeItem('user');
  } catch (e) {
    console.log('localstorage is not working...');
  }
}

function* logoutSaga() {
  try {
    yield call(authAPI.logout);
    localStorage.removeItem('user');
  } catch (e) {
    console.error(e);
  }
}

export default function* userSaga() {
  yield takeLatest(CHECK, checkSaga);
  yield takeLatest(CHECK_FAILURE, checkFailureSaga);
  yield takeLatest(LOGOUT, logoutSaga);
  yield takeLatest(UPLOAD_PROFILE, uploadProfileSaga);
  yield takeLatest(GET_TARGET_PROFILE, getTargetProfileSaga);
  yield takeLatest(FOLLOW, followSaga);
  yield takeLatest(UNFOLLOW, unfollowSaga);
}
