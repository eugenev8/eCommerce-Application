import { useEffect, useState } from 'react';
import { TokenStore } from '@commercetools/sdk-client-v2';
import { useAppDispatch } from './redux';
import { getTokenFlowApiRoot } from '../sdk/auth';
import apiRoots from '../sdk/apiRoots';
import { authSlice, AuthStatus } from '../reducers/AuthSlice';
import { customerSlice } from '../reducers/CustomerSlice';
import { getAnonymousCart, getCustomerCart } from '../reducers/ActionCreators/CartActions';

export default function useLoadAuthState() {
  const dispatch = useAppDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function initState() {
      try {
        const customerTokenStoreData = localStorage.getItem(import.meta.env.VITE_LOCALSTORAGE_KEY_CUSTOMER_TOKENS);
        if (customerTokenStoreData) {
          const customerTokenStore: TokenStore = JSON.parse(customerTokenStoreData);

          dispatch(authSlice.actions.setIsPending());

          const apiRoot = getTokenFlowApiRoot(customerTokenStore.token);
          const customerRes = await apiRoot.me().get().execute();

          apiRoots.CustomerFlow = apiRoot;
          dispatch(authSlice.actions.setAuthStatus(AuthStatus.CustomerFlow));
          dispatch(customerSlice.actions.initCustomerData(customerRes.body));
          dispatch(getCustomerCart());
          return;
        }
        const anonymousTokenStoreData = localStorage.getItem(import.meta.env.VITE_LOCALSTORAGE_KEY_ANONYMOUS_TOKENS);
        if (anonymousTokenStoreData) {
          const anonymousTokenStore: TokenStore = JSON.parse(anonymousTokenStoreData);

          dispatch(authSlice.actions.setIsPending());

          dispatch(getAnonymousCart(anonymousTokenStore.token)).then((data) => {
            if (data.type.includes('fulfilled')) {
              dispatch(authSlice.actions.setAuthStatus(AuthStatus.AnonymousFlow));
            } else {
              dispatch(authSlice.actions.setAuthStatus(AuthStatus.CredentialsFlow));
            }
          });
          return;
        }
        dispatch(authSlice.actions.setAuthStatus(AuthStatus.CredentialsFlow));
      } catch (e) {
        if (e instanceof Error) {
          if (e.message === 'invalid_token') {
            localStorage.removeItem(import.meta.env.VITE_LOCALSTORAGE_KEY_CUSTOMER_TOKENS);
            localStorage.removeItem(import.meta.env.VITE_LOCALSTORAGE_KEY_ANONYMOUS_TOKENS);
            localStorage.removeItem(import.meta.env.VITE_LOCALSTORAGE_KEY_ANONYMOUS_ID);
            dispatch(authSlice.actions.setAuthStatus(AuthStatus.CredentialsFlow));
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
