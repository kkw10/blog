import client from './client';

export const follow = ({ type, targetId }) => {
  return client.post(`/api/user/${type}/${targetId}`);
};

export const unfollowFromList = ({ type, targetId }) => {
  return client.post(`/api/user/${type}/${targetId}`);
};

export const readFollowList = ({ type, targetId }) => {
  return client.get(`/api/user/${type}/${targetId}`);
};
