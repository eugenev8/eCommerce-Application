import './RegisterForm.css';

import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import PasswordInput from '../inputs/PasswordInput';
import CommonInput from '../inputs/CommonInput';
import AdressInputContainer from '../inputs/AdressInput';
import {
  AddressValidaiton,
  AgeValidation,
  EmailValidation,
  FirstNameValidation,
  LastNameValidation,
  PasswordValidation,
} from '../CommonValidation';
import Button from '../../../ui/buttons/Buttons';

interface RegisterFormValues {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  billingAdress: {
    street: string;
    city: string;
    postal: string;
    country: string;
  };
  shippingAdress: {
    street: string;
    city: string;
    postal: string;
    country: string;
  };
}

const initialValues: RegisterFormValues = {
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  billingAdress: {
    street: '',
    city: '',
    postal: '',
    country: '',
  },
  shippingAdress: {
    street: '',
    city: '',
    postal: '',
    country: '',
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
  const [isBillingEqualShipping, setBillingEqualShipping] = useState(false);

  const handleSubmit = (values: RegisterFormValues) => {
    // Handle login logic here
    alert(JSON.stringify(values, null, 2));
  };

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
              <AdressInputContainer name="billingAdress" heading="Billing adress" parentClassName="registerForm" />

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
                <AdressInputContainer name="shippingAdress" heading="Shipping adress" parentClassName="registerForm" />
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
