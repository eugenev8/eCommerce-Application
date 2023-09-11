import { TokenCache, TokenStore } from '@commercetools/sdk-client-v2';

const initialTokenStore = { token: '', expirationTime: 0 };

const tokenStore: TokenStore = { ...initialTokenStore };

const tokenCache: TokenCache = {
  get: () => initialTokenStore,
  set: (data) => {
    localStorage.setItem(import.meta.env.VITE_LOCALSTORAGE_KEY_CUSTOMER_TOKENS, JSON.stringify(data));
    tokenStore.token = data.token;
    tokenStore.refreshToken = data.refreshToken;
    tokenStore.expirationTime = data.expirationTime;
  },
};

export { tokenCache };

export default tokenStore;
