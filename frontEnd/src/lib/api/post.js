import client from './client';

export const write = ({ title, contents, hashTags }) => (
  client.post('/api/post', { title, contents, hashTags })
);

export const writeComment = ({ postId, contents }) => (
  client.post(`/api/post/${postId}/comment`, { contents })
);

export const read = (id) => (
  client.get(`/api/post/${id}`)
);

export const readComments = (id) => (
  client.get(`/api/post/${id}/comments`)
);

export const update = ({ id, title, contents, hashTags }) => (
  client.patch(`/api/post/${id}`, { title, contents, hashTags })
);

export const remove = (id) => (
  client.delete(`/api/post/${id}`)
);
