/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export enum AuthStatus {
  Initial = 'Initial',
  CredentialsFlow = 'CredentialsFlow',
  AnonymousFlow = 'AnonymousFlow',
  CustomerFlow = 'CustomerFlow',
}

interface AuthState {
  isLoading: boolean;
  authStatus: AuthStatus;
  error: string;
}

const initialState: AuthState = {
  isLoading: false,
  authStatus: AuthStatus.Initial,
  error: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthStatus(state, action: PayloadAction<AuthStatus>) {
      state.error = '';
      state.isLoading = false;
      state.authStatus = action.payload;
    },
    setIsPending(state) {
      state.isLoading = true;
      state.error = '';
    },
    authError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    logout(state) {
      state.error = '';
      state.isLoading = false;
      state.authStatus = AuthStatus.CredentialsFlow;
    },
  },
});

export const { reducer: authReducer, actions: authActions } = authSlice;
