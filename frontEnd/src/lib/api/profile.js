import client from './client';

export const uploadImage = (formData) => (
  client.post('/api/profile', formData)
);
