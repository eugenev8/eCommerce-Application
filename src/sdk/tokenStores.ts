import { TokenCache, TokenStore } from '@commercetools/sdk-client-v2';

const initialTokenStore = { token: '', expirationTime: 0 };

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
    localStorage.setItem(import.meta.env.VITE_LOCALSTORAGE_KEY_CUSTOMER_TOKENS, JSON.stringify(data));
    tokenStores.customer = { ...data };
  },
};

const anonymousTokenCache: TokenCache = {
  get: () => initialTokenStore,
  set: (data) => {
    localStorage.setItem(import.meta.env.VITE_LOCALSTORAGE_KEY_ANONYMOUS_TOKENS, JSON.stringify(data));
    tokenStores.anonymous = { ...data };
  },
};

export { customerTokenCache, anonymousTokenCache };

export default tokenStores;
