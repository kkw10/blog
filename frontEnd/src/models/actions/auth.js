import { createRequestActionTypes } from '../sagas/createRequestSaga';

export const CHANGE_FIELD = 'auth/CHNGE_FIELD';
export const INITIALIZE_FORM = 'auth/INITIALIZE_FORM';
export const [
  REGISTER,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
] = createRequestActionTypes('auth/REGISTER');
export const [
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
] = createRequestActionTypes('auth/LOGIN');

export const changeField = ({ form, key, value }) => ({
  type: CHANGE_FIELD,
  payload: {
    form, // register or login
    key, // email or password ...
    value, // value...
  },
});

export const initializeForm = (form) => ({
  type: INITIALIZE_FORM,
  payload: {
    form,
  },
});

export const register = ({ email, nickname, password }) => ({
  type: REGISTER,
  payload: {
    email,
    nickname,
    password,
  },
});

export const login = ({ email, password }) => ({
  type: LOGIN,
  payload: {
    email,
    password,
  },
});
