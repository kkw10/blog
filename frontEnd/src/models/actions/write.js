import { createRequestActionTypes } from '../sagas/createRequestSaga';

export const INITIALIZE = 'write/INITIALIZE';
export const CHANGE_FIELD = 'write/CHANGE_FIELD';
export const SET_ORIGINAL_POST = 'write/SET_ORIGINAL_POST';
export const [
  POSTING,
  POSTING_SUCCESS,
  POSTING_FAILURE,
] = createRequestActionTypes('write/POSTING');
export const [
  UPDATE,
  UPDATE_SUCCESS,
  UPDATE_FAILURE,
] = createRequestActionTypes('write/UPDATE');

export const initialize = () => ({
  type: INITIALIZE,
});

export const changeField = ({ key, value }) => ({
  type: CHANGE_FIELD,
  payload: {
    key,
    value,
  },
});

export const setOriginalPost = (post) => ({
  type: SET_ORIGINAL_POST,
  payload: post,
});

export const posting = ({ title, contents, hashTags }) => ({
  type: POSTING,
  payload: {
    title,
    contents,
    hashTags,
  },
});

export const update = ({ id, title, contents, hashTags }) => ({
  type: UPDATE,
  payload: {
    id,
    title,
    contents,
    hashTags,
  },
})
