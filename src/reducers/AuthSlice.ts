/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { loginAnonymous, loginPassword } from './ActionCreators';

enum AuthStatus {
  CredentialsFlow = 'CredentialsFlow',
  AnonymousFlow = 'AnonymousFlow',
  TokenFlow = 'TokenFlow',
}

interface State {
  isLoading: boolean;
  authStatus: AuthStatus;
  anonymousId: string;
  customerId: string;
  customerToken: string;
  error: string;
  refreshToken: string;
}

const initialState: State = {
  isLoading: false,
  authStatus: AuthStatus.CredentialsFlow,
  anonymousId: '',
  customerId: '',
  customerToken: '',
  refreshToken: '',
  error: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.anonymousId = '';
      state.customerId = '';
      state.customerToken = '';
      state.refreshToken = '';
      state.error = '';
      state.authStatus = AuthStatus.CredentialsFlow;
    },
    authorizationError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginAnonymous.fulfilled, (state, action) => {
      state.error = '';
      state.anonymousId = action.payload;
      state.authStatus = AuthStatus.AnonymousFlow;
    });
    builder.addCase(loginAnonymous.rejected, (state, action) => {
      state.error = action.payload || '';
    });
    builder.addCase(loginPassword.fulfilled, (state, action) => {
      state.error = '';
      state.anonymousId = '';
      state.customerToken = action.payload.token;
      state.refreshToken = action.payload.refreshToken || '';
      state.authStatus = AuthStatus.TokenFlow;
    });
    builder.addCase(loginPassword.rejected, (state, action) => {
      state.error = action.payload || '';
    });
  },
});

export default authSlice.reducer;
