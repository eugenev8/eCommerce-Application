import { ErrorMessage, Field } from 'formik';

interface EmailInputProps {
  labelText: string;
  parentClassName: string;
  placeholder: string;
  id: string;
  name: string;
}

export default function EmailInput({ labelText, parentClassName, placeholder, id, name }: EmailInputProps) {
  return (
    <div className={`${parentClassName}__inputContainer ${parentClassName}__${id}`}>
      <label className={`${parentClassName}__label`} htmlFor={id}>
        {labelText}
      </label>
      <Field
        placeholder={placeholder}
        type="email"
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
