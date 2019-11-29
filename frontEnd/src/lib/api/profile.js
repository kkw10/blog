import client from './client';

export const uploadProfile = (profileData) => (
  client.post('/api/profile', profileData)
);

export const uploadImage = (formData) => (
  client.post('/api/profile/portrait', formData)
);

export const getProfile = (targetId) => (
  client.get(`/api/profile/${targetId}`)
);
