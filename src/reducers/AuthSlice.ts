/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { loginAnonymous, loginWithPassword } from './ActionCreators';
import { checkCustomerToken, getTokenFlowApiRoot } from '../sdk/auth';
import apiRoots from '../sdk/apiRoots';

enum AuthStatus {
  CredentialsFlow = 'CredentialsFlow',
  AnonymousFlow = 'AnonymousFlow',
  TokenFlow = 'TokenFlow',
}

interface AuthState {
  isLoading: boolean;
  authStatus: AuthStatus;
  anonymousId: string;
  customerToken: string;
  error: string;
  customerId?: string;
  refreshToken?: string;
}

const initialState: AuthState = {
  isLoading: false,
  authStatus: AuthStatus.CredentialsFlow,
  anonymousId: '',
  customerToken: '',
  error: '',
};

async function loadAuthState() {
  const customerToken = localStorage.getItem(import.meta.env.VITE_LOCALSTORAGE_KEY_CUSTOMER_TOKEN);

  if (!customerToken) return initialState;

  const result = await checkCustomerToken(customerToken);
  if (!result) return initialState;

  apiRoots.TokenFlow = getTokenFlowApiRoot(customerToken);
  const authState = { ...initialState, authStatus: AuthStatus.TokenFlow, customerToken };
  return authState;
}

export const authSlice = createSlice({
  name: 'auth',
  initialState: await loadAuthState(),
  reducers: {
    logout(state) {
      state.anonymousId = '';
      state.customerToken = '';
      state.error = '';
      state.authStatus = AuthStatus.CredentialsFlow;
      state.isLoading = false;
    },
    authorizationError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginAnonymous.fulfilled, (state, action) => {
      state.error = '';
      state.isLoading = false;
      state.anonymousId = action.payload;
      state.authStatus = AuthStatus.AnonymousFlow;
    });
    builder.addCase(loginAnonymous.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload || '';
    });
    builder.addCase(loginWithPassword.fulfilled, (state, action) => {
      state.error = '';
      state.anonymousId = '';
      state.isLoading = false;

      state.customerToken = action.payload.token;
      state.refreshToken = action.payload.refreshToken || '';
      state.authStatus = AuthStatus.TokenFlow;
    });
    builder.addCase(loginWithPassword.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload || '';
    });
    builder.addCase(loginWithPassword.pending, (state) => {
      state.isLoading = true;
    });
  },
});

export default authSlice.reducer;
