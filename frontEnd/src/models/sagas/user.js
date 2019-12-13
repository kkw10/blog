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
  UNFOLLOW_FROM_LIST,
  UNFOLLOWING_FROM_LIST,
  READ_FOLLOWERS,
  READ_FOLLOWINGS,
} from '../actions/user';

const checkSaga = createRequestSaga(CHECK, authAPI.check);
const uploadProfileSaga = createRequestSaga(UPLOAD_PROFILE, profileAPI.uploadProfile);
const getTargetProfileSaga = createRequestSaga(GET_TARGET_PROFILE, profileAPI.getProfile);
const followSaga = createRequestSaga(FOLLOW, userAPI.follow);
const unfollowSaga = createRequestSaga(UNFOLLOW, userAPI.unfollow);
const readFollowersSaga = createRequestSaga(READ_FOLLOWERS, userAPI.readFollowers);
const readFollowingsSaga = createRequestSaga(READ_FOLLOWINGS, userAPI.readFollowings);
const unfollowFromListSaga = createRequestSaga(UNFOLLOW_FROM_LIST, userAPI.unfollow);
const unfollowingFromListSaga = createRequestSaga(UNFOLLOWING_FROM_LIST, userAPI.unfollowing);

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
  yield takeLatest(UNFOLLOW_FROM_LIST, unfollowFromListSaga);
  yield takeLatest(UNFOLLOWING_FROM_LIST, unfollowingFromListSaga);
  yield takeLatest(READ_FOLLOWERS, readFollowersSaga);
  yield takeLatest(READ_FOLLOWINGS, readFollowingsSaga);
}
