import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { BaseAddress, CartResourceIdentifier, CustomerDraft } from '@commercetools/platform-sdk';

import styles from './RegisterForm.module.scss'; // Import the module SCSS styles
import PasswordInput from '../inputs/PasswordInput';
import CommonInput from '../inputs/CommonInput';
import AddressInputContainer from '../inputs/AddressInput';
import {
  AddressValidaiton,
  AgeValidation,
  EmailValidation,
  FirstNameValidation,
  LastNameValidation,
  PasswordValidation,
} from '../CommonValidation';
import Button from '../../buttons/Buttons';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { signupCustomer } from '../../../reducers/ActionCreators/CustomerActions';
import CheckboxInput from '../inputs/CheckboxInput';
import { AuthStatus } from '../../../reducers/AuthSlice';
import toaster from '../../../services/toaster';

interface RegisterFormValues {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  shippingAddress: BaseAddress;
  billingAddress: BaseAddress;
}

interface NewCustomerAddresses {
  addresses: BaseAddress[];
  shippingAddresses: number[];
  billingAddresses: number[];
  defaultShippingAddress?: number;
  defaultBillingAddress?: number;
}

const initialValues: RegisterFormValues = {
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  billingAddress: {
    additionalAddressInfo: 'Initial address',
    streetName: '',
    city: '',
    postalCode: '',
    country: 'US',
  },
  shippingAddress: {
    additionalAddressInfo: 'Initial address',
    streetName: '',
    city: '',
    postalCode: '',
    country: 'US',
  },
};

const validationSchema = Yup.object({
  email: EmailValidation,
  password: PasswordValidation,
  firstName: FirstNameValidation,
  lastName: LastNameValidation,
  dateOfBirth: AgeValidation,
  billingAddress: AddressValidaiton,
  shippingAddress: AddressValidaiton,
});
const validationSchemaSingleAddress = Yup.object({
  email: EmailValidation,
  password: PasswordValidation,
  firstName: FirstNameValidation,
  lastName: LastNameValidation,
  dateOfBirth: AgeValidation,
  shippingAddress: AddressValidaiton,
});

export default function RegisterForm() {
  const dispatch = useAppDispatch();
  const [isBillingEqualShipping, setBillingEqualShipping] = useState(false);
  const [isDefaultShippingAddress, setIsDefaultShippingAddress] = useState(false);
  const [isDefaultBillingAddress, setIsDefaultBillingAddress] = useState(false);
  const [isSubmiting, setIsSubmiting] = useState(false);
  const { authStatus } = useAppSelector((state) => state.authReducer);
  const { cart } = useAppSelector((state) => state.cartReducer);

  const handleChangeDefaultShippingAddress = () => {
    if (isBillingEqualShipping) {
      setIsDefaultBillingAddress(!isDefaultShippingAddress);
    }
    setIsDefaultShippingAddress(!isDefaultShippingAddress);
  };

  const handleSetBillingEqualShipping = () => {
    if (!isBillingEqualShipping) {
      setIsDefaultBillingAddress(isDefaultShippingAddress);
    }
    setBillingEqualShipping(!isBillingEqualShipping);
  };

  function createNewCustomerAddresses(shippingAddress: BaseAddress, billingAddress: BaseAddress) {
    const newCustomerAddresses: NewCustomerAddresses = {
      addresses: isBillingEqualShipping ? [shippingAddress, shippingAddress] : [shippingAddress, billingAddress],
      shippingAddresses: [0],
      billingAddresses: [1],
    };

    if (isDefaultShippingAddress) {
      newCustomerAddresses.defaultShippingAddress = 0;
    }
    if (isDefaultBillingAddress) {
      newCustomerAddresses.defaultBillingAddress = 1;
    }
    return newCustomerAddresses;
  }

  function createCustomerDraft(values: RegisterFormValues) {
    const newCustomerAddresses = createNewCustomerAddresses(values.shippingAddress, values.billingAddress);
    let anonymousCart: CartResourceIdentifier | undefined;
    if (authStatus === AuthStatus.AnonymousFlow) {
      if (!cart) {
        toaster.showError('Anonymous cart trouble!');
      } else {
        anonymousCart = { id: cart.id, key: cart.key, typeId: 'cart' };
      }
    }

    const customerDraft: CustomerDraft = {
      email: values.email,
      password: values.password,
      firstName: values.firstName,
      lastName: values.lastName,
      dateOfBirth: values.dateOfBirth,
      ...newCustomerAddresses,
      anonymousCart,
    };

    return customerDraft;
  }

  const handleSubmit = (values: RegisterFormValues) => {
    setIsSubmiting(true);
    const customerDraft = createCustomerDraft(values);
    dispatch(signupCustomer(customerDraft))
      .then((data) => {
        if (data.type.includes('fulfilled')) {
          localStorage.removeItem(import.meta.env.VITE_LOCALSTORAGE_KEY_ANONYMOUS_TOKENS);
          localStorage.removeItem(import.meta.env.VITE_LOCALSTORAGE_KEY_ANONYMOUS_ID);
        }
      })
      .finally(() => setIsSubmiting(false));
  };

  return (
    <div className={styles.registerForm}>
      <h2 className={`${styles.registerForm}__header`}>Sign up</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={isBillingEqualShipping ? validationSchemaSingleAddress : validationSchema}
        validateOnChange
        validateOnMount
        onSubmit={handleSubmit}
      >
        <Form className={`${styles.registerForm__formContainer}`}>
          <div className={`${styles.registerForm__block}`}>
            <div className={`${styles.registerForm__subBlock}`}>
              <CommonInput type="text" labelText="Email" placeholder="Type your email" id="email" name="email" />

              <PasswordInput labelText="Password" placeholder="Type your password" id="password" name="password" />
            </div>
            <div className={`${styles.registerForm__subBlock}`}>
              <CommonInput
                id="firstName"
                labelText="First name"
                name="firstName"
                placeholder="Type your first name"
                type="text"
              />

              <CommonInput
                id="lastName"
                labelText="Last name"
                name="lastName"
                placeholder="Type your last name"
                type="text"
              />

              <CommonInput
                type="date"
                id="dateOfBirth"
                labelText="Date of birth"
                name="dateOfBirth"
                placeholder="Type your date of birth"
              />
            </div>
          </div>

          <div className={`${styles.registerForm__block}`}>
            <div className={`${styles.registerForm__subBlock}`}>
              <AddressInputContainer name="shippingAddress" heading="Shipping address" />

              <CheckboxInput
                checked={isDefaultShippingAddress}
                onChange={handleChangeDefaultShippingAddress}
                labelText="Set as default shipping address"
                id="defaultShippingAddress"
              />

              <CheckboxInput
                checked={isBillingEqualShipping}
                onChange={handleSetBillingEqualShipping}
                labelText="Use same address for billing"
                id="sameAddress"
              />
            </div>
            <div className={`${styles.registerForm__subBlock}`}>
              {isBillingEqualShipping ? (
                <>
                  <div className="registerForm__addressHeading">
                    <h3>Billing address</h3>
                  </div>
                  <p>Shipping address will be used for billing</p>
                </>
              ) : (
                <>
                  <AddressInputContainer name="billingAddress" heading="Billing address" />
                  <CheckboxInput
                    checked={isDefaultBillingAddress}
                    onChange={() => setIsDefaultBillingAddress(!isDefaultBillingAddress)}
                    labelText="Set as default billing address"
                    id="defaultBillingAddress"
                  />
                </>
              )}
            </div>
          </div>

          <Button
            disabled={isSubmiting}
            innerText={isSubmiting ? 'Submiting...' : 'Join us'}
            styling="primary"
            type="submit"
            variant="default"
            addedClass=""
          />
        </Form>
      </Formik>
    </div>
  );
}
