import { Formik, Form } from 'formik';

import Button from '../../buttons/Buttons';
import FlexContainer from '../../containers/FlexContainer';
import { AgeValidation } from '../CommonValidation';
import CommonInput from '../inputs/CommonInput';

interface EditDateFormProps {
  date: string;
  onSave: (updatedDate: string) => void;
}

const validationSchema = AgeValidation;

export default function EditDateForm({ date, onSave }: EditDateFormProps) {
  const initialValues = {
    dateOfBirth: date,
  };

  const handleSubmit = (value: { dateOfBirth: string }) => {
    onSave(value.dateOfBirth);
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
            type="date"
            id="dateOfBirth"
            labelText="Date of birth"
            name="dateOfBirth"
            placeholder="Type your date of birth"
          />

          <Button
            type="submit"
            innerText="Update date"
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
