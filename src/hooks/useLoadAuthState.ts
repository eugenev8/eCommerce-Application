import { useEffect } from 'react';
import { useAppDispatch } from './redux';
import { getTokenFlowApiRoot } from '../sdk/auth';
import apiRoots from '../sdk/apiRoots';
import { authSlice } from '../reducers/AuthSlice';
import { customerSlice } from '../reducers/CustomerSlice';

export default function useLoadAuthState() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function initState() {
      try {
        const customerToken = localStorage.getItem(import.meta.env.VITE_LOCALSTORAGE_KEY_CUSTOMER_TOKEN);
        if (!customerToken) {
          dispatch(authSlice.actions.authCredential());
          return;
        }

        dispatch(authSlice.actions.isPending());

        const apiRoot = getTokenFlowApiRoot(customerToken);
        const customerRes = await apiRoot.me().get().execute();

        apiRoots.TokenFlow = apiRoot;
        dispatch(authSlice.actions.authCustomerSuccess());
        dispatch(customerSlice.actions.initCustomerData(customerRes.body));
      } catch (e) {
        if (e instanceof Error) {
          if (e.message === 'invalid_token') {
            localStorage.removeItem(import.meta.env.VITE_LOCALSTORAGE_KEY_CUSTOMER_TOKEN);
            dispatch(authSlice.actions.authCredential());
          } else {
            throw e;
          }
        }
      }
    }
    initState();
  }, [dispatch]);
}
