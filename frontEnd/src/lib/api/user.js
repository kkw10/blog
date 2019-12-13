import client from './client';

export const follow = (targetId) => (
  client.post(`/api/user/follow/${targetId}`)
);

export const unfollow = (targetId) => (
  client.post(`/api/user/unfollow/${targetId}`)
);

export const unfollowing = (targetId) => (
  client.post(`/api/user/unfollowing/${targetId}`)
);

export const readFollowers = (targetId) => (
  client.get(`/api/user/followers/${targetId}`)
);

export const readFollowings = (targetId) => (
  client.get(`/api/user/followings/${targetId}`)
);
