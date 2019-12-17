import qs from 'qs';
import client from './client';

export const list = ({
  tagName,
  query,
  userId,
  liked,
  page,
}) => {
  let queryString = qs.stringify({ page });

  if (query) {
    queryString = qs.stringify({
      q: query,
      page,
    });
    return client.get(`/api/posts/search?${queryString}`);
  }

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
