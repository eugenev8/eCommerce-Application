/* eslint-disable no-param-reassign */
import { Customer } from '@commercetools/platform-sdk';
import { createSlice, isPending, isFulfilled, PayloadAction, isRejected } from '@reduxjs/toolkit';
import { changeCustomerPassword, loginCustomer, signupCustomer, updateCustomerData } from './ActionCreators/Customer';

interface CustomerState {
  isLoading: boolean;
  error: string;
  customer: Customer | null;
}

const initialState: CustomerState = {
  isLoading: false,
  error: '',
  customer: null,
};

const isAPendingAction = isPending(updateCustomerData, loginCustomer, signupCustomer, changeCustomerPassword);
const isAFulfilledAction = isFulfilled(updateCustomerData, loginCustomer, signupCustomer, changeCustomerPassword);
const isARejectedAction = isRejected(updateCustomerData, loginCustomer, signupCustomer, changeCustomerPassword);

const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    setCustomer(state, action: PayloadAction<Customer>) {
      state.isLoading = false;
      state.error = '';
      state.customer = action.payload;
    },
    clearCustomerData() {
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
      state.customer = action.payload;
    });
    builder.addMatcher(isARejectedAction, (state, action) => {
      state.isLoading = false;
      state.error = action.payload || 'Undefined?';
    });
  },
});

export { customerSlice };

export default customerSlice.reducer;
