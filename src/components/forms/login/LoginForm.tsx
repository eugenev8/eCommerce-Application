/* eslint-disable jsx-a11y/label-has-associated-control */
import './LoginForm.css';

import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import PasswordInput from '../inputs/PasswordInput';
import { EmailValidation, PasswordValidation } from '../CommonValidation';
import Button from '../../../ui/buttons/Buttons';
import CommonInput from '../inputs/CommonInput';

interface LoginFormValues {
  email: string;
  password: string;
}

const initialValues: LoginFormValues = {
  email: '',
  password: '',
};

const validationSchema = Yup.object({
  email: EmailValidation,
  password: PasswordValidation,
});

function LoginForm() {
  const handleSubmit = (values: LoginFormValues) => {
    // Handle login logic here
    alert(JSON.stringify(values, null, 2));
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
    </div>
  );
}

export default LoginForm;
