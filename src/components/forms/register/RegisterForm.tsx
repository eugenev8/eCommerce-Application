import './RegisterForm.css';

import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import EmailInput from '../inputs/EmailInput';
import PasswordInput from '../inputs/PasswordInput';
import CommonInput from '../inputs/CommonInput';
import AgeInput from '../inputs/AgeInput';
import AdressInputContainer from '../inputs/AdressInput';

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
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .required('Password is required'),
  firstName: Yup.string()
    .min(1, 'First name must contain at least one character')
    .matches(/^[a-zA-Z]*$/, 'First name must not contain special characters or numbers')
    .required('First name is required'),
  lastName: Yup.string()
    .min(1, 'Last name must contain at least one character')
    .matches(/^[a-zA-Z]*$/, 'Last name must not contain special characters or numbers')
    .required('Last name is required'),
  dateOfBirth: Yup.date()
    .required('Date of birth is required')
    .min(new Date(new Date().getFullYear() - 130, 0, 1), 'You must be at most 130 years old')
    .max(
      new Date(new Date().getFullYear() - 13, new Date().getMonth(), new Date().getDate()),
      'You must be at least 13 years old'
    ),
  billingAdress: Yup.object({
    street: Yup.string().min(1, 'Street must contain at least one character').required('Street is required'),
    city: Yup.string()
      .min(1, 'City must contain at least one character')
      .matches(/^[a-zA-Z\s]*$/, 'City must not contain special characters or numbers')
      .required('City is required'),
    postal: Yup.string().required('Postal code is required'),
    country: Yup.string().required('Country is required'),
  }),
  shippingAdress: Yup.object({
    street: Yup.string().min(1, 'Street must contain at least one character').required('Street is required'),
    city: Yup.string()
      .min(1, 'City must contain at least one character')
      .matches(/^[a-zA-Z\s]*$/, 'City must not contain special characters or numbers')
      .required('City is required'),
    postal: Yup.string().required('Postal code is required'),
    country: Yup.string().required('Country is required'),
  }),
});
const validationSchemaSingleAdress = Yup.object({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .required('Password is required'),
  firstName: Yup.string()
    .min(1, 'First name must contain at least one character')
    .matches(/^[a-zA-Z]*$/, 'First name must not contain special characters or numbers')
    .required('First name is required'),
  lastName: Yup.string()
    .min(1, 'Last name must contain at least one character')
    .matches(/^[a-zA-Z]*$/, 'Last name must not contain special characters or numbers')
    .required('Last name is required'),
  dateOfBirth: Yup.date()
    .required('Date of birth is required')
    .min(new Date(new Date().getFullYear() - 130, 0, 1), 'You must be at most 130 years old')
    .max(
      new Date(new Date().getFullYear() - 13, new Date().getMonth(), new Date().getDate()),
      'You must be at least 13 years old'
    ),
  billingAdress: Yup.object({
    street: Yup.string().min(1, 'Street must contain at least one character').required('Street is required'),
    city: Yup.string()
      .min(1, 'City must contain at least one character')
      .matches(/^[a-zA-Z\s]*$/, 'City must not contain special characters or numbers')
      .required('City is required'),
    postal: Yup.string().required('Postal code is required'),
    country: Yup.string().required('Country is required'),
  }),
});

export default function RegisterForm() {
  const [isBillingEqualShipping, setBillingEqualShipping] = useState(false);

  const handleSubmit = (values: RegisterFormValues) => {
    // Handle login logic here
    alert(JSON.stringify(values, null, 2));
  };

  return (
    <div className="registerForm">
      <h2 className="registerForm__header">Register</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={isBillingEqualShipping ? validationSchemaSingleAdress : validationSchema}
        validateOnChange
        validateOnMount
        onSubmit={handleSubmit}
      >
        <Form className="registerForm__formContainer">
          <EmailInput
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

          <AgeInput
            id="dateOfBirth"
            labelText="Date of birth"
            name="dateOfBirth"
            placeholder="Type your date of birth"
            parentClassName="registerForm"
          />

          <AdressInputContainer name="billingAdress" heading="Billing adress" parentClassName="registerForm" />

          <label htmlFor="sameAdress">
            Use same adress for shipping
            <input id="sameAdress" type="checkbox" onClick={() => setBillingEqualShipping(!isBillingEqualShipping)} />
          </label>

          {isBillingEqualShipping ? (
            'Billing adress will be used for shipping'
          ) : (
            <AdressInputContainer name="shippingAdress" heading="Shipping adress" parentClassName="registerForm" />
          )}

          <button type="submit" className="registerForm__submitButton">
            Register
          </button>
        </Form>
      </Formik>
    </div>
  );
}
