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
import getErrorMessageForUser from '../../utils/getErrorMessageForUser';
import tokenStores from '../../sdk/tokenStores';
import { authActions, AuthStatus } from '../AuthSlice';

import { createCart, getCart } from './Cart';
import { cartSlice } from '../CartSlice';

function eraseAnonymousDataInLocalStorage() {
  localStorage.removeItem(import.meta.env.VITE_LOCALSTORAGE_KEY_ANONYMOUS_TOKENS);
}

const loginCustomer = createAsyncThunk<Customer, CustomerSignin, { rejectValue: string }>(
  'customer/loginWithPassword',
  async (customerSignin, { rejectWithValue, dispatch }) => {
    try {
      dispatch(authActions.setIsPending());
      const customerRes = await getCustomerData(customerSignin);

      dispatch(authActions.setAuthStatus(AuthStatus.CustomerFlow));

      apiRoots.CustomerFlow = getTokenFlowApiRoot(tokenStores.customer.token);
      eraseAnonymousDataInLocalStorage();
      if (customerRes.body.cart) {
        dispatch(cartSlice.actions.setCart(customerRes.body.cart));
      } else {
        dispatch(getCart(AuthStatus.CustomerFlow));
      }
      return customerRes.body.customer;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? getErrorMessageForUser(error.message) : getErrorMessageForUser('Unknown error');
      return rejectWithValue(errorMessage);
    }
  }
);

const signupCustomer = createAsyncThunk<Customer, CustomerDraft, { rejectValue: string }>(
  'customer/signup',
  async (customerDraft, { rejectWithValue, dispatch }) => {
    try {
      dispatch(authActions.setIsPending());

      await apiRoots.CredentialsFlow.customers().post({ body: customerDraft }).execute();

      const customerRes = await getCustomerData({ email: customerDraft.email, password: customerDraft.password! });

      dispatch(authActions.setAuthStatus(AuthStatus.CustomerFlow));
      apiRoots.CustomerFlow = getTokenFlowApiRoot(tokenStores.customer.token);

      eraseAnonymousDataInLocalStorage();
      if (customerRes.body.cart) {
        dispatch(cartSlice.actions.setCart(customerRes.body.cart));
      } else {
        dispatch(createCart(AuthStatus.CustomerFlow));
      }
      return customerRes.body.customer;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? getErrorMessageForUser(error.message) : getErrorMessageForUser('Unknown error');
      return rejectWithValue(errorMessage);
    }
  }
);

interface MyCustomerChangePasswordWithEmail extends MyCustomerChangePassword {
  email: string;
}

const changeCustomerPassword = createAsyncThunk<Customer, MyCustomerChangePasswordWithEmail, { rejectValue: string }>(
  'customer/changePassword',
  async (values, { rejectWithValue }) => {
    try {
      if (!apiRoots.CustomerFlow) {
        return rejectWithValue('Error with token flow');
      }

      await apiRoots.CustomerFlow.me().password().post({ body: values }).execute();

      const customerRes = await getCustomerData({
        email: values.email,
        password: values.newPassword,
      });

      apiRoots.CustomerFlow = getTokenFlowApiRoot(tokenStores.customer.token);

      return customerRes.body.customer;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? getErrorMessageForUser(error.message) : getErrorMessageForUser('Unknown error');
      return rejectWithValue(errorMessage);
    }
  }
);

const updateCustomerData = createAsyncThunk<Customer, MyCustomerUpdate, { rejectValue: string }>(
  'customer/updateData',
  async (updates, { rejectWithValue }) => {
    try {
      if (!apiRoots.CustomerFlow) {
        return rejectWithValue('Error with token flow');
      }

      const customerRes = await apiRoots.CustomerFlow.me().post({ body: updates }).execute();

      return customerRes.body;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? getErrorMessageForUser(error.message) : getErrorMessageForUser('Unknown error');
      return rejectWithValue(errorMessage);
    }
  }
);

export { loginCustomer, signupCustomer, changeCustomerPassword, updateCustomerData };
