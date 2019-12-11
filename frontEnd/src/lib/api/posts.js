import qs from 'qs';
import client from './client';

export const list = ({ tagName, userId, liked, page }) => {
  const queryString = qs.stringify({
    page,
  });

  if (tagName) {
    return client.get(`/api/posts/tagged/${tagName}?${queryString}`);
  }

  if (userId) {
    return client.get(`/api/posts/user/${userId}?${queryString}`);
  }

  if (liked) {
    return client.get(`/api/posts/liked?${queryString}`);
  }

  return client.get(`/api/posts?${queryString}`);
};
