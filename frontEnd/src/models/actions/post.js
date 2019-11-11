import { createRequestActionTypes } from '../sagas/createRequestSaga';

export const [
  READ_POST,
  READ_POST_SUCCESS,
  READ_POST_FAILURE,
] = createRequestActionTypes('post/READ');

export const readPost = (id) => ({
  type: READ_POST,
  payload: id,
});
