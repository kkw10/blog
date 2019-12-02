import { createRequestActionTypes } from '../sagas/createRequestSaga';

export const TEMP_SET_USER = 'user/TEMP_SET_USER';
export const [
  CHECK,
  CHECK_SUCCESS,
  CHECK_FAILURE,
] = createRequestActionTypes('user/CHECK');
export const LOGOUT = 'user/LOGOUT';
export const [
  UPLOAD_PROFILE,
  UPLOAD_PROFILE_SUCCESS,
  UPLOAD_PROFILE_FAILURE,
] = createRequestActionTypes('user/UPLOAD_PROFILE');
export const [
  GET_TARGET_PROFILE,
  GET_TARGET_PROFILE_SUCCESS,
  GET_TARGET_PROFILE_FAILURE,
] = createRequestActionTypes('user/GET_TARGET_PROFILE');
export const RESET_STRANGER_PROFILE = 'user/RESET_STRANGER_PROFILE';
export const [
  FOLLOW,
  FOLLOW_SUCCESS,
  FOLLOW_FAILURE,
] = createRequestActionTypes('user/FOLLOW');
export const [
  UNFOLLOW,
  UNFOLLOW_SUCCESS,
  UNFOLLOW_FAILURE,
] = createRequestActionTypes('user/UNFOLLOW');

// 새로고침 이후 임시 로그인 처리
export const tempSetUser = (user) => ({
  type: TEMP_SET_USER,
  payload: user,
});

export const check = () => ({
  type: CHECK,
});

export const logout = () => ({
  type: LOGOUT,
});

export const uploadProfile = (profileData) => ({
  type: UPLOAD_PROFILE,
  payload: profileData,
});

export const getTargetProfile = (targetId) => ({
  type: GET_TARGET_PROFILE,
  payload: targetId,
});

export const resetStrangerProfile = () => ({
  type: RESET_STRANGER_PROFILE,
});

export const follow = (targetId) => ({
  type: FOLLOW,
  payload: targetId,
});

export const unfollow = (targetId) => ({
  type: UNFOLLOW,
  payload: targetId,
});
