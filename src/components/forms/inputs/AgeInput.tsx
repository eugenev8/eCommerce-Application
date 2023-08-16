import { ErrorMessage, Field } from 'formik';

interface AgeInputProps {
  labelText: string;
  parentClassName: string;
  placeholder: string;
  id: string;
  name: string;
}

export default function AgeInput({ labelText, parentClassName, placeholder, id, name }: AgeInputProps) {
  return (
    <div className={`${parentClassName}__inputContainer ${parentClassName}__${id}`}>
      <label className={`${parentClassName}__label`} htmlFor={id}>
        {labelText}
      </label>
      <Field
        placeholder={placeholder}
        type="date"
        id={id}
        name={name}
        aria-describedby={`${id}-error`}
        className={`${parentClassName}__input ${parentClassName}__${id}Input`}
      />
      <div className={`${parentClassName}__errorMessage`}>
        <ErrorMessage name={id} id={`${id}-error`} />
      </div>
    </div>
  );
}
