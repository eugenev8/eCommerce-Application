import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { useState } from 'react';
import CommonInput from '../inputs/CommonInput';
import { AgeValidation, EmailValidation, FirstNameValidation, LastNameValidation } from '../CommonValidation';
import Button from '../../buttons/Buttons';
import FlexContainer from '../../containers/FlexContainer';
import useManageCustomer, { CustomerPersonalData } from '../../../hooks/useManageCustomer';
import toaster from '../../../services/toaster';

interface EditCustomerFormProps {
  onSave: (isUpdated: boolean) => void;
}

const validationSchema = Yup.object({
  firstName: FirstNameValidation,
  lastName: LastNameValidation,
  email: EmailValidation,
  dateOfBirth: AgeValidation,
});

export default function EditCustomerSmallForm({ onSave }: EditCustomerFormProps) {
  const [isSubmitting, setSubmitting] = useState(false);
  const { customer, updatePersonalData: updateCustomerPersonalData } = useManageCustomer();

  if (!customer) return null;

  const initialValues: CustomerPersonalData = {
    firstName: customer.firstName,
    lastName: customer.lastName,
    email: customer.email,
    dateOfBirth: customer.dateOfBirth,
  };

  const handleSubmit = (values: CustomerPersonalData) => {
    setSubmitting(true);
    updateCustomerPersonalData(values)
      .then(() => {
        toaster.showSuccess('Personal data changed successfully!');
        onSave(true);
      })
      .catch((error) => {
        toaster.showError(error.message);
        onSave(false);
      })
      .finally(() => setSubmitting(false));
  };

  return (
    <FlexContainer
      style={{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <h4>Edit your information</h4>
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
          <CommonInput
            type="date"
            id="dateOfBirth"
            labelText="Date of birth"
            name="dateOfBirth"
            placeholder="Type your date of birth"
          />

          <Button
            type="submit"
            innerText={isSubmitting ? 'Updating...' : 'Update'}
            styling="primary"
            variant="default"
            addedClass=""
            style={{ margin: 'auto' }}
            disabled={isSubmitting}
          />
        </Form>
      </Formik>
    </FlexContainer>
  );
}
