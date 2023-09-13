import { createAsyncThunk } from '@reduxjs/toolkit';
import { Cart, CartDraft, MyCartUpdate } from '@commercetools/platform-sdk';
import apiRoots from '../../sdk/apiRoots';
import getErrorMessageForUser from '../../utils/getErrorMessageForUser';
import { AuthStatus } from '../AuthSlice';
import toaster from '../../services/toaster';

const PROJECT_CURRENCY = 'USD';

export interface MyCartUpdateAdvanced extends MyCartUpdate {
  cartId: string;
  authStatus: AuthStatus;
}

function isValidApiRootsState(authStatus: AuthStatus) {
  return apiRoots[authStatus] && (authStatus === AuthStatus.AnonymousFlow || authStatus === AuthStatus.CustomerFlow);
}

const createCart = createAsyncThunk<Cart, AuthStatus, { rejectValue: string }>(
  'cart/createCart',
  async (authStatus, { rejectWithValue }) => {
    try {
      if (!isValidApiRootsState(authStatus)) {
        toaster.showError(`Troubles with apiRoots[updateAction.authStatus] ${apiRoots[authStatus]}`);
        return rejectWithValue(`Troubles with apiRoots[updateAction.authStatus] ${apiRoots[authStatus]}`);
      }
      const cartDraft: CartDraft = { currency: PROJECT_CURRENCY };
      const cartRes = await apiRoots[authStatus]!.me().carts().post({ body: cartDraft }).execute();
      return cartRes.body;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? getErrorMessageForUser(error.message) : getErrorMessageForUser('Unknown error');
      return rejectWithValue(errorMessage);
    }
  }
);

const getCart = createAsyncThunk<Cart, AuthStatus, { rejectValue: string }>(
  'cart/getCart',
  async (authStatus, { rejectWithValue }) => {
    try {
      if (!isValidApiRootsState(authStatus)) {
        toaster.showError(`Troubles with apiRoots[updateAction.authStatus] ${apiRoots[authStatus]}`);
        return rejectWithValue(`Troubles with apiRoots[updateAction.authStatus] ${apiRoots[authStatus]}`);
      }
      const cartRes = await apiRoots[authStatus]!.me().activeCart().get().execute();
      return cartRes.body;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? getErrorMessageForUser(error.message) : getErrorMessageForUser('Unknown error');
      return rejectWithValue(errorMessage);
    }
  }
);

const updateCart = createAsyncThunk<Cart, MyCartUpdateAdvanced, { rejectValue: string }>(
  'cart/addLineItem',
  async (updateActionAdvanced, { rejectWithValue }) => {
    try {
      if (!isValidApiRootsState(updateActionAdvanced.authStatus)) {
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
      return rejectWithValue(errorMessage);
    }
  }
);

export { PROJECT_CURRENCY, createCart, getCart, updateCart };
