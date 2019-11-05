import client from './client';

export const register = ({ email, nickname, password }) => (
  client.post('/api/auth/register', { email, nickname, password }) 
);