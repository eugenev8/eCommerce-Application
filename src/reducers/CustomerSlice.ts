/* eslint-disable no-param-reassign */
import { Customer } from '@commercetools/platform-sdk';
import { createSlice, isPending, isFulfilled } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import {
  changeCustomerPassword,
  loginCustomer,
  setCustomer,
  signupCustomer,
  updateCustomerData,
} from './ActionCreators/CustomerActions';

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

const isAPendingAction = isPending(
  setCustomer,
  updateCustomerData,
  loginCustomer,
  signupCustomer,
  changeCustomerPassword
);
const isAFulfilledAction = isFulfilled(
  setCustomer,
  updateCustomerData,
  loginCustomer,
  signupCustomer,
  changeCustomerPassword
);

const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
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
  },
});

export { customerSlice };

export default customerSlice.reducer;
