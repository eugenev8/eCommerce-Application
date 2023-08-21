/* eslint-disable jsx-a11y/label-has-associated-control */
import './LoginForm.css';

import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { CustomerSignin } from '@commercetools/platform-sdk';
import PasswordInput from '../inputs/PasswordInput';
import { EmailValidation, PasswordValidation } from '../CommonValidation';
import Button from '../../../ui/buttons/Buttons';
import CommonInput from '../inputs/CommonInput';
import { useAppDispatch } from '../../../hooks/redux';
import { loginWithPassword } from '../../../reducers/ActionCreators';
import toaster from '../../../services/toaster';

const initialValues: CustomerSignin = {
  email: 'aaabbb@gmail.com',
  password: 'Aa123456!',
};

const validationSchema = Yup.object({
  email: EmailValidation,
  password: PasswordValidation,
});

function LoginForm() {
  const dispatch = useAppDispatch();

  const handleSubmit = (values: CustomerSignin) => {
    dispatch(loginWithPassword({ email: values.email, password: values.password }));
  };

  return (
    <div className="loginForm">
      <h2 className="loginForm__header">Greetings! Welcome to shop.</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        validateOnChange
        validateOnMount
        onSubmit={handleSubmit}
      >
        <Form className="loginForm__formContainer">
          <CommonInput
            type="email"
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

          <Button
            innerText="Login"
            styling="primary"
            type="submit"
            variant="default"
            addedClass="loginForm__submitButton"
          />
        </Form>
      </Formik>
      <button type="button" onClick={() => toaster.showSuccess('Success!!!!')}>
        Success
      </button>
      <button type="button" onClick={() => toaster.showError('Error!!!!')}>
        Error
      </button>
    </div>
  );
}

export default LoginForm;
