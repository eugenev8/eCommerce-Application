import { createAsyncThunk } from '@reduxjs/toolkit';
import { Cart, CartDraft, MyCartUpdate } from '@commercetools/platform-sdk';
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';
import getErrorMessageForUser from '../../utils/getErrorMessageForUser';

const PROJECT_CURRENCY = 'USD';

export interface MyCartUpdateAdvanced extends MyCartUpdate {
  cartId: string;
  apiRoot: ByProjectKeyRequestBuilder;
}

const createCart = createAsyncThunk<Cart, ByProjectKeyRequestBuilder, { rejectValue: string }>(
  'cart/createCart',
  async (apiRoot, { rejectWithValue }) => {
    try {
      const cartDraft: CartDraft = { currency: PROJECT_CURRENCY };
      const cartRes = await apiRoot.me().carts().post({ body: cartDraft }).execute();
      return cartRes.body;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? getErrorMessageForUser(error.message) : getErrorMessageForUser('Unknown error');
      return rejectWithValue(errorMessage);
    }
  }
);

const getCart = createAsyncThunk<Cart, ByProjectKeyRequestBuilder, { rejectValue: string }>(
  'cart/getCart',
  async (apiRoot, { rejectWithValue }) => {
    try {
      const cartRes = await apiRoot.me().activeCart().get().execute();
      return cartRes.body;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? getErrorMessageForUser(error.message) : getErrorMessageForUser('Unknown error');
      return rejectWithValue(errorMessage);
    }
  }
);

const updateCart = createAsyncThunk<Cart, MyCartUpdateAdvanced, { rejectValue: string }>(
  'cart/updateCart',
  async (updateActionAdvanced, { rejectWithValue }) => {
    try {
      const cartRes = await updateActionAdvanced.apiRoot
        .me()
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
