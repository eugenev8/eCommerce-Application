import { createAsyncThunk } from '@reduxjs/toolkit';
import { CustomerDraft } from '@commercetools/platform-sdk';
import { TokenStore, UserAuthOptions } from '@commercetools/sdk-client-v2';
import { getAnonymousFlowApiRoot, getCustomerToken, getTokenFlowApiRoot } from '../sdk/auth';
import apiRoots from '../sdk/apiRoots';
import toaster from '../services/toaster';

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
        toaster.showError(e.message);
        return rejectWithValue(e.message);
      }
      toaster.showError('Unknown Error!');
      return rejectWithValue('Unknown Error!');
    }
  }
);

const loginWithPassword = createAsyncThunk<TokenStore, UserAuthOptions, { rejectValue: string }>(
  'auth/loginWithPassword',
  async (user, { rejectWithValue }) => {
    try {
      const tokenStore = await getCustomerToken(user);
      const apiRoot = getTokenFlowApiRoot(tokenStore.token);
      apiRoots.TokenFlow = apiRoot;
      localStorage.setItem(import.meta.env.VITE_LOCALSTORAGE_KEY_CUSTOMER_TOKEN, tokenStore.token);
      toaster.showSuccess('Success!');
      return tokenStore;
    } catch (e) {
      if (e instanceof Error) {
        toaster.showError(e.message);
        return rejectWithValue(e.message);
      }
      toaster.showError('Unknown Error!');
      return rejectWithValue('Unknown Error!');
    }
  }
);

const signupCustomer = createAsyncThunk<TokenStore, CustomerDraft, { rejectValue: string }>(
  'auth/signupCustomer',
  async (customerDraft, { rejectWithValue }) => {
    try {
      await apiRoots.CredentialsFlow.customers().post({ body: customerDraft }).execute();
      const tokenStore = await getCustomerToken({ username: customerDraft.email, password: customerDraft.password! });
      const apiRoot = getTokenFlowApiRoot(tokenStore.token);
      apiRoots.TokenFlow = apiRoot;
      localStorage.setItem(import.meta.env.VITE_LOCALSTORAGE_KEY_CUSTOMER_TOKEN, tokenStore.token);
      toaster.showSuccess('Success!');
      return tokenStore;
    } catch (e) {
      if (e instanceof Error) {
        toaster.showError(e.message);
        return rejectWithValue(e.message);
      }
      toaster.showError('Unknown Error!');
      return rejectWithValue('Unknown Error!');
    }
  }
);

export { loginAnonymous, loginWithPassword, signupCustomer };
