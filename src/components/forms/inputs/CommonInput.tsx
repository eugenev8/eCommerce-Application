import { ErrorMessage, Field, useField } from 'formik';

interface CommonInputProps {
  labelText: string;
  parentClassName: string;
  placeholder: string;
  type: string;
  id: string;
  name: string;
}

export default function CommonInput({ labelText, parentClassName, type, placeholder, id, name }: CommonInputProps) {
  const [field, meta] = useField(name);

  const toggleErrorClass = () => {
    if (!meta.touched) {
      return '';
    }
    if (meta.error) {
      return 'input_error';
    }
    return 'input_valid';
  };

  return (
    <div className={`${parentClassName}__inputContainer ${parentClassName}__${id}`}>
      <label className={`${parentClassName}__label`} htmlFor={id}>
        {labelText}
      </label>
      <Field
        onBlur={field.onBlur}
        onChange={field.onChange}
        value={field.value}
        placeholder={placeholder}
        type={type}
        id={id}
        name={name}
        aria-describedby={`${id}-error`}
        className={`${parentClassName}__input ${parentClassName}__${id}Input ${toggleErrorClass()}`}
      />
      <div className={`input__errorMessage ${parentClassName}__errorMessage`}>
        <ErrorMessage name={id} id={`${id}-error`} />
      </div>
    </div>
  );
}
