import { Field, useField } from 'formik';
import { useState } from 'react';
import styles from './inputs.module.scss';

interface CommonInputProps {
  labelText: string;
  placeholder: string;
  type: string;
  id: string;
  name: string;
}

export default function CommonInput({ labelText, type, placeholder, id, name }: CommonInputProps) {
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
    <div className={styles.inputContainer}>
      <label className={styles.label} htmlFor={id}>
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
        className={`${styles.input} ${toggleErrorClass()}`}
      />
      <div className={`${styles.input__errorMessage}`}>
        {showFeedback ? <div id={`${id}-error`}>{meta.error}</div> : ''}
      </div>
    </div>
  );
}
