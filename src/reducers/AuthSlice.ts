/* eslint-disable no-param-reassign */
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type AnonymousAuthProps = {
  apiRoot: ByProjectKeyRequestBuilder;
  anonymousId: string;
};

export type LoginAuthProps = {
  apiRoot: ByProjectKeyRequestBuilder;
  customerToken: string;
  refreshToken: string;
};

enum AuthStatus {
  Start,
  Anonymous,
  Customer,
}

interface AuthState {
  isLoading: boolean;
  status: AuthStatus;
  anonymousId: string;
  customerId: string;
  customerToken: string;
  error: string;
  refreshToken: string;
  apiRoot?: ByProjectKeyRequestBuilder;
}

const initialState: AuthState = {
  isLoading: false,
  status: AuthStatus.Start,
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
    authorization(state) {
      state.error = '';
      state.isLoading = true;
    },
    authorizationError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    authorizationAnonymousSuccess(state, action: PayloadAction<AnonymousAuthProps>) {
      state.isLoading = false;
      state.status = AuthStatus.Anonymous;
      state.apiRoot = action.payload.apiRoot;
      state.anonymousId = action.payload.anonymousId;
    },
    authorizationLoginSuccess(state, action: PayloadAction<LoginAuthProps>) {
      state.isLoading = false;
      state.anonymousId = '';
      state.status = AuthStatus.Customer;
      state.customerToken = action.payload.customerToken;
      state.refreshToken = action.payload.refreshToken;
      state.apiRoot = action.payload.apiRoot;
    },
    authorizationLogout(state) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      state = initialState;
    },
  },
});

export default authSlice.reducer;
