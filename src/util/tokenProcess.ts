import { TokenStore } from '@commercetools/sdk-client-v2';

export const tokenCache = {
  get: () => {
    const cache = localStorage.getItem('token');
    return cache ? JSON.parse(cache) : null;
  },
  set: (cache: TokenStore) => {
    localStorage.setItem('token', JSON.stringify(cache));
    return;
  },
};

export const getExistingToken = () => {
  const cache = localStorage.getItem('token');
  const token = cache ? `Bearer ${JSON.parse(cache)?.token}` : '';
  console.log('getExistingToken', token);
  return token;
};
