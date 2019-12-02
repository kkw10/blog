import client from './client';

export const follow = (targetId) => (
  client.post(`/api/user/follow/${targetId}`)
);

export const unfollow = (targetId) => (
  client.post(`/api/user/unfollow/${targetId}`)
);
