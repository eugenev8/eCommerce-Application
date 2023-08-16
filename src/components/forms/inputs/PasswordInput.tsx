import React, { useState } from 'react';
import { ErrorMessage, Field } from 'formik';

interface PasswordInputProps {
  labelText: string;
  parentClassName: string;
  placeholder: string;
  id: string;
  name: string;
}

export default function PasswordInput({ labelText, parentClassName, placeholder, id, name }: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={`${parentClassName}__inputContainer ${parentClassName}__${id}`}>
      <label className={`${parentClassName}__label`} htmlFor={id}>
        {labelText}
      </label>
      <div className={`${parentClassName}__passwordWrapper`}>
        <Field
          placeholder={placeholder}
          type={showPassword ? 'text' : 'password'}
          id={id}
          name={name}
          aria-describedby={`${id}-error`}
          className={`${parentClassName}__input ${parentClassName}__${id}Input`}
        />
        <button
          className={`${parentClassName}__passwordToggle`}
          type="button"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? 'Hide' : 'Show'}
        </button>
      </div>

      <div className={`${parentClassName}__errorMessage`}>
        <ErrorMessage name={id} id={`${id}-error`} />
      </div>
    </div>
  );
}
