import qs from 'qs';
import client from './client';

export const list = ({ tagName, userId, page }) => {
  const queryString = qs.stringify({
    page,
  });

  if (tagName) {
    return client.get(`/api/posts/tagged/${tagName}?${queryString}`);
  }

  if (userId) {
    return client.get(`/api/posts/${userId}?${queryString}`);
  }

  return client.get(`/api/posts?${queryString}`);
};
