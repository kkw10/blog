import { createRequestActionTypes } from '../sagas/createRequestSaga';

export const [
  READ_POST,
  READ_POST_SUCCESS,
  READ_POST_FAILURE,
] = createRequestActionTypes('post/READ');
export const [
  READ_COMMENTS,
  READ_COMMENTS_SUCCESS,
  READ_COMMENTS_FAILURE,
] = createRequestActionTypes('post/READ_COMMENTS');
export const CLEAR_FORM = 'post/CLEAR_FORM';

export const readPost = (id) => ({
  type: READ_POST,
  payload: id,
});

export const readComments = (id) => ({
  type: READ_COMMENTS,
  payload: id,
});

export const clearForm = () => ({
  type: CLEAR_FORM,
});
