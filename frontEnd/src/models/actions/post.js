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
export const [
  RECOMEND,
  RECOMEND_SUCCESS,
  RECOMEND_FAILURE,
] = createRequestActionTypes('post/RECOMEND');
export const [
  THUMBS_UP,
  THUMBS_UP_SUCCESS,
  THUMBS_UP_FAILURE,
] = createRequestActionTypes('post/THUMBS_UP');
export const [
  THUMBS_DOWN,
  THUMBS_DOWN_SUCCESS,
  THUMBS_DOWN_FAILURE,
] = createRequestActionTypes('post/THUMBS_DOWN');
export const [
  DELETE_COMMENT,
  DELETE_COMMENT_SUCCESS,
  DELETE_COMMENT_FAILURE,
] = createRequestActionTypes('post/DELETE_COMMENT');

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

export const recomend = (postId) => ({
  type: RECOMEND,
  payload: postId,
});

export const thumbsUp = ({ postId, commentId }) => ({
  type: THUMBS_UP,
  payload: {
    postId,
    commentId,
  },
});

export const thumbsDown = ({ postId, commentId }) => ({
  type: THUMBS_DOWN,
  payload: {
    postId,
    commentId,
  },
});

export const deleteComment = ({ postId, commentId }) => ({
  type: DELETE_COMMENT,
  payload: {
    postId,
    commentId,
  },
});
