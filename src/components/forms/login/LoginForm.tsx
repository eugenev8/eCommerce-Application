/* eslint-disable jsx-a11y/label-has-associated-control */
import './LoginForm.css';

import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

interface LoginFormValues {
  email: string;
  password: string;
}

const initialValues: LoginFormValues = {
  email: '',
  password: '',
};

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required')
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email address format'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[0-9]/, 'Password must contain at least one digit')
    .matches(/[!@#$%^&*]/, 'Password must contain at least one special character')
    .matches(/^\S*$/, 'Password must not contain whitespace')
    .required('Password is required'),
});

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (values: LoginFormValues) => {
    // Handle login logic here
    alert(values);
  };

  return (
    <div className="loginForm">
      <h2 className="loginForm__header">Login</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        validateOnChange
        validateOnMount
        onSubmit={handleSubmit}
      >
        <Form className="loginForm__formContainer">
          <div className="loginForm__inputContainer loginForm__email">
            <label className="loginForm__label" htmlFor="email">
              Email
            </label>
            <Field
              placeholder="Type your email"
              type="email"
              id="email"
              name="email"
              aria-describedby="email-error"
              className="loginForm__input"
            />
            <div className="loginForm__errorMessage">
              <ErrorMessage name="email" />
            </div>
          </div>
          <div className="loginForm__inputContainer loginForm__password">
            <label className="loginForm__label" htmlFor="password">
              Password
            </label>
            <div className="loginForm__passwordWrapper">
              <Field
                placeholder="Type your password"
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                aria-describedby="password-error"
                className="loginForm__input loginForm__passwordInput"
              />
              <button
                className="loginForm__passwordToggle"
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            <div className="loginForm__errorMessage">
              <ErrorMessage name="password" />
            </div>
          </div>
          <button type="submit" className="loginForm__submitButton">
            Login
          </button>
        </Form>
      </Formik>
    </div>
  );
}

export default LoginForm;
