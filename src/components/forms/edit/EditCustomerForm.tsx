import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { Customer } from '@commercetools/platform-sdk';
import CommonInput from '../inputs/CommonInput';
import { EmailValidation, FirstNameValidation, LastNameValidation } from '../CommonValidation';
import Button from '../../buttons/Buttons';
import FlexContainer from '../../containers/FlexContainer';

interface EditCustomerFormProps {
  customer: Customer;
  onSave: (updatedCustomer: Pick<Customer, 'firstName' | 'lastName' | 'email'>) => void;
}

const validationSchema = Yup.object({
  firstName: FirstNameValidation,
  lastName: LastNameValidation,
  email: EmailValidation,
});

export default function EditCustomerSmallForm({ customer, onSave }: EditCustomerFormProps) {
  const initialValues = {
    firstName: customer.firstName,
    lastName: customer.lastName,
    email: customer.email,
  };

  const handleSubmit = (values: Pick<Customer, 'firstName' | 'lastName' | 'email'>) => {
    onSave(values);
  };

  return (
    <FlexContainer
      style={{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        validateOnChange
        onSubmit={handleSubmit}
      >
        <Form>
          <CommonInput
            id="firstName"
            labelText="First Name"
            name="firstName"
            placeholder="Type your first name"
            type="text"
          />
          <CommonInput
            id="lastName"
            labelText="Last Name"
            name="lastName"
            placeholder="Type your last name"
            type="text"
          />
          <CommonInput id="email" labelText="Email" name="email" placeholder="Type your email" type="text" />

          <Button type="submit" innerText="Update" styling="primary" variant="default" addedClass="" />
        </Form>
      </Formik>
    </FlexContainer>
  );
}
