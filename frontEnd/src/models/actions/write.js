import { createRequestActionTypes } from '../sagas/createRequestSaga';

export const INITIALIZE = 'write/INITIALIZE';
export const CHANGE_FIELD = 'write/CHANGE_FIELD';
export const [
  POSTING,
  POSTING_SUCCESS,
  POSTING_FAILURE,
] = createRequestActionTypes('write/POSTING');

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

export const posting = ({ title, contents, hashTags }) => ({
  type: POSTING,
  payload: {
    title,
    contents,
    hashTags,
  },
});
