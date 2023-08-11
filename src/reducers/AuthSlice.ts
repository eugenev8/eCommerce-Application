/* eslint-disable no-param-reassign */
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type AnonymousAuthProps = {
  rootApi: ByProjectKeyRequestBuilder;
  anonymousId: string;
};

enum AuthStatus {
  Start,
  Anonymous,
  Customer,
  Token,
}

interface AuthState {
  isLoading: boolean;
  status: AuthStatus;
  anonymousId: string;
  customerId: string;
  customerToken: string;
  error: string;
  apiRoot?: ByProjectKeyRequestBuilder;
}

const initialState: AuthState = {
  isLoading: false,
  status: AuthStatus.Start,
  anonymousId: '',
  customerId: '',
  customerToken: '',
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
    authorizationAnonymousSuccess(state, action: PayloadAction<AnonymousAuthProps>) {
      state.isLoading = false;
      state.apiRoot = action.payload.rootApi;
      state.anonymousId = action.payload.anonymousId;
    },
    authorizationAnonymousError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default authSlice.reducer;
