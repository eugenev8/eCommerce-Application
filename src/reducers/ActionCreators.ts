import { createAsyncThunk } from '@reduxjs/toolkit';
import { Customer, CustomerDraft, CustomerSignin } from '@commercetools/platform-sdk';
import { getCustomerData, getTokenFlowApiRoot } from '../sdk/auth';
import apiRoots from '../sdk/apiRoots';
import toaster from '../services/toaster';
import getErrorMessageForUser from '../utils/getErrorMessageForUser';
import tokenStore from '../sdk/tokenStore';
import { authSlice } from './AuthSlice';

const loginWithPassword = createAsyncThunk<Customer, CustomerSignin, { rejectValue: string }>(
  'customer/loginWithPassword',
  async (user, { rejectWithValue, dispatch }) => {
    try {
      dispatch(authSlice.actions.isPending());

      const customerRes = await getCustomerData(user);

      dispatch(authSlice.actions.authSuccess());
      apiRoots.TokenFlow = getTokenFlowApiRoot(tokenStore.token);
      toaster.showSuccess('Login successeful!');
      return customerRes.body.customer;
    } catch (e) {
      const errorMessage =
        e instanceof Error ? getErrorMessageForUser(e.message) : getErrorMessageForUser('Unknown error');
      dispatch(authSlice.actions.authError(errorMessage));
      return rejectWithValue(errorMessage);
    }
  }
);

const signupCustomer = createAsyncThunk<Customer, CustomerDraft, { rejectValue: string }>(
  'customer/signup',
  async (customerDraft, { rejectWithValue, dispatch }) => {
    try {
      dispatch(authSlice.actions.isPending());

      await apiRoots.CredentialsFlow.customers().post({ body: customerDraft }).execute();

      const customerRes = await getCustomerData({ email: customerDraft.email, password: customerDraft.password! });

      dispatch(authSlice.actions.authSuccess());
      apiRoots.TokenFlow = getTokenFlowApiRoot(tokenStore.token);
      toaster.showSuccess("Registration successful! You're now loggin in!");
      return customerRes.body.customer;
    } catch (e) {
      const errorMessage =
        e instanceof Error ? getErrorMessageForUser(e.message) : getErrorMessageForUser('Unknown error');
      dispatch(authSlice.actions.authError(errorMessage));
      return rejectWithValue(errorMessage);
    }
  }
);

export { loginWithPassword, signupCustomer };
