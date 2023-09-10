import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  Cart,
  CartDraft,
  Category,
  Customer,
  CustomerDraft,
  CustomerSignin,
  MyCartUpdate,
  MyCustomerChangePassword,
  MyCustomerUpdate,
} from '@commercetools/platform-sdk';
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

      dispatch(authSlice.actions.authCustomerSuccess());
      apiRoots.TokenFlow = getTokenFlowApiRoot(tokenStore.token);
      toaster.showSuccess('Login successful!');
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
      dispatch(authSlice.actions.isPending());

      await apiRoots.CredentialsFlow.customers().post({ body: customerDraft }).execute();

      const customerRes = await getCustomerData({ email: customerDraft.email, password: customerDraft.password! });

      dispatch(authSlice.actions.authCustomerSuccess());
      apiRoots.TokenFlow = getTokenFlowApiRoot(tokenStore.token);
      toaster.showSuccess("Registration successful! You're now login in!");
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
      if (!apiRoots.TokenFlow) {
        return rejectWithValue('Error with token flow');
      }

      await apiRoots.TokenFlow.me().password().post({ body: values }).execute();

      dispatch(authSlice.actions.isPending());

      const customerRes = await getCustomerData({
        email: values.email,
        password: values.newPassword,
      });

      apiRoots.TokenFlow = getTokenFlowApiRoot(tokenStore.token);
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
      if (!apiRoots.TokenFlow) {
        return rejectWithValue('Error with token flow');
      }

      const customerRes = await apiRoots.TokenFlow.me().post({ body: updates }).execute();

      return customerRes.body;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? getErrorMessageForUser(error.message) : getErrorMessageForUser('Unknown error');
      dispatch(authSlice.actions.authError(errorMessage));
      return rejectWithValue(errorMessage);
    }
  }
);

const getCategories = createAsyncThunk<Category[], void, { rejectValue: string }>(
  'categories/getCategories',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const categoriesRes = await apiRoots.CredentialsFlow.categories().get().execute();
      return categoriesRes.body.results;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? getErrorMessageForUser(error.message) : getErrorMessageForUser('Unknown error');
      dispatch(authSlice.actions.authError(errorMessage));
      return rejectWithValue(errorMessage);
    }
  }
);

const createCustomerCart = createAsyncThunk<Cart, CartDraft, { rejectValue: string }>(
  'cart/createCustomerCart',
  async (cartDraft: CartDraft, { rejectWithValue, dispatch }) => {
    try {
      if (!apiRoots.TokenFlow) {
        return rejectWithValue('Error with token flow');
      }
      const cartRes = await apiRoots.TokenFlow.me().carts().post({ body: cartDraft }).execute();
      return cartRes.body;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? getErrorMessageForUser(error.message) : getErrorMessageForUser('Unknown error');
      dispatch(authSlice.actions.authError(errorMessage));
      return rejectWithValue(errorMessage);
    }
  }
);

const getCustomerCart = createAsyncThunk<Cart, void, { rejectValue: string }>(
  'cart/getCustomerCart',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      if (!apiRoots.TokenFlow) {
        return rejectWithValue('Error with token flow');
      }
      const cartRes = await apiRoots.TokenFlow.me().activeCart().get().execute();
      return cartRes.body;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? getErrorMessageForUser(error.message) : getErrorMessageForUser('Unknown error');
      dispatch(authSlice.actions.authError(errorMessage));
      return rejectWithValue(errorMessage);
    }
  }
);

export interface MyCartUpdateWithCartId extends MyCartUpdate {
  cartId: string;
}

const addNewLineItem = createAsyncThunk<Cart, MyCartUpdateWithCartId, { rejectValue: string }>(
  'cart/addLineItemInCart',
  async (updateAction, { rejectWithValue, dispatch }) => {
    try {
      if (!apiRoots.TokenFlow) {
        return rejectWithValue('Error with token flow');
      }
      const cartRes = await apiRoots.TokenFlow.me()
        .carts()
        .withId({ ID: updateAction.cartId })
        .post({ body: updateAction })
        .execute();

      return cartRes.body;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? getErrorMessageForUser(error.message) : getErrorMessageForUser('Unknown error');
      dispatch(authSlice.actions.authError(errorMessage));
      return rejectWithValue(errorMessage);
    }
  }
);

export {
  loginWithPassword,
  signupCustomer,
  changeCustomerPassword,
  updateCustomerData,
  getCategories,
  createCustomerCart,
  getCustomerCart,
  addNewLineItem,
};
