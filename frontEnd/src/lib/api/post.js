import qs from 'qs';
import client from './client';

export const write = ({ title, contents, hashTags }) => (
  client.post('/api/post', { title, contents, hashTags })
);

export const writeComment = ({ postId, contents }) => (
  client.post(`/api/post/${postId}/comment`, { contents })
);

export const writeSubComment = ({ commentId, contents }) => (
  client.post(`/api/post/subcomment/${commentId}`, { contents })
);

export const read = (id) => (
  client.get(`/api/post/${id}`)
);

export const readComments = ({ postId, lastCommentId = 0 }) => {
  const queryString = qs.stringify({
    lastCommentId,
  });

  return client.get(`/api/post/${postId}/comments?${queryString}`)
};

export const readSubComments = (id) => (
  client.get(`/api/post/subcomments/${id}`)
);

export const update = ({ id, title, contents, hashTags }) => (
  client.patch(`/api/post/${id}`, { title, contents, hashTags })
);

export const updateComment = ({ postId, commentId, contents }) => (
  client.patch(`/api/post/comment/${postId}/${commentId}`, { contents })
);

export const updateSubComment = ({ commentId, parentId, contents }) => (
  client.patch(`/api/post/subcomment/${commentId}`, { parentId, contents })
);

export const remove = (id) => (
  client.delete(`/api/post/${id}`)
);

export const removeComment = ({ commentId, parentId }) => {
  const queryString = qs.stringify({
    parentId,
  });

  if (parentId) {
    return client.delete(`/api/post/comment/${commentId}?${queryString}`);
  }

  return client.delete(`/api/post/comment/${commentId}`);
};

export const recomend = (postId) => (
  client.post(`/api/post/${postId}/recomend`)
);

export const commentThumbs = ({ type, postId, commentId }) => {
  console.log(type);
  if (type === 'up') {
    return client.post(`/api/post/${postId}/comment/${commentId}/up`);
  }
  return client.post(`/api/post/${postId}/comment/${commentId}/down`);
};
