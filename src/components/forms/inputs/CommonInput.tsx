import { Field, useField } from 'formik';
import { useState } from 'react';

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
  const [didFocus, setDidFocus] = useState(false);

  const handleFocus = () => setDidFocus(true);
  const showFeedback = (!!didFocus && field.value.trim().length > 1) || meta.touched;

  const toggleErrorClass = () => {
    if (showFeedback) {
      if (meta.error) {
        return 'input_error';
      }
      return 'input_valid';
    }
    return '';
  };

  return (
    <div className={`${parentClassName}__inputContainer ${parentClassName}__${id}`}>
      <label className={`${parentClassName}__label`} htmlFor={id}>
        {labelText}
      </label>
      <Field
        onBlur={field.onBlur}
        onChange={field.onChange}
        onFocus={handleFocus}
        value={field.value}
        placeholder={placeholder}
        type={type}
        id={id}
        name={name}
        aria-describedby={`${id}-error`}
        className={`${parentClassName}__input ${parentClassName}__${id}Input ${toggleErrorClass()}`}
      />
      <div className={`input__errorMessage ${parentClassName}__errorMessage`}>
        <div id={`${id}-error`}>{showFeedback && meta.error}</div>
      </div>
    </div>
  );
}
