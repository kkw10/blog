import qs from 'qs';
import client from './client';

export const list = ({ userId, page }) => {
  const queryString = qs.stringify({
    page,
  });

  console.log('Posts api log');
  console.log(userId);
  console.log(page);

  if (userId) {
    return client.get(`/api/posts/${userId}?${queryString}`);
  }

  return client.get(`/api/posts?${queryString}`);
};
