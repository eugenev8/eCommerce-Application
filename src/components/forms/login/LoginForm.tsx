import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { CustomerSignin } from '@commercetools/platform-sdk';

import styles from './LoginForm.module.scss';
import PasswordInput from '../inputs/PasswordInput';
import { EmailValidation, PasswordValidation } from '../CommonValidation';
import Button from '../../buttons/Buttons';
import CommonInput from '../inputs/CommonInput';
import { useAppDispatch } from '../../../hooks/redux';
import { loginWithPassword } from '../../../reducers/ActionCreators';

const initialValues: CustomerSignin = {
  email: '',
  password: '',
};

const validationSchema = Yup.object({
  email: EmailValidation,
  password: PasswordValidation,
});

function LoginForm() {
  const [isSubmiting, setIsSubmiting] = useState(false);
  const dispatch = useAppDispatch();

  const handleSubmit = (values: CustomerSignin) => {
    setIsSubmiting(true);

    dispatch(loginWithPassword(values)).finally(() => {
      setIsSubmiting(false);
    });
  };

  return (
    <div className={styles.loginForm}>
      <h2>Greetings! Welcome to shop.</h2>
      <p>If you have an account, sign in with your email address.</p>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        validateOnChange
        validateOnMount
        onSubmit={handleSubmit}
      >
        <Form className={`${styles.loginForm__formContainer}`}>
          <CommonInput type="text" labelText="Email" placeholder="Type your email" id="email" name="email" />

          <PasswordInput labelText="Password" placeholder="Type your password" id="password" name="password" />

          <Button
            innerText={isSubmiting ? 'Submiting...' : 'Sign In'}
            styling="primary"
            type="submit"
            variant="default"
            addedClass=""
            disabled={isSubmiting}
          />
        </Form>
      </Formik>
    </div>
  );
}

export default LoginForm;
