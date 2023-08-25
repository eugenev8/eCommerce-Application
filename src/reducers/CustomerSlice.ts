/* eslint-disable no-param-reassign */
import { Customer } from '@commercetools/platform-sdk';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

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
});

export { customerSlice };

export default customerSlice.reducer;
