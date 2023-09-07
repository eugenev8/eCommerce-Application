import { ReactNode } from 'react';
import Button from '../../buttons/Buttons';

interface EditFormContainerProps {
  onCancel: () => void;
  children: ReactNode;
}

function EditFormContainer({ onCancel, children }: EditFormContainerProps) {
  return (
    <>
      {children}
      <Button
        onClick={() => onCancel()}
        innerText="Cancel"
        styling="secondary"
        type="button"
        variant="default"
        addedClass=""
        style={{ margin: 'auto' }}
      />
    </>
  );
}

export default EditFormContainer;
