/* eslint-disable no-param-reassign */
import { BaseAddress, Customer } from '@commercetools/platform-sdk';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface CustomerState {
  isLoading: boolean;
  error: string;
  id?: string;
  dateOfBirth?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  addresses?: BaseAddress[];
  shippingAddressIds?: string[];
  billingAddressIds?: string[];
  defaultBillingAddressId?: string;
  defaultShippingAddressId?: string;
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
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.dateOfBirth = action.payload.dateOfBirth;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.addresses = action.payload.addresses;
      state.shippingAddressIds = action.payload.billingAddressIds;
      state.billingAddressIds = action.payload.billingAddressIds;
      state.defaultBillingAddressId = action.payload.defaultBillingAddressId;
      state.defaultShippingAddressId = action.payload.defaultShippingAddressId;
    },
    clearCustomerData() {
      return initialState;
    },
  },
});

export { customerSlice };

export default customerSlice.reducer;
