import { Address, Customer, CustomerDraft, CustomerSignin, MyCustomerUpdate } from '@commercetools/platform-sdk';
import { useAppDispatch, useAppSelector } from './redux';
import {
  changeCustomerPassword,
  loginCustomer,
  signupCustomer,
  updateCustomerData,
} from '../reducers/ActionCreators/Customer';

import useManageCart from './useManageCart';

import {
  AddressType,
  ChangePasswordData,
  CustomerPersonalData,
  MyCustomerChangePasswordWithEmail,
} from '../models/customerTypes';

export default function useManageCustomer() {
  const { customer } = useAppSelector((state) => state.customerReducer);
  const dispatch = useAppDispatch();
  const { getAnonCartResourceIdentifier } = useManageCart();

  function signup(customerDraft: CustomerDraft) {
    const anonymousCart = getAnonCartResourceIdentifier();
    return dispatch(signupCustomer({ ...customerDraft, anonymousCart }));
  }

  function login(customerSignin: CustomerSignin) {
    const anonymousCart = getAnonCartResourceIdentifier();
    return dispatch(loginCustomer({ ...customerSignin, anonymousCart }));
  }

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

  function isCustomer(value: string | Customer | undefined): value is Customer {
    return !!(value && typeof value !== 'string');
  }

  async function createNewAddress(addressType: AddressType, newAddressData: Address) {
    if (!customer) throw new Error('No customer!');

    const newAddressUpdate: MyCustomerUpdate = {
      version: customer.version,
      actions: [{ action: 'addAddress', address: newAddressData }],
    };

    const payloadAction = await dispatch(updateCustomerData(newAddressUpdate));
    if (!isCustomer(payloadAction.payload)) {
      return Promise.reject();
    }
    const newVersionCustomer = payloadAction.payload;

    const addedAddress = newVersionCustomer.addresses.at(-1);
    const setAddressTypeUpdate: MyCustomerUpdate = {
      version: newVersionCustomer.version,
      actions: [],
    };
    if (addressType === AddressType.Billing) {
      setAddressTypeUpdate.actions.push({ action: 'addBillingAddressId', addressId: addedAddress?.id });
    } else {
      setAddressTypeUpdate.actions.push({ action: 'addShippingAddressId', addressId: addedAddress?.id });
    }
    return dispatch(updateCustomerData(setAddressTypeUpdate));
  }

  function updateAddressData(newAddressData: Address) {
    if (!customer) throw new Error('No customer!');
    const changeAddressUpdate: MyCustomerUpdate = {
      version: customer.version,
      actions: [{ action: 'changeAddress', address: newAddressData, addressId: newAddressData.id }],
    };
    return dispatch(updateCustomerData(changeAddressUpdate));
  }

  function setDefaultAddress(addressId: string, addressType: AddressType) {
    if (!customer) throw new Error('No customer!');
    const setDefaultAddressUpdate: MyCustomerUpdate = {
      version: customer.version,
      actions: [],
    };
    if (addressType === AddressType.Shipping) {
      setDefaultAddressUpdate.actions.push({ action: 'setDefaultShippingAddress', addressId });
    } else {
      setDefaultAddressUpdate.actions.push({ action: 'setDefaultBillingAddress', addressId });
    }
    return dispatch(updateCustomerData(setDefaultAddressUpdate));
  }

  function clearDefaultAddress(addressType: AddressType) {
    if (!customer) throw new Error('No customer!');

    const clearDefaultAddressUpdate: MyCustomerUpdate = {
      version: customer.version,
      actions: [],
    };

    if (addressType === AddressType.Shipping) {
      clearDefaultAddressUpdate.actions.push({ action: 'setDefaultShippingAddress' });
    } else {
      clearDefaultAddressUpdate.actions.push({ action: 'setDefaultBillingAddress' });
    }

    return dispatch(updateCustomerData(clearDefaultAddressUpdate));
  }

  function deleteAddress(addressId: string, addressType: AddressType) {
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
      actions: [{ action: 'removeAddress', addressId }],
    };

    return dispatch(updateCustomerData(deleteAddressUpdate));
  }

  return {
    customer,
    signup,
    login,
    updatePersonalData,
    changePassword,
    createNewAddress,
    updateAddressData,
    setDefaultAddress,
    clearDefaultAddress,
    deleteAddress,
  };
}
