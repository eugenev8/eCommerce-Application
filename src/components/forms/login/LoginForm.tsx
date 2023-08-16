/* eslint-disable jsx-a11y/label-has-associated-control */
import './LoginForm.css';

import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import EmailInput from '../inputs/EmailInput';
import PasswordInput from '../inputs/PasswordInput';

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
  const handleSubmit = (values: LoginFormValues) => {
    // Handle login logic here
    alert(JSON.stringify(values, null, 2));
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
          <EmailInput
            labelText="Email"
            placeholder="Type your email"
            id="email"
            name="email"
            parentClassName="loginForm"
          />

          <PasswordInput
            labelText="Password"
            placeholder="Type your password"
            id="password"
            name="password"
            parentClassName="loginForm"
          />

          <button type="submit" className="loginForm__submitButton">
            Login
          </button>
        </Form>
      </Formik>
    </div>
  );
}

export default LoginForm;
