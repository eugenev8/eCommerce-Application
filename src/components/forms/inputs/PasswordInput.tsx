import React, { useState } from 'react';
import { Field, useField } from 'formik';

interface PasswordInputProps {
  labelText: string;
  parentClassName: string;
  placeholder: string;
  id: string;
  name: string;
}

export default function PasswordInput({ labelText, parentClassName, placeholder, id, name }: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);
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
      <div className={`${parentClassName}__passwordWrapper`}>
        <Field
          onBlur={field.onBlur}
          onChange={field.onChange}
          onFocus={handleFocus}
          value={field.value}
          placeholder={placeholder}
          type={showPassword ? 'text' : 'password'}
          id={id}
          name={name}
          aria-describedby={`${id}-error`}
          className={`${parentClassName}__input ${parentClassName}__${id}Input ${toggleErrorClass()}`}
        />
        <button
          className={`input__passwordToggle ${parentClassName}__passwordToggle`}
          type="button"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? 'Hide' : 'Show'}
        </button>
      </div>

      <div className={`input__errorMessage ${parentClassName}__errorMessage`}>
        <div id={`${id}-error`}>{showFeedback && meta.error}</div>
      </div>
    </div>
  );
}
