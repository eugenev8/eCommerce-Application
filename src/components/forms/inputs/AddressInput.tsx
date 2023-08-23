import { Field, useField } from 'formik';
import { useState } from 'react';
import CountryInput from './CountryInput';

interface AddressFieldProps {
  labelText: string;
  parentClassName: string;
  placeholder: string;
  id: string;
  name: string;
}

function AddressField({ labelText, parentClassName, placeholder, id, name }: AddressFieldProps) {
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
    <>
      <label className={`${parentClassName}__label`} htmlFor={id}>
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
        className={`${parentClassName}__input ${parentClassName}__${id}Input ${toggleErrorClass()}`}
      />
      <div className={`input__errorMessage ${parentClassName}__errorMessage`}>
        <div id={`${id}-error`}>{showFeedback && meta.error}</div>
      </div>
    </>
  );
}

interface AddressContainerProps {
  name: string;
  parentClassName: string;
  heading: string;
}

export default function AddressInputContainer({ name, parentClassName, heading }: AddressContainerProps) {
  return (
    <div className={`${parentClassName}__addressContainer`}>
      <div className={`${parentClassName}__addressHeading`}>
        <h3>{heading}</h3>
      </div>
      <AddressField
        id={`${name}.streetName`}
        labelText="Street"
        name={`${name}.streetName`}
        parentClassName={parentClassName}
        placeholder="Type your street"
      />
      <AddressField
        id={`${name}.city`}
        labelText="City"
        name={`${name}.city`}
        parentClassName={parentClassName}
        placeholder="Type your city"
      />
      <AddressField
        id={`${name}.postalCode`}
        labelText="Postal"
        name={`${name}.postalCode`}
        parentClassName={parentClassName}
        placeholder="Type your postal"
      />
      <CountryInput
        id={`${name}.country`}
        labelText="Country"
        name={`${name}.country`}
        parentClassName={parentClassName}
        placeholder="Type your country"
      />
    </div>
  );
}
