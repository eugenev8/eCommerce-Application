import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  Customer,
  CustomerDraft,
  CustomerSignin,
  MyCustomerChangePassword,
  MyCustomerUpdate,
} from '@commercetools/platform-sdk';
import { getCustomerData, getTokenFlowApiRoot } from '../../sdk/auth';
import apiRoots from '../../sdk/apiRoots';
import toaster from '../../services/toaster';
import getErrorMessageForUser from '../../utils/getErrorMessageForUser';
import tokenStores from '../../sdk/tokenStores';
import { authSlice, AuthStatus } from '../AuthSlice';

import { createCustomerCart, getCustomerCart } from './CartActions';
import { cartSlice } from '../CartSlice';

function eraseAnonymousDataInLocalStorage() {
  localStorage.removeItem(import.meta.env.VITE_LOCALSTORAGE_KEY_ANONYMOUS_TOKENS);
  localStorage.removeItem(import.meta.env.VITE_LOCALSTORAGE_KEY_ANONYMOUS_ID);
}

const loginCustomer = createAsyncThunk<Customer, CustomerSignin, { rejectValue: string }>(
  'customer/loginWithPassword',
  async (customerSignin, { rejectWithValue, dispatch }) => {
    try {
      dispatch(authSlice.actions.setIsPending());
      const customerRes = await getCustomerData(customerSignin);

      toaster.showSuccess('Login successful!');

      dispatch(authSlice.actions.setAuthStatus(AuthStatus.CustomerFlow));

      apiRoots.CustomerFlow = getTokenFlowApiRoot(tokenStores.customer.token);
      eraseAnonymousDataInLocalStorage();
      if (customerRes.body.cart) {
        dispatch(cartSlice.actions.setCart(customerRes.body.cart));
      } else {
        dispatch(getCustomerCart());
      }
      return customerRes.body.customer;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? getErrorMessageForUser(error.message) : getErrorMessageForUser('Unknown error');
      dispatch(authSlice.actions.authError(errorMessage));
      return rejectWithValue(errorMessage);
    }
  }
);

const signupCustomer = createAsyncThunk<Customer, CustomerDraft, { rejectValue: string }>(
  'customer/signup',
  async (customerDraft, { rejectWithValue, dispatch }) => {
    try {
      dispatch(authSlice.actions.setIsPending());

      await apiRoots.CredentialsFlow.customers().post({ body: customerDraft }).execute();

      const customerRes = await getCustomerData({ email: customerDraft.email, password: customerDraft.password! });

      dispatch(authSlice.actions.setAuthStatus(AuthStatus.CustomerFlow));
      apiRoots.CustomerFlow = getTokenFlowApiRoot(tokenStores.customer.token);
      toaster.showSuccess("Registration successful! You're now login in!");
      eraseAnonymousDataInLocalStorage();
      if (customerRes.body.cart) {
        dispatch(cartSlice.actions.setCart(customerRes.body.cart));
      } else {
        dispatch(createCustomerCart());
      }
      return customerRes.body.customer;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? getErrorMessageForUser(error.message) : getErrorMessageForUser('Unknown error');
      dispatch(authSlice.actions.authError(errorMessage));
      return rejectWithValue(errorMessage);
    }
  }
);

interface MyCustomerChangePasswordWithEmail extends MyCustomerChangePassword {
  email: string;
}

const changeCustomerPassword = createAsyncThunk<Customer, MyCustomerChangePasswordWithEmail, { rejectValue: string }>(
  'customer/changePassword',
  async (values, { rejectWithValue, dispatch }) => {
    try {
      if (!apiRoots.CustomerFlow) {
        return rejectWithValue('Error with token flow');
      }

      await apiRoots.CustomerFlow.me().password().post({ body: values }).execute();

      dispatch(authSlice.actions.setIsPending());

      const customerRes = await getCustomerData({
        email: values.email,
        password: values.newPassword,
      });

      apiRoots.CustomerFlow = getTokenFlowApiRoot(tokenStores.customer.token);
      toaster.showSuccess('Password changed successfully!');
      return customerRes.body.customer;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? getErrorMessageForUser(error.message) : getErrorMessageForUser('Unknown error');
      dispatch(authSlice.actions.authError(errorMessage));
      return rejectWithValue(errorMessage);
    }
  }
);

const updateCustomerData = createAsyncThunk<Customer, MyCustomerUpdate, { rejectValue: string }>(
  'customer/updateData',
  async (updates, { rejectWithValue, dispatch }) => {
    try {
      if (!apiRoots.CustomerFlow) {
        return rejectWithValue('Error with token flow');
      }

      const customerRes = await apiRoots.CustomerFlow.me().post({ body: updates }).execute();

      return customerRes.body;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? getErrorMessageForUser(error.message) : getErrorMessageForUser('Unknown error');
      dispatch(authSlice.actions.authError(errorMessage));
      return rejectWithValue(errorMessage);
    }
  }
);

export { loginCustomer, signupCustomer, changeCustomerPassword, updateCustomerData };
