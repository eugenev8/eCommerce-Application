/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

enum AuthStatus {
  CredentialsFlow = 'CredentialsFlow',
  AnonymousFlow = 'AnonymousFlow',
  TokenFlow = 'TokenFlow',
}

interface AuthState {
  isLoading: boolean;
  authStatus: AuthStatus;
  error: string;
}

const initialState: AuthState = {
  isLoading: false,
  authStatus: AuthStatus.CredentialsFlow,
  error: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authSuccess(state) {
      state.isLoading = false;
      state.authStatus = AuthStatus.TokenFlow;
    },
    isPending(state) {
      state.isLoading = true;
      state.error = '';
    },
    authError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    logout() {
      return initialState;
    },
  },
});

export { authSlice, AuthStatus };

export default authSlice.reducer;
