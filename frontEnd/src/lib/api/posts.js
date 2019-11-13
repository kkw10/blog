import qs from 'qs';
import client from './client';

export const list = (page) => {
  console.log(page);
  const queryString = qs.stringify({
    page,
  });

  console.log('@@@@@ [qeuryString] =>');
  console.log(queryString);

  return client.get(`/api/posts?${queryString}`);
};
