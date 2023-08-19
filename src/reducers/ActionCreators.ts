import { createAsyncThunk } from '@reduxjs/toolkit';
import { TokenStore, UserAuthOptions } from '@commercetools/sdk-client-v2';
import { getAnonymousFlowApiRoot, getCustomerToken, getTokenFlowApiRoot } from '../sdk/auth';
import apiRoots from '../sdk/apiRoots';

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
        return rejectWithValue(e.message);
      }
      return rejectWithValue('Unknown Error!');
    }
  }
);

const loginWithPassword = createAsyncThunk<TokenStore, UserAuthOptions, { rejectValue: string }>(
  'auth/loginPassword',
  async (user, { rejectWithValue }) => {
    try {
      const tokenStore = await getCustomerToken(user);
      const apiRoot = getTokenFlowApiRoot(tokenStore.token);
      apiRoots.TokenFlow = apiRoot;
      localStorage.setItem(import.meta.env.VITE_LOCALSTORAGE_KEY_CUSTOMER_TOKEN, tokenStore.token);
      return tokenStore;
    } catch (e) {
      if (e instanceof Error) {
        return rejectWithValue(e.message);
      }
      return rejectWithValue('Unknown Error!');
    }
  }
);

export { loginAnonymous, loginWithPassword };
