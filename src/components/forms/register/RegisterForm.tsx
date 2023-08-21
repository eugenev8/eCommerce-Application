import { BaseAddress, CustomerDraft } from '@commercetools/platform-sdk';
import './RegisterForm.css';

import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

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
import Button from '../../../ui/buttons/Buttons';
import { useAppDispatch } from '../../../hooks/redux';
import { signupCustomer } from '../../../reducers/ActionCreators';

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
  email: `fgd${Math.random().toFixed(5).replace('.', '')}@get.com`, // 'aaabbb@gmail.com',
  password: 'Aa123456!',
  firstName: 'firstName',
  lastName: 'lastName',
  dateOfBirth: '2001-02-02',
  billingAddress: {
    streetName: 'BillingStreet',
    city: 'city',
    postalCode: '12345',
    country: 'US',
  },
  shippingAddress: {
    streetName: 'ShippingStreet',
    city: 'city',
    postalCode: '12345',
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

  function handleChangeDefaultShippingAddress() {
    if (isBillingEqualShipping) {
      setIsDefaultBillingAddress(!isDefaultShippingAddress);
    }
    setIsDefaultShippingAddress(!isDefaultShippingAddress);
  }

  function handleSetBillingEqualShipping() {
    if (!isBillingEqualShipping) {
      setIsDefaultBillingAddress(isDefaultShippingAddress);
    }
    setBillingEqualShipping(!isBillingEqualShipping);
  }

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
    <div className="registerForm">
      <h2 className="registerForm__header">Sign up</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={isBillingEqualShipping ? validationSchemaSingleAddress : validationSchema}
        validateOnChange
        validateOnMount
        onSubmit={handleSubmit}
      >
        <Form className="registerForm__formContainer">
          <div className="registerForm__block registerForm__userData">
            <div className="registerForm__subBlock">
              <CommonInput
                type="email"
                labelText="Email"
                placeholder="Type your email"
                id="email"
                name="email"
                parentClassName="registerForm"
              />

              <PasswordInput
                labelText="Password"
                placeholder="Type your password"
                id="password"
                name="password"
                parentClassName="registerForm"
              />
            </div>
            <div className="registerForm__subBlock">
              <CommonInput
                id="firstName"
                labelText="First name"
                name="firstName"
                placeholder="Type your first name"
                type="text"
                parentClassName="registerForm"
              />

              <CommonInput
                id="lastName"
                labelText="Last name"
                name="lastName"
                placeholder="Type your last name"
                type="text"
                parentClassName="registerForm"
              />

              <CommonInput
                type="date"
                id="dateOfBirth"
                labelText="Date of birth"
                name="dateOfBirth"
                placeholder="Type your date of birth"
                parentClassName="registerForm"
              />
            </div>
          </div>

          <div className="registerForm__block">
            <div className="registerForm__subBlock">
              <AddressInputContainer name="shippingAddress" heading="Shipping address" parentClassName="registerForm" />

              <label className="registerForm__checkboxLabel" htmlFor="defaultShippingAddress">
                Set as default shipping address
                <input
                  id="defaultShippingAddress"
                  type="checkbox"
                  checked={isDefaultShippingAddress}
                  onChange={handleChangeDefaultShippingAddress}
                />
              </label>

              <label className="registerForm__checkboxLabel" htmlFor="sameAddress">
                Use same address for billing
                <input
                  id="sameAddress"
                  type="checkbox"
                  checked={isBillingEqualShipping}
                  onChange={handleSetBillingEqualShipping}
                />
              </label>
            </div>
            <div className="registerForm__subBlock">
              {isBillingEqualShipping ? (
                <>
                  <div className="registerForm__addressHeading">
                    <h3>Billing address</h3>
                  </div>
                  <p>Shipping address will be used for billing</p>
                </>
              ) : (
                <>
                  <AddressInputContainer
                    name="billingAddress"
                    heading="Billing address"
                    parentClassName="registerForm"
                  />
                  <label className="registerForm__checkboxLabel" htmlFor="defaultShippingAddress">
                    Set as default billing address
                    <input
                      id="defaultBillingAddress"
                      type="checkbox"
                      checked={isDefaultBillingAddress}
                      onChange={() => setIsDefaultBillingAddress(!isDefaultBillingAddress)}
                    />
                  </label>
                </>
              )}
            </div>
          </div>

          <Button
            innerText="Join us"
            styling="primary"
            type="submit"
            variant="default"
            addedClass="registerForm__submitButton"
          />
        </Form>
      </Formik>
    </div>
  );
}
