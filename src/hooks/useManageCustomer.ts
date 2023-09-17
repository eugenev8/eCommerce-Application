import { CustomerDraft, CustomerSignin, MyCustomerUpdate } from '@commercetools/platform-sdk';
import { useAppDispatch, useAppSelector } from './redux';
import { loginCustomer, signupCustomer, updateCustomerData } from '../reducers/ActionCreators/Customer';

import useManageCart from './useManageCart';

export interface CustomerPersonalData {
  email: string;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
}

export default function useManageCustomer() {
  const { customer } = useAppSelector((state) => state.customerReducer);
  const dispatch = useAppDispatch();
  const { getAnonCartResourceIdentifier } = useManageCart();

  function createCustomerUpdate(values: CustomerPersonalData) {
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
    const updates = createCustomerUpdate(customerPersonalData);
    if (updates.actions.length === 0) return Promise.reject(new Error('Nothing to change!'));
    return dispatch(updateCustomerData(updates));
  }

  function login(customerSignin: CustomerSignin) {
    const anonymousCart = getAnonCartResourceIdentifier();
    return dispatch(loginCustomer({ ...customerSignin, anonymousCart }));
  }

  function signup(customerDraft: CustomerDraft) {
    const anonymousCart = getAnonCartResourceIdentifier();
    return dispatch(signupCustomer({ ...customerDraft, anonymousCart }));
  }

  return { customer, login, signup, updatePersonalData };
}
