import { TokenCache, TokenStore } from '@commercetools/sdk-client-v2';

const initialTokenStore: TokenStore = { token: '', expirationTime: 0 };

type TokenStores = {
  customer: TokenStore;
  anonymous: TokenStore;
};

const tokenStores: TokenStores = {
  customer: { ...initialTokenStore },
  anonymous: { ...initialTokenStore },
};

const customerTokenCache: TokenCache = {
  get: () => initialTokenStore,
  set: (data) => {
    tokenStores.customer.token = data.token;
    tokenStores.customer.expirationTime = data.expirationTime;
    if (data.refreshToken) {
      tokenStores.customer.refreshToken = data.refreshToken;
    }
    localStorage.setItem(import.meta.env.VITE_LOCALSTORAGE_KEY_CUSTOMER_TOKENS, JSON.stringify(tokenStores.customer));
  },
};

const anonymousTokenCache: TokenCache = {
  get: () => initialTokenStore,
  set: (data) => {
    tokenStores.anonymous.token = data.token;
    tokenStores.anonymous.expirationTime = data.expirationTime;
    if (data.refreshToken) {
      tokenStores.anonymous.refreshToken = data.refreshToken;
    }
    localStorage.setItem(import.meta.env.VITE_LOCALSTORAGE_KEY_ANONYMOUS_TOKENS, JSON.stringify(tokenStores.anonymous));
  },
};

export { customerTokenCache, anonymousTokenCache };

export default tokenStores;
