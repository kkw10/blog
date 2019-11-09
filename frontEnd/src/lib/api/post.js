import client from './client';

export const write = ({ title, contents, hashTags }) => (
  client.post('/api/post', { title, contents, hashTags })
);
