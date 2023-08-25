import React, { useState } from 'react';
import { Field, useField } from 'formik';
import styles from './inputs.module.scss';

interface PasswordInputProps {
  labelText: string;
  placeholder: string;
  id: string;
  name: string;
}

export default function PasswordInput({ labelText, placeholder, id, name }: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [field, meta] = useField(name);
  const [didFocus, setDidFocus] = useState(false);

  const handleFocus = () => setDidFocus(true);
  const showFeedback = (!!didFocus && field.value.trim().length > 1) || meta.touched;

  const toggleErrorClass = () => {
    if (showFeedback) {
      if (meta.error) {
        return styles.input_error;
      }
      return styles.input_valid;
    }
    return '';
  };

  return (
    <div className={`${styles.inputContainer} ${styles[`${id}`]}`}>
      <label className={styles.label} htmlFor={id}>
        {labelText}
      </label>
      <div className={`${styles.input__passwordWrapper}`}>
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
          className={`${styles.input} ${toggleErrorClass()}`}
        />
        <button
          className={`${styles.input__passwordToggle}`}
          type="button"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? 'Hide' : 'Show'}
        </button>
      </div>

      <div className={`${styles.input__errorMessage}`}>
        <div id={`${id}-error`}>{showFeedback && meta.error}</div>
      </div>
    </div>
  );
}
