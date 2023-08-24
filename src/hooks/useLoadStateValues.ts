import { useEffect } from 'react';
import { useAppDispatch } from './redux';
import { getTokenFlowApiRoot } from '../sdk/auth';
import apiRoots from '../sdk/apiRoots';
import { authSlice } from '../reducers/AuthSlice';
import { customerSlice } from '../reducers/CustomerSlice';

export default function useLoadStateValues() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function initState() {
      try {
        const customerToken = localStorage.getItem(import.meta.env.VITE_LOCALSTORAGE_KEY_CUSTOMER_TOKEN);
        if (!customerToken) return;
        const apiRoot = getTokenFlowApiRoot(customerToken);
        const customerRes = await apiRoot.me().get().execute();
        if (customerRes) {
          apiRoots.TokenFlow = apiRoot;
          dispatch(authSlice.actions.setLoadedToken(customerToken));
          dispatch(customerSlice.actions.initCustomerData(customerRes.body));
        }
      } catch {
        localStorage.removeItem(import.meta.env.VITE_LOCALSTORAGE_KEY_CUSTOMER_TOKEN);
      }
    }
    initState();
  }, [dispatch]);
}
