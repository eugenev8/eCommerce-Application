import { createAsyncThunk } from '@reduxjs/toolkit';
import { Customer, CustomerDraft, CustomerSignin } from '@commercetools/platform-sdk';
import { TokenStore } from '@commercetools/sdk-client-v2';
import { getAnonymousFlowApiRoot, getCustomerToken, getTokenFlowApiRoot } from '../sdk/auth';
import apiRoots from '../sdk/apiRoots';
import toaster from '../services/toaster';
import { customerSlice } from './CustomerSlice';
import getAuthErrorMessage from '../utils/getAuthErrorMessage';

const loginAnonymous = createAsyncThunk<string, undefined, { rejectValue: string }>(
  'auth/loginAnonymous',
  async (_, { rejectWithValue }) => {
    try {
      const anonymousId = crypto.randomUUID();
      const apiRoot = getAnonymousFlowApiRoot(anonymousId);
      await apiRoot.get().execute();
      apiRoots.AnonymousFlow = apiRoot;
      return anonymousId;
    } catch (e) {
      if (e instanceof Error) {
        return rejectWithValue(getAuthErrorMessage(e.message));
      }
      return rejectWithValue('Unknown Error!');
    }
  }
);

const loginWithPassword = createAsyncThunk<TokenStore, CustomerSignin, { rejectValue: string }>(
  'auth/loginWithPassword',
  async (user, { rejectWithValue, dispatch }) => {
    function setCustomer(customer: Customer) {
      dispatch(customerSlice.actions.initCustomerData(customer));
    }
    try {
      const tokenStore = await getCustomerToken(user, setCustomer);
      const apiRoot = getTokenFlowApiRoot(tokenStore.token);
      apiRoots.TokenFlow = apiRoot;
      localStorage.setItem(import.meta.env.VITE_LOCALSTORAGE_KEY_CUSTOMER_TOKEN, tokenStore.token);
      toaster.showSuccess('Login successeful!');

      return tokenStore;
    } catch (e) {
      if (e instanceof Error) {
        return rejectWithValue(getAuthErrorMessage(e.message));
      }
      return rejectWithValue('Unknown Error!');
    }
  }
);

const signupCustomer = createAsyncThunk<TokenStore, CustomerDraft, { rejectValue: string }>(
  'auth/signupCustomer',
  async (customerDraft, { rejectWithValue, dispatch }) => {
    function setCustomerDataCallback(customer: Customer) {
      dispatch(customerSlice.actions.initCustomerData(customer));
    }

    try {
      await apiRoots.CredentialsFlow.customers().post({ body: customerDraft }).execute();
      const tokenStore = await getCustomerToken(
        { email: customerDraft.email, password: customerDraft.password! },
        setCustomerDataCallback
      );
      const apiRoot = getTokenFlowApiRoot(tokenStore.token);
      apiRoots.TokenFlow = apiRoot;
      localStorage.setItem(import.meta.env.VITE_LOCALSTORAGE_KEY_CUSTOMER_TOKEN, tokenStore.token);

      toaster.showSuccess("Registration successful! You're now loggin in!");
      return tokenStore;
    } catch (e) {
      if (e instanceof Error) {
        return rejectWithValue(getAuthErrorMessage(e.message));
      }
      return rejectWithValue('Unknown Error!');
    }
  }
);

export { loginAnonymous, loginWithPassword, signupCustomer };
