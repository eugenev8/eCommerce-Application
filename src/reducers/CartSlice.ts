/* eslint-disable no-param-reassign */
import { Cart } from '@commercetools/platform-sdk';
import { createSlice, isFulfilled, isPending, PayloadAction, isRejected } from '@reduxjs/toolkit';
import { updateCart, createCart, getCart } from './ActionCreators/Cart';

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

const isAPendingAction = isPending(updateCart, getCart, createCart);
const isAFulfilledAction = isFulfilled(updateCart, getCart, createCart);
const isARejectedAction = isRejected(updateCart, getCart, createCart);

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
    builder.addMatcher(isARejectedAction, (state, action) => {
      state.isLoading = false;
      state.error = action.payload || 'Undefined?';
    });
  },
});

export const { reducer: cartReducer, actions: cartActions } = cartSlice;
