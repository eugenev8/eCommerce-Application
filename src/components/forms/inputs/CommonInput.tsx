import { ErrorMessage, Field } from 'formik';

interface CommonInputProps {
  labelText: string;
  parentClassName: string;
  placeholder: string;
  type: string;
  id: string;
  name: string;
}

export default function CommonInput({ labelText, parentClassName, type, placeholder, id, name }: CommonInputProps) {
  return (
    <div className={`${parentClassName}__inputContainer ${parentClassName}__${id}`}>
      <label className={`${parentClassName}__label`} htmlFor={id}>
        {labelText}
      </label>
      <Field
        placeholder={placeholder}
        type={type}
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
