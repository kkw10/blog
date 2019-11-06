import { createRequestActionTypes } from '../sagas/createRequestSaga';

export const TEMP_SET_USER = 'user/TEMP_SET_USER';
export const [
  CHECK,
  CHECK_SUCCESS,
  CHECK_FAILURE,
] = createRequestActionTypes('user/CHECK');
export const LOGOUT = 'user/LOGOUT';

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
