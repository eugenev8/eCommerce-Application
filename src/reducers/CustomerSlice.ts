/* eslint-disable no-param-reassign */
import { Customer } from '@commercetools/platform-sdk';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { loginWithPassword, signupCustomer } from './ActionCreators';

interface CustomerState {
  isLoading: boolean;
  error: string;
  customer?: Customer;
}

const initialState: CustomerState = {
  isLoading: false,
  error: '',
};

const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    initCustomerData(state, action: PayloadAction<Customer>) {
      state.error = '';
      state.isLoading = false;
      state.customer = action.payload;
    },
    clearCustomerData() {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginWithPassword.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = '';
      state.customer = action.payload;
    });
    builder.addCase(signupCustomer.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = '';
      state.customer = action.payload;
    });
  },
});

export { customerSlice };

export default customerSlice.reducer;
