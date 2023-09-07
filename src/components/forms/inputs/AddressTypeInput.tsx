import { Field, useField } from 'formik';
import { useState } from 'react';
import styles from './inputs.module.scss';

interface CountryInputProps {
  labelText: string;
  placeholder: string;
  id: string;
  name: string;
}

interface CountryInfo {
  name: string;
  code: string;
}

interface CountriesObject {
  [country: string]: CountryInfo;
}

const Countries: CountriesObject = {
  Australia: {
    name: 'Australia',
    code: 'AU',
  },
  Spain: {
    name: 'Spain',
    code: 'ES',
  },
  US: {
    name: 'United States',
    code: 'US',
  },
  Germany: {
    name: 'Germany',
    code: 'DE',
  },
};

function selectionOption({ name, code }: CountryInfo) {
  return (
    <option key={code} value={code}>
      {name}
    </option>
  );
}

export default function CountryInput({ labelText, placeholder, id, name }: CountryInputProps) {
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
      <label className={styles.label} htmlFor={field.name}>
        {labelText}
      </label>
      <Field
        component="select"
        onBlur={field.onBlur}
        onChange={field.onChange}
        onFocus={handleFocus}
        value={field.value || 'AU'}
        placeholder={placeholder}
        id={id}
        name={name}
        aria-describedby={`${id}-error`}
        className={`${styles.input} ${styles[`${id}Input`]} ${toggleErrorClass()}`}
      >
        {Object.keys(Countries).map((countryName) => selectionOption(Countries[countryName]))}
      </Field>
      <div className={`${styles.input__errorMessage}`}>
        {showFeedback ? <div id={`${id}-error`}>{meta.error}</div> : ''}
      </div>
    </div>
  );
}
