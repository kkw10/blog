import { createRequestActionTypes } from '../sagas/createRequestSaga';

export const [
  READ_POSTS,
  READ_POSTS_SUCCESS,
  READ_POSTS_FAILURE,
] = createRequestActionTypes('posts/READ_POSTS');

export const readPosts = (page) => ({
  type: READ_POSTS,
  payload: page,
});
