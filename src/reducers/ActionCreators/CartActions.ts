import { createAsyncThunk } from '@reduxjs/toolkit';
import { Cart, CartDraft, MyCartUpdate } from '@commercetools/platform-sdk';
import { getAnonymousFlowApiRoot, getTokenFlowApiRoot } from '../../sdk/auth';
import apiRoots from '../../sdk/apiRoots';
import getErrorMessageForUser from '../../utils/getErrorMessageForUser';
import { authSlice, AuthStatus } from '../AuthSlice';
import toaster from '../../services/toaster';

const PROJECT_CURRENCY = 'USD';

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

export interface MyCartUpdateAdvanced extends MyCartUpdate {
  cartId: string;
  authStatus: AuthStatus;
}

const addNewLineItem = createAsyncThunk<Cart, MyCartUpdateAdvanced, { rejectValue: string }>(
  'cart/addLineItemInCart',
  async (updateActionAdvanced, { rejectWithValue, dispatch }) => {
    try {
      if (
        !apiRoots[updateActionAdvanced.authStatus] ||
        updateActionAdvanced.authStatus === AuthStatus.Initial ||
        updateActionAdvanced.authStatus === AuthStatus.CredentialsFlow
      ) {
        toaster.showError(
          `Troubles with apiRoots[updateAction.authStatus] ${apiRoots[updateActionAdvanced.authStatus]}`
        );
        return rejectWithValue(
          `Troubles with apiRoots[updateAction.authStatus] ${apiRoots[updateActionAdvanced.authStatus]}`
        );
      }
      const cartRes = await apiRoots[updateActionAdvanced.authStatus]!.me()
        .carts()
        .withId({ ID: updateActionAdvanced.cartId })
        .post({ body: updateActionAdvanced })
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

export { PROJECT_CURRENCY, createCustomerCart, getCustomerCart, addNewLineItem, createAnonymousCart, getAnonymousCart };
