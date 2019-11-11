import client from './client';

export const write = ({ title, contents, hashTags }) => (
  client.post('/api/post', { title, contents, hashTags })
);

export const read = (id) => (
  client.get(`/api/post/${id}`)
);
