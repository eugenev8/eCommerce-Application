/* eslint-disable no-param-reassign */
import { AnyAction, PayloadAction, createSlice } from '@reduxjs/toolkit';
import { loginAnonymous, loginWithPassword, signupCustomer } from './ActionCreators';

enum AuthStatus {
  CredentialsFlow = 'CredentialsFlow',
  AnonymousFlow = 'AnonymousFlow',
  TokenFlow = 'TokenFlow',
}

interface AuthState {
  isLoading: boolean;
  authStatus: AuthStatus;
  customerToken: string;
  error: string;
  anonymousId?: string;
  customerId?: string;
  refreshToken?: string;
}

const initialState: AuthState = {
  isLoading: false,
  authStatus: AuthStatus.CredentialsFlow,
  customerToken: '',
  error: '',
};

function isError(action: AnyAction) {
  return action.type.endsWith('rejected');
}

function isPending(action: AnyAction) {
  return action.type.endsWith('pending');
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoadedToken(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.customerToken = action.payload;
      state.authStatus = AuthStatus.TokenFlow;
    },
    logout() {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginAnonymous.fulfilled, (state, action) => {
      state.isLoading = false;
      state.anonymousId = action.payload;
      state.authStatus = AuthStatus.AnonymousFlow;
    });
    builder.addCase(loginWithPassword.fulfilled, (state, action) => {
      state.isLoading = false;
      state.customerToken = action.payload.token;
      state.refreshToken = action.payload.refreshToken || '';
      state.authStatus = AuthStatus.TokenFlow;
    });
    builder.addCase(signupCustomer.fulfilled, (state, action) => {
      state.isLoading = false;
      state.customerToken = action.payload.token;
      state.refreshToken = action.payload.refreshToken || '';
      state.authStatus = AuthStatus.TokenFlow;
    });
    builder.addMatcher(isError, (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addMatcher(isPending, (state) => {
      state.error = '';
      state.isLoading = true;
    });
  },
});

export { authSlice, AuthStatus };

export default authSlice.reducer;
