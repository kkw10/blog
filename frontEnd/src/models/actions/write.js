import { createRequestActionTypes } from '../sagas/createRequestSaga';

export const INITIALIZE = 'write/INITIALIZE';
export const CHANGE_FIELD = 'write/CHANGE_FIELD';
export const SET_ORIGINAL_POST = 'write/SET_ORIGINAL_POST';
export const SET_ORIGINAL_COMMENT = 'write/SET_ORIGINAL_COMMENT';
export const SET_ORIGINAL_PROFILE = 'write/SET_ORIGINAL_PROFILE';
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
export const [
  COMMENTING,
  COMMENTING_SUCCESS,
  COMMENTING_FAILURE,
] = createRequestActionTypes('write/COMMENTING');
export const [
  UPLOAD_PORTRAIT,
  UPLOAD_PORTRAIT_SUCCESS,
  UPLOAD_PORTRAIT_FAILURE,
] = createRequestActionTypes('write/UPLOAD_PORTRAIT');

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

export const setOriginalComment = (comment) => ({
  type: SET_ORIGINAL_COMMENT,
  payload: comment,
});

export const setOriginProfile = (profile) => ({
  type: SET_ORIGINAL_PROFILE,
  payload: profile,
})

export const posting = ({ title, contents, hashTags }) => ({
  type: POSTING,
  payload: {
    title,
    contents,
    hashTags,
  },
});

export const commenting = (comment) => ({
  type: COMMENTING,
  payload: comment,
});

export const update = ({
  id,
  title,
  contents,
  hashTags,
}) => ({
  type: UPDATE,
  payload: {
    id,
    title,
    contents,
    hashTags,
  },
});

export const uploadImage = (formData) => ({
  type: UPLOAD_PORTRAIT,
  payload: formData,
});
