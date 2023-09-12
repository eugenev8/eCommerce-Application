/* eslint-disable no-param-reassign */
import { Cart } from '@commercetools/platform-sdk';
import { createSlice, isFulfilled, isPending, PayloadAction } from '@reduxjs/toolkit';
import {
  addNewLineItem,
  createAnonymousCart,
  createCustomerCart,
  getAnonymousCart,
  getCustomerCart,
} from './ActionCreators/CartActions';

interface CartState {
  isLoading: boolean;
  error: string;
  cart: Cart | null;
}

const initialState: CartState = {
  isLoading: false,
  error: '',
  cart: null,
};

const isAPendingAction = isPending(
  createCustomerCart,
  getCustomerCart,
  addNewLineItem,
  createAnonymousCart,
  getAnonymousCart
);
const isAFulfilledAction = isFulfilled(
  createCustomerCart,
  getCustomerCart,
  addNewLineItem,
  createAnonymousCart,
  getAnonymousCart
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart(state, action: PayloadAction<Cart>) {
      state.isLoading = false;
      state.error = '';
      state.cart = action.payload;
    },
    clearCart() {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(isAPendingAction, (state) => {
      state.error = '';
      state.isLoading = true;
    });
    builder.addMatcher(isAFulfilledAction, (state, action) => {
      state.isLoading = false;
      state.error = '';
      state.cart = action.payload;
    });
  },
});

export { cartSlice };

export default cartSlice.reducer;
