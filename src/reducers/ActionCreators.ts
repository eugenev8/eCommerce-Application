import { createAsyncThunk } from '@reduxjs/toolkit';
import { TokenStore, UserAuthOptions } from '@commercetools/sdk-client-v2';
import { apiRoots, getAnonymousFlowApiRoot, getCustomerToken, getTokenFlowApiRoot } from '../sdk/roots';

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

const loginPassword = createAsyncThunk<TokenStore, UserAuthOptions, { rejectValue: string }>(
  'auth/loginPassword',
  async (user, { rejectWithValue }) => {
    try {
      const token = await getCustomerToken(user);
      const apiRoot = getTokenFlowApiRoot(token.token);
      apiRoots.TokenFlow = apiRoot;
      return token;
    } catch (e) {
      if (e instanceof Error) {
        return rejectWithValue(e.message);
      }
      return rejectWithValue('Unknown Error!');
    }
  }
);

export { loginAnonymous, loginPassword };
