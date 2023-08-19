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
  billingAddress: {
    street: string;
    city: string;
    postal: string;
    country: string;
  };
  shippingAddress: {
    street: string;
    city: string;
    postal: string;
    country: string;
  };
}

function createTempValues(): RegisterFormValues {
  return {
    email: `fgd${Math.random().toFixed(5)}@get.com}`, // 'aaabbb@gmail.com',
    password: 'Aa123456!',
    firstName: 'dfsa',
    lastName: 'dfsh',
    dateOfBirth: '2001-02-02',
    billingAddress: {
      street: 'gdfs',
      city: 'dsfg',
      postal: '245665',
      country: 'US',
    },
    shippingAddress: {
      street: 'sgghfsd',
      city: 'dsfhdfg',
      postal: '235443',
      country: 'US',
    },
  };
}

const initialValues: RegisterFormValues = {
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  billingAddress: {
    street: '',
    city: '',
    postal: '',
    country: 'US',
  },
  shippingAddress: {
    street: '',
    city: '',
    postal: '',
    country: 'US',
  },
};

const validationSchema = Yup.object({
  email: EmailValidation,
  password: PasswordValidation,
  firstName: FirstNameValidation,
  lastName: LastNameValidation,
  dateOfBirth: AgeValidation,
  billingAdress: AddressValidaiton,
  shippingAdress: AddressValidaiton,
});
const validationSchemaSingleAdress = Yup.object({
  email: EmailValidation,
  password: PasswordValidation,
  firstName: FirstNameValidation,
  lastName: LastNameValidation,
  dateOfBirth: AgeValidation,
  billingAdress: AddressValidaiton,
});

export default function RegisterForm() {
  const dispatch = useAppDispatch();
  const [isBillingEqualShipping, setBillingEqualShipping] = useState(false);

  const handleSubmit = async (values: RegisterFormValues) => {
    alert(JSON.stringify(values, null, 2));
  };

  async function handleSignUpTemp(values: RegisterFormValues) {
    const shippingAddress: BaseAddress = {
      country: values.shippingAddress.country,
      city: values.shippingAddress.city,
      postalCode: values.shippingAddress.postal,
      streetName: values.shippingAddress.street,
    };
    const billingAddress: BaseAddress = {
      country: values.billingAddress.country,
      city: values.billingAddress.city,
      postalCode: values.billingAddress.postal,
      streetName: values.billingAddress.street,
    };
    const customerDraft: CustomerDraft = {
      email: values.email,
      password: values.password,
      firstName: values.firstName,
      lastName: values.lastName,
      dateOfBirth: values.dateOfBirth,
      addresses: [shippingAddress, billingAddress],
      defaultShippingAddress: 0,
      shippingAddresses: [0],
      defaultBillingAddress: 1,
      billingAddresses: [1],
    };
    dispatch(signupCustomer(customerDraft));
  }

  return (
    <div className="registerForm">
      <h2 className="registerForm__header">Sign up</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={isBillingEqualShipping ? validationSchemaSingleAdress : validationSchema}
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
              <AddressInputContainer name="billingAdress" heading="Billing adress" parentClassName="registerForm" />

              <label className="registerForm__checkboxLabel" htmlFor="sameAdress">
                Use same adress for shipping
                <input
                  id="sameAdress"
                  type="checkbox"
                  onClick={() => setBillingEqualShipping(!isBillingEqualShipping)}
                />
              </label>
            </div>
            <div className="registerForm__subBlock">
              {isBillingEqualShipping ? (
                <>
                  <div className="registerForm__adressHeading">
                    <h3>Shipping adress</h3>
                  </div>
                  <p>Billing adress will be used for shipping</p>
                </>
              ) : (
                <AddressInputContainer
                  name="shippingAddress"
                  heading="Shipping address"
                  parentClassName="registerForm"
                />
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
      <button type="button" onClick={() => handleSignUpTemp(createTempValues())}>
        Temp
      </button>
    </div>
  );
}
