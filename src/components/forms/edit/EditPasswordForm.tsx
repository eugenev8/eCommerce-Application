import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import Button from '../../buttons/Buttons';
import FlexContainer from '../../containers/FlexContainer';
import { PasswordValidation } from '../CommonValidation';
import PasswordInput from '../inputs/PasswordInput';

// eslint-disable-next-line import/no-named-as-default
import useManageCustomer, { ChangePasswordData } from '../../../hooks/useManageCustomer';
import toaster from '../../../services/toaster';

interface EditEmailFormProps {
  onSave: (updatedPassword: boolean) => void;
}

const validationSchema = Yup.object({
  currentPassword: PasswordValidation,
  newPassword: PasswordValidation,
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword'), undefined], 'Passwords must match')
    .required('Required'),
});

export default function EditPasswordForm({ onSave }: EditEmailFormProps) {
  const { changePassword: changeCustomerPassword } = useManageCustomer();
  const [isSubmitting, setSubmitting] = useState(false);

  const initialValues: ChangePasswordData = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  };

  const handleSubmit = (values: ChangePasswordData) => {
    setSubmitting(true);
    changeCustomerPassword(values)
      .then((data) => {
        if (data.type.includes('fulfilled')) {
          toaster.showSuccess('Password changed successfully!');
          onSave(true);
        } else {
          onSave(false);
        }
      })
      .finally(() => {
        setSubmitting(false);
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
      <h4>Change your password</h4>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        validateOnChange
        onSubmit={handleSubmit}
      >
        <Form>
          <PasswordInput
            id="currentPassword"
            labelText="Current password"
            name="currentPassword"
            placeholder="Type current password"
          />

          <PasswordInput id="newPassword" labelText="New password" name="newPassword" placeholder="Type new password" />

          <PasswordInput
            id="confirmPassword"
            labelText="Confirm password"
            name="confirmPassword"
            placeholder="Confirm new password"
          />

          <Button
            type="submit"
            innerText={isSubmitting ? 'Updating...' : 'Update password'}
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
