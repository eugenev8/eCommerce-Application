import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Button from '../../buttons/Buttons';
import FlexContainer from '../../containers/FlexContainer';
import { PasswordValidation } from '../CommonValidation';
import PasswordInput from '../inputs/PasswordInput';

interface EditEmailFormProps {
  onSave: (updatedPassword: boolean) => void;
}

const validationSchema = Yup.object({
  oldPassword: PasswordValidation,
  newPassword: PasswordValidation,
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword'), undefined], 'Passwords must match')
    .required('Required'),
});

export default function EditPasswordForm({ onSave }: EditEmailFormProps) {
  const initialValues = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  };

  const handleSubmit = (values: typeof initialValues) => {
    alert(JSON.stringify(values, null, 2));

    const isUpdated = true;

    onSave(isUpdated);
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
            innerText="Update password"
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
