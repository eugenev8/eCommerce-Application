import { CustomerDraft, CustomerSignin } from '@commercetools/platform-sdk';
import { useAppDispatch } from './redux';
import { loginCustomer, signupCustomer } from '../reducers/ActionCreators/Customer';

import useManageCart from './useManageCart';

export default function useManageCustomer() {
  const dispatch = useAppDispatch();
  const { getAnonCartResourceIdentifier } = useManageCart();

  function login(customerSignin: CustomerSignin) {
    const anonymousCart = getAnonCartResourceIdentifier();
    return dispatch(loginCustomer({ ...customerSignin, anonymousCart }));
  }

  function signup(customerDraft: CustomerDraft) {
    const anonymousCart = getAnonCartResourceIdentifier();
    return dispatch(signupCustomer({ ...customerDraft, anonymousCart }));
  }

  return { login, signup };
}
