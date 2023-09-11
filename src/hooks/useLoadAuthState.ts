import { useEffect, useState } from 'react';
import { TokenStore } from '@commercetools/sdk-client-v2';
import { useAppDispatch } from './redux';
import { getTokenFlowApiRoot } from '../sdk/auth';
import apiRoots from '../sdk/apiRoots';
import { authSlice, AuthStatus } from '../reducers/AuthSlice';
import { customerSlice } from '../reducers/CustomerSlice';
import { getCustomerCart } from '../reducers/ActionCreators';

export default function useLoadAuthState() {
  const dispatch = useAppDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function initState() {
      try {
        const customerTokenStoreData = localStorage.getItem(import.meta.env.VITE_LOCALSTORAGE_KEY_CUSTOMER_TOKENS);
        if (!customerTokenStoreData) {
          dispatch(authSlice.actions.setAuthStatus(AuthStatus.CredentialsFlow));
          return;
        }
        const customerTokenStore: TokenStore = JSON.parse(customerTokenStoreData);

        dispatch(authSlice.actions.isPending());

        const apiRoot = getTokenFlowApiRoot(customerTokenStore.token);
        const customerRes = await apiRoot.me().get().execute();

        apiRoots.CustomerFlow = apiRoot;
        dispatch(authSlice.actions.setAuthStatus(AuthStatus.CustomerFlow));
        dispatch(customerSlice.actions.initCustomerData(customerRes.body));
        dispatch(getCustomerCart());
      } catch (e) {
        if (e instanceof Error) {
          if (e.message === 'invalid_token') {
            localStorage.removeItem(import.meta.env.VITE_LOCALSTORAGE_KEY_CUSTOMER_TOKENS);
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
