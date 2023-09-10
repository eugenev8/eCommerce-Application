/* eslint-disable no-param-reassign */
import { Cart } from '@commercetools/platform-sdk';
import { createSlice, isFulfilled, isPending } from '@reduxjs/toolkit';
import { addNewLineItem, createCustomerCart, getCustomerCart } from './ActionCreators';

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

const isAPendingAction = isPending(createCustomerCart, getCustomerCart, addNewLineItem);
const isAFulfilledAction = isFulfilled(createCustomerCart, getCustomerCart, addNewLineItem);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
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
