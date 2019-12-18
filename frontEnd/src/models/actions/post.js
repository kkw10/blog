import { createRequestActionTypes } from '../sagas/createRequestSaga';

export const [
  COMMENTING,
  COMMENTING_SUCCESS,
  COMMENTING_FAILURE,
] = createRequestActionTypes('post/COMMENTING');
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
export const [
  UPDATE_COMMENT,
  UPDATE_COMMENT_SUCCESS,
  UPDATE_COMMENT_FAILURE,
] = createRequestActionTypes('post/UPDATE_COMMENT');
export const [
  UPDATE_SUB_COMMENT,
  UPDATE_SUB_COMMENT_SUCCESS,
  UPDATE_SUB_COMMENT_FAILURE,
] = createRequestActionTypes('post/UPDATE_SUB_COMMENT');
export const [
  SUB_COMMENTING,
  SUB_COMMENTING_SUCCESS,
  SUB_COMMENTING_FAILURE,
] = createRequestActionTypes('post/SUB_COMMENTING');
export const [
  READ_SUB_COMMENTS,
  READ_SUB_COMMENTS_SUCCESS,
  READ_SUB_COMMENTS_FAILURE,
] = createRequestActionTypes('post/READ_SUB_COMMENTS');
export const HIDE_SUB_COMMENTS = 'post/HIDE_SUB_COMMENTS';
export const [
  REFRESH_COMMENTS,
  REFRESH_COMMENTS_SUCCESS,
  REFRESH_COMMENTS_FAILURE,
] = createRequestActionTypes('post/REFRESH_COMMENTS');

export const commenting = (comment) => ({
  type: COMMENTING,
  payload: comment,
});

export const readPost = (id) => ({
  type: READ_POST,
  payload: id,
});

export const readComments = ({ postId, lastCommentId }) => ({
  type: READ_COMMENTS,
  payload: {
    postId,
    lastCommentId,
  },
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

export const deleteComment = ({ commentId, parentId }) => ({
  type: DELETE_COMMENT,
  payload: {
    commentId,
    parentId,
  },
});

export const updateComment = ({ postId, commentId, contents }) => ({
  type: UPDATE_COMMENT,
  payload: {
    postId,
    commentId,
    contents,
  },
});

export const updateSubComment = ({ commentId, parentId, contents }) => ({
  type: UPDATE_SUB_COMMENT,
  payload: {
    commentId,
    parentId,
    contents,
  },
});

export const subCommenting = (comment) => ({
  type: SUB_COMMENTING,
  payload: comment,
});

export const readSubComments = (commentId) => ({
  type: READ_SUB_COMMENTS,
  payload: commentId,
});

export const hideSubComments = (commentId) => ({
  type: HIDE_SUB_COMMENTS,
  payload: commentId,
});

export const refreshComments = (postId) => ({
  type: REFRESH_COMMENTS,
  payload: postId,
});
