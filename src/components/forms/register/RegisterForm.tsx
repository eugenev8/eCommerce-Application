import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { BaseAddress, CustomerDraft } from '@commercetools/platform-sdk';

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
import { useAppDispatch } from '../../../hooks/redux';
import { signupCustomer } from '../../../reducers/ActionCreators';
import CheckboxInput from '../inputs/CheckboxInput';

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
  email: ``, // 'aaabbb@gmail.com',
  password: '',
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  billingAddress: {
    streetName: '',
    city: '',
    postalCode: '',
    country: 'US',
  },
  shippingAddress: {
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
    if (isBillingEqualShipping) {
      const newCustomerAddresses: NewCustomerAddresses = {
        addresses: [shippingAddress],
        shippingAddresses: [0],
        billingAddresses: [0],
      };
      if (isDefaultShippingAddress) {
        newCustomerAddresses.defaultBillingAddress = 0;
        newCustomerAddresses.defaultShippingAddress = 0;
      }
      return newCustomerAddresses;
    }

    const newCustomerAddresses: NewCustomerAddresses = {
      addresses: [shippingAddress, billingAddress],
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

    const customerDraft: CustomerDraft = {
      email: values.email,
      password: values.password,
      firstName: values.firstName,
      lastName: values.lastName,
      dateOfBirth: values.dateOfBirth,
      ...newCustomerAddresses,
    };

    return customerDraft;
  }

  const handleSubmit = (values: RegisterFormValues) => {
    const customerDraft = createCustomerDraft(values);
    dispatch(signupCustomer(customerDraft));
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

          <Button innerText="Join us" styling="primary" type="submit" variant="default" addedClass="" />
        </Form>
      </Formik>
    </div>
  );
}
