import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import Button from '../../buttons/Buttons';
import FlexContainer from '../../containers/FlexContainer';
import { PasswordValidation } from '../CommonValidation';
import PasswordInput from '../inputs/PasswordInput';
import { useAppDispatch } from '../../../hooks/redux';
import { changeCustomerPassword } from '../../../reducers/ActionCreators';

interface EditEmailFormProps {
  onSave: (updatedPassword: boolean) => void;
  email: string;
  version: number;
}

const validationSchema = Yup.object({
  oldPassword: PasswordValidation,
  newPassword: PasswordValidation,
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword'), undefined], 'Passwords must match')
    .required('Required'),
});

export default function EditPasswordForm({ onSave, email, version }: EditEmailFormProps) {
  const [isSubmitting, setSubmitting] = useState(false);

  const initialValues = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  };

  const dispatch = useAppDispatch();

  const handleSubmit = (values: typeof initialValues) => {
    setSubmitting(true);

    dispatch(
      changeCustomerPassword({ currentPassword: values.oldPassword, newPassword: values.newPassword, version, email })
    )
      .then((payloadAction) => {
        if (payloadAction.type.includes('rejected')) {
          // show error on the form
          onSave(false);
        } else {
          onSave(true);
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
          <PasswordInput id="oldPassword" labelText="Old password" name="oldPassword" placeholder="Type old password" />

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
