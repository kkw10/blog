import client from './client';

export const list = () => (
  client.get('/api/posts')
);
