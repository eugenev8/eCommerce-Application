import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { Customer, MyCustomerUpdate } from '@commercetools/platform-sdk';
import CommonInput from '../inputs/CommonInput';
import { AgeValidation, EmailValidation, FirstNameValidation, LastNameValidation } from '../CommonValidation';
import Button from '../../buttons/Buttons';
import FlexContainer from '../../containers/FlexContainer';
import { useAppDispatch } from '../../../hooks/redux';
import { updateCustomerData } from '../../../reducers/ActionCreators';

interface EditCustomerFormProps {
  customer: Customer;
  onSave: (isUpdated: boolean) => void;
}

const validationSchema = Yup.object({
  firstName: FirstNameValidation,
  lastName: LastNameValidation,
  email: EmailValidation,
  dateOfBirth: AgeValidation,
});

export default function EditCustomerSmallForm({ customer, onSave }: EditCustomerFormProps) {
  const dispatch = useAppDispatch();

  const initialValues = {
    firstName: customer.firstName,
    lastName: customer.lastName,
    email: customer.email,
    dateOfBirth: customer.dateOfBirth,
  };

  function createMyCustomerUpdate(values: Pick<Customer, 'firstName' | 'lastName' | 'email' | 'dateOfBirth'>) {
    const updates: MyCustomerUpdate = { version: customer.version, actions: [] };
    if (customer.firstName !== values.firstName) {
      updates.actions.push({
        firstName: values.firstName,
        action: 'setFirstName',
      });
    }
    if (customer.lastName !== values.lastName) {
      updates.actions.push({
        lastName: values.lastName,
        action: 'setLastName',
      });
    }
    if (customer.email !== values.email) {
      updates.actions.push({
        email: values.email,
        action: 'changeEmail',
      });
    }
    if (customer.dateOfBirth !== values.dateOfBirth) {
      updates.actions.push({
        dateOfBirth: values.dateOfBirth,
        action: 'setDateOfBirth',
      });
    }

    return updates;
  }

  const handleSubmit = (values: Pick<Customer, 'firstName' | 'lastName' | 'email' | 'dateOfBirth'>) => {
    const updates = createMyCustomerUpdate(values);
    if (!updates.actions.length) return; // show "no changes"
    dispatch(updateCustomerData(updates)).then((payloadAction) => {
      if (payloadAction.type.includes('rejected')) {
        // show error on the form
        onSave(false);
      } else {
        onSave(true);
      }
    });
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
            innerText="Update"
            styling="primary"
            variant="default"
            addedClass=""
            style={{ margin: 'auto' }}
          />
        </Form>
      </Formik>
    </FlexContainer>
  );
}
