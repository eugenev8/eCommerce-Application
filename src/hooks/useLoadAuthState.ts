import { useEffect, useState } from 'react';
import { useAppDispatch } from './redux';
import { getRefreshTokenFlowApiRoot, getTokenFlowApiRoot } from '../sdk/auth';
import apiRoots from '../sdk/apiRoots';
import { authActions, AuthStatus } from '../reducers/AuthSlice';
import { customerSlice } from '../reducers/CustomerSlice';
import { getCart } from '../reducers/ActionCreators/Cart';
import tokenStores, { anonymousTokenCache, customerTokenCache } from '../sdk/tokenStores';
import { cartSlice } from '../reducers/CartSlice';

export default function useLoadAuthState() {
  const dispatch = useAppDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function initState() {
      try {
        const customerTokenStoreData = localStorage.getItem(import.meta.env.VITE_LOCALSTORAGE_KEY_CUSTOMER_TOKENS);
        if (customerTokenStoreData) {
          dispatch(authActions.setIsPending());

          tokenStores.customer = JSON.parse(customerTokenStoreData);

          const apiRoot = getRefreshTokenFlowApiRoot(tokenStores.customer.refreshToken || '', customerTokenCache);

          const customerResponse = await apiRoot.me().get().execute();

          dispatch(authActions.setAuthStatus(AuthStatus.CustomerFlow));
          apiRoots.CustomerFlow = getTokenFlowApiRoot(tokenStores.customer.token);
          dispatch(customerSlice.actions.setCustomer(customerResponse.body));
          dispatch(getCart(apiRoots.CustomerFlow));
          return;
        }
        const anonymousTokenStoreData = localStorage.getItem(import.meta.env.VITE_LOCALSTORAGE_KEY_ANONYMOUS_TOKENS);
        if (anonymousTokenStoreData) {
          dispatch(authActions.setIsPending());

          tokenStores.anonymous = JSON.parse(anonymousTokenStoreData);

          const apiRoot = getRefreshTokenFlowApiRoot(tokenStores.anonymous.refreshToken || '', anonymousTokenCache);

          const cartRes = await apiRoot.me().activeCart().get().execute();

          dispatch(authActions.setAuthStatus(AuthStatus.AnonymousFlow));
          apiRoots.AnonymousFlow = getTokenFlowApiRoot(tokenStores.anonymous.token);
          dispatch(cartSlice.actions.setCart(cartRes.body));
          return;
        }
        dispatch(authActions.setAuthStatus(AuthStatus.CredentialsFlow));
      } catch (e) {
        if (e instanceof Error) {
          if (e.message === 'invalid_token') {
            localStorage.removeItem(import.meta.env.VITE_LOCALSTORAGE_KEY_CUSTOMER_TOKENS);
            localStorage.removeItem(import.meta.env.VITE_LOCALSTORAGE_KEY_ANONYMOUS_TOKENS);
            dispatch(authActions.setAuthStatus(AuthStatus.CredentialsFlow));
          } else {
            throw e;
          }
        }
      }
    }
    initState().finally(() => setIsLoaded(true));
  }, [dispatch]);

  return isLoaded;
}
