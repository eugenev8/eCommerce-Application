import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  CartResourceIdentifier,
  Customer,
  CustomerDraft,
  CustomerSignin,
  MyCustomerChangePassword,
  MyCustomerUpdate,
} from '@commercetools/platform-sdk';
import { getCustomerData, getTokenFlowApiRoot } from '../../sdk/auth';
import apiRoots from '../../sdk/apiRoots';
import toaster from '../../services/toaster';
import getErrorMessageForUser from '../../utils/getErrorMessageForUser';
import tokenStores from '../../sdk/tokenStores';
import { authSlice, AuthStatus } from '../AuthSlice';
// eslint-disable-next-line import/no-cycle
import { createCustomerCart, getCustomerCart, setCart } from './CartActions';
import { RootState } from '../../store';

const setCustomer = createAsyncThunk<Customer, Customer>('customer/setCustomer', async (customer) => customer);

function createAnonymousCart(getState: () => RootState): CartResourceIdentifier | undefined {
  const { authStatus } = getState().authReducer;
  const { cart } = getState().cartReducer;

  let anonymousCart: CartResourceIdentifier | undefined;
  if (authStatus === AuthStatus.AnonymousFlow) {
    if (!cart) {
      toaster.showError('Anonymous cart trouble!');
    } else {
      anonymousCart = { id: cart.id, key: cart.key, typeId: 'cart' };
    }
  }
  return anonymousCart;
}

function eraseAnonymousDataInLocalStorage() {
  localStorage.removeItem(import.meta.env.VITE_LOCALSTORAGE_KEY_ANONYMOUS_TOKENS);
  localStorage.removeItem(import.meta.env.VITE_LOCALSTORAGE_KEY_ANONYMOUS_ID);
}

const loginCustomer = createAsyncThunk<Customer, CustomerSignin, { rejectValue: string; state: RootState }>(
  'customer/loginWithPassword',
  async (customerSignin, { rejectWithValue, dispatch, getState }) => {
    try {
      const anonymousCart = createAnonymousCart(getState);

      const customerSigninWithCart: CustomerSignin = { ...customerSignin, anonymousCart };

      dispatch(authSlice.actions.setIsPending());
      const customerRes = await getCustomerData(customerSigninWithCart);

      toaster.showSuccess('Login successful!');

      dispatch(authSlice.actions.setAuthStatus(AuthStatus.CustomerFlow));

      apiRoots.CustomerFlow = getTokenFlowApiRoot(tokenStores.customer.token);
      eraseAnonymousDataInLocalStorage();
      if (customerRes.body.cart) {
        dispatch(setCart(customerRes.body.cart));
      } else {
        dispatch(getCustomerCart());
      }
      return customerRes.body.customer;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? getErrorMessageForUser(error.message) : getErrorMessageForUser('Unknown error');
      dispatch(authSlice.actions.authError(errorMessage));
      return rejectWithValue(errorMessage);
    }
  }
);

const signupCustomer = createAsyncThunk<Customer, CustomerDraft, { rejectValue: string; state: RootState }>(
  'customer/signup',
  async (customerDraft, { rejectWithValue, dispatch, getState }) => {
    try {
      const anonymousCart = createAnonymousCart(getState);

      const customerDraftWithCart: CustomerDraft = { ...customerDraft, anonymousCart };

      dispatch(authSlice.actions.setIsPending());

      await apiRoots.CredentialsFlow.customers().post({ body: customerDraftWithCart }).execute();

      const customerRes = await getCustomerData({ email: customerDraft.email, password: customerDraft.password! });

      dispatch(authSlice.actions.setAuthStatus(AuthStatus.CustomerFlow));
      apiRoots.CustomerFlow = getTokenFlowApiRoot(tokenStores.customer.token);
      toaster.showSuccess("Registration successful! You're now login in!");
      eraseAnonymousDataInLocalStorage();
      if (customerRes.body.cart) {
        dispatch(setCart(customerRes.body.cart));
      } else {
        dispatch(createCustomerCart());
      }
      return customerRes.body.customer;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? getErrorMessageForUser(error.message) : getErrorMessageForUser('Unknown error');
      dispatch(authSlice.actions.authError(errorMessage));
      return rejectWithValue(errorMessage);
    }
  }
);

interface MyCustomerChangePasswordWithEmail extends MyCustomerChangePassword {
  email: string;
}

const changeCustomerPassword = createAsyncThunk<Customer, MyCustomerChangePasswordWithEmail, { rejectValue: string }>(
  'customer/changePassword',
  async (values, { rejectWithValue, dispatch }) => {
    try {
      if (!apiRoots.CustomerFlow) {
        return rejectWithValue('Error with token flow');
      }

      await apiRoots.CustomerFlow.me().password().post({ body: values }).execute();

      dispatch(authSlice.actions.setIsPending());

      const customerRes = await getCustomerData({
        email: values.email,
        password: values.newPassword,
      });

      apiRoots.CustomerFlow = getTokenFlowApiRoot(tokenStores.customer.token);
      toaster.showSuccess('Password changed successfully!');
      return customerRes.body.customer;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? getErrorMessageForUser(error.message) : getErrorMessageForUser('Unknown error');
      dispatch(authSlice.actions.authError(errorMessage));
      return rejectWithValue(errorMessage);
    }
  }
);

const updateCustomerData = createAsyncThunk<Customer, MyCustomerUpdate, { rejectValue: string }>(
  'customer/updateData',
  async (updates, { rejectWithValue, dispatch }) => {
    try {
      if (!apiRoots.CustomerFlow) {
        return rejectWithValue('Error with token flow');
      }

      const customerRes = await apiRoots.CustomerFlow.me().post({ body: updates }).execute();

      return customerRes.body;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? getErrorMessageForUser(error.message) : getErrorMessageForUser('Unknown error');
      dispatch(authSlice.actions.authError(errorMessage));
      return rejectWithValue(errorMessage);
    }
  }
);

export { setCustomer, loginCustomer, signupCustomer, changeCustomerPassword, updateCustomerData };
