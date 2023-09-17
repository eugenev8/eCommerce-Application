import { Address, CustomerDraft, CustomerSignin, MyCustomerUpdate } from '@commercetools/platform-sdk';
import { useAppDispatch, useAppSelector } from './redux';
import {
  changeCustomerPassword,
  loginCustomer,
  MyCustomerChangePasswordWithEmail,
  signupCustomer,
  updateCustomerData,
} from '../reducers/ActionCreators/Customer';

import useManageCart from './useManageCart';
import { AddressType } from '../pages/user/adresses/types';

export interface CustomerPersonalData {
  email: string;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
}

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export default function useManageCustomer() {
  const { customer } = useAppSelector((state) => state.customerReducer);
  const dispatch = useAppDispatch();
  const { getAnonCartResourceIdentifier } = useManageCart();

  function createCustomerPersonalDataUpdate(values: CustomerPersonalData) {
    if (!customer) throw new Error('No customer!');

    const updates: MyCustomerUpdate = { version: customer.version, actions: [] };
    if (customer.firstName !== values.firstName) {
      updates.actions.push({
        firstName: values.firstName,
        action: 'setFirstName',
      });
    }
    if (customer.lastName !== values.lastName) {
      updates.actions.push({
        lastName: values.lastName,
        action: 'setLastName',
      });
    }
    if (customer.email !== values.email) {
      updates.actions.push({
        email: values.email,
        action: 'changeEmail',
      });
    }
    if (customer.dateOfBirth !== values.dateOfBirth) {
      updates.actions.push({
        dateOfBirth: values.dateOfBirth,
        action: 'setDateOfBirth',
      });
    }

    return updates;
  }

  function updatePersonalData(customerPersonalData: CustomerPersonalData) {
    const updates = createCustomerPersonalDataUpdate(customerPersonalData);
    if (updates.actions.length === 0) return Promise.reject(new Error('Nothing to change!'));
    return dispatch(updateCustomerData(updates));
  }

  function changePassword(changePasswordData: ChangePasswordData) {
    if (!customer) throw new Error('No customer!');
    const myCustomerChangePasswordWithEmail: MyCustomerChangePasswordWithEmail = {
      ...changePasswordData,
      email: customer.email,
      version: customer.version,
    };
    return dispatch(changeCustomerPassword(myCustomerChangePasswordWithEmail));
  }

  function deleteAddress(address: Address, addressType: AddressType) {
    if (!customer) throw new Error('No customer!');
    if (addressType === AddressType.Shipping) {
      if (customer.shippingAddressIds && customer.shippingAddressIds?.length < 2) {
        return Promise.reject(new Error('This is the last shipping address. Do not delete'));
      }
    } else if (customer.billingAddressIds && customer.billingAddressIds.length < 2) {
      return Promise.reject(new Error('This is the last billing address. Do not delete'));
    }

    const deleteAddressUpdate: MyCustomerUpdate = {
      version: customer.version,
      actions: [{ action: 'removeAddress', addressId: address.id }],
    };

    return dispatch(updateCustomerData(deleteAddressUpdate));
  }

  function login(customerSignin: CustomerSignin) {
    const anonymousCart = getAnonCartResourceIdentifier();
    return dispatch(loginCustomer({ ...customerSignin, anonymousCart }));
  }

  function signup(customerDraft: CustomerDraft) {
    const anonymousCart = getAnonCartResourceIdentifier();
    return dispatch(signupCustomer({ ...customerDraft, anonymousCart }));
  }

  return { customer, login, signup, updatePersonalData, changePassword, deleteAddress };
}
