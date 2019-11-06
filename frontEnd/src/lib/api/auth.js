import client from './client';

export const register = ({ email, nickname, password }) => (
  client.post('/api/auth/register', { email, nickname, password })
);

export const login = ({ email, password }) => (
  client.post('/api/auth/login', { email, password })
);

export const logout = () => (
  client.post('/api/auth/logout')
);

export const check = () => (
  client.get('/api/auth/check')
);
