import React, { useState } from 'react';
import { Field, useField } from 'formik';
import CountryInput from './CountryInput';
import styles from './inputs.module.scss';

interface AddressFieldProps {
  labelText: string;
  placeholder: string;
  id: string;
  name: string;
}

function AddressField({ labelText, placeholder, id, name }: AddressFieldProps) {
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
    <>
      <label className={styles.label} htmlFor={id}>
        {labelText}
      </label>
      <Field
        onBlur={field.onBlur}
        onChange={field.onChange}
        onFocus={handleFocus}
        value={field.value}
        placeholder={placeholder}
        type="text"
        id={id}
        name={name}
        aria-describedby={`${id}-error`}
        className={`${styles.input} ${toggleErrorClass()}`}
      />
      <div className={`${styles.input__errorMessage}`}>
        {showFeedback ? <div id={`${id}-error`}>{meta.error}</div> : ''}
      </div>
    </>
  );
}

interface AddressContainerProps {
  name: string;
  heading: string;
}

export default function AddressInputContainer({ name, heading }: AddressContainerProps) {
  return (
    <div className={styles.inputContainer}>
      <div className={styles.input__addressContainer}>
        <div className={styles.input__addressHeading}>
          <h3>{heading}</h3>
        </div>
        <AddressField
          id={`${name}.streetName`}
          labelText="Street"
          name={`${name}.streetName`}
          placeholder="Type your street"
        />
        <AddressField id={`${name}.city`} labelText="City" name={`${name}.city`} placeholder="Type your city" />
        <AddressField
          id={`${name}.postalCode`}
          labelText="Postal"
          name={`${name}.postalCode`}
          placeholder="Type your postal"
        />
        <CountryInput
          id={`${name}.country`}
          labelText="Country"
          name={`${name}.country`}
          placeholder="Type your country"
        />
      </div>
    </div>
  );
}
