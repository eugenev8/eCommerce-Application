/* eslint-disable no-param-reassign */
import { Cart } from '@commercetools/platform-sdk';
import { createSlice } from '@reduxjs/toolkit';
import { createCustomerCart, getCustomerCart } from './ActionCreators';

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

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart() {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createCustomerCart.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = '';
      state.cart = action.payload;
    });
    builder.addCase(getCustomerCart.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = '';
      state.cart = action.payload;
    });
  },
});

export { cartSlice };

export default cartSlice.reducer;
