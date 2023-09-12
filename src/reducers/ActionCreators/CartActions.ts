import { createAsyncThunk } from '@reduxjs/toolkit';
import { Cart, CartDraft, MyCartUpdate } from '@commercetools/platform-sdk';
import { getAnonymousFlowApiRoot, getTokenFlowApiRoot } from '../../sdk/auth';
import apiRoots from '../../sdk/apiRoots';
import getErrorMessageForUser from '../../utils/getErrorMessageForUser';
import { authSlice, AuthStatus } from '../AuthSlice';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../../store';
import toaster from '../../services/toaster';

const PROJECT_CURRENCY = 'USD';

const setCart = createAsyncThunk<Cart, Cart>('cart/setCart', async (cart) => cart);

const createCustomerCart = createAsyncThunk<Cart, void, { rejectValue: string }>(
  'cart/createCustomerCart',
  async (_: void, { rejectWithValue, dispatch }) => {
    try {
      if (!apiRoots.CustomerFlow) {
        return rejectWithValue('Error with token flow');
      }
      const cartDraft: CartDraft = { currency: PROJECT_CURRENCY };
      const cartRes = await apiRoots.CustomerFlow.me().carts().post({ body: cartDraft }).execute();
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
      if (!apiRoots.CustomerFlow) {
        return rejectWithValue('Error with token flow');
      }
      const cartRes = await apiRoots.CustomerFlow.me().activeCart().get().execute();
      return cartRes.body;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? getErrorMessageForUser(error.message) : getErrorMessageForUser('Unknown error');
      dispatch(authSlice.actions.authError(errorMessage));
      return rejectWithValue(errorMessage);
    }
  }
);

const getAnonymousCart = createAsyncThunk<Cart, string, { rejectValue: string }>(
  'cart/getAnonymousCart',
  async (anonymousToken, { rejectWithValue, dispatch }) => {
    try {
      const apiRoot = getTokenFlowApiRoot(anonymousToken);
      const cartRes = await apiRoot.me().activeCart().get().execute();
      apiRoots.AnonymousFlow = apiRoot;
      return cartRes.body;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? getErrorMessageForUser(error.message) : getErrorMessageForUser('Unknown error');
      dispatch(authSlice.actions.authError(errorMessage));
      return rejectWithValue(errorMessage);
    }
  }
);

const addNewLineItem = createAsyncThunk<Cart, MyCartUpdate, { rejectValue: string; state: RootState }>(
  'cart/addLineItemInCart',
  async (updateAction, { rejectWithValue, dispatch, getState }) => {
    try {
      const { authStatus } = getState().authReducer;
      const { cart } = getState().cartReducer;

      if (authStatus === AuthStatus.Initial || authStatus === AuthStatus.CredentialsFlow) {
        toaster.showError(`apiRoots[authStatus]  ${apiRoots[authStatus]}`);
        return rejectWithValue('apiRoots[authStatus]');
      }

      if (!cart) {
        toaster.showError(`!cart `);
        return rejectWithValue('!cart');
      }

      const cartRes = await apiRoots[authStatus]!.me()
        .carts()
        .withId({ ID: cart.id })
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

const createAnonymousCart = createAsyncThunk<Cart, CartDraft, { rejectValue: string }>(
  'cart/createAnonymousCart',
  async (cartDraft: CartDraft, { rejectWithValue, dispatch }) => {
    try {
      const id = crypto.randomUUID();
      const anonymousApiRoot = getAnonymousFlowApiRoot(id);

      const cartRes = await anonymousApiRoot.me().carts().post({ body: cartDraft }).execute();
      localStorage.setItem(import.meta.env.VITE_LOCALSTORAGE_KEY_ANONYMOUS_ID, id);
      dispatch(authSlice.actions.setAuthStatus(AuthStatus.AnonymousFlow));
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
  PROJECT_CURRENCY,
  setCart,
  createCustomerCart,
  getCustomerCart,
  addNewLineItem,
  createAnonymousCart,
  getAnonymousCart,
};
