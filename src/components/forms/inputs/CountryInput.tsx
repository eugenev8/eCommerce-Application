import { Field, useField } from 'formik';
import { useState } from 'react';

interface CountryInputProps {
  labelText: string;
  parentClassName: string;
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

export default function CountryInput({ labelText, parentClassName, placeholder, id, name }: CountryInputProps) {
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
      <label className={`${parentClassName}__label`} htmlFor={field.name}>
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
        className={`${parentClassName}__input ${parentClassName}__${id}Input ${toggleErrorClass()}`}
      >
        {Object.keys(Countries).map((countryName) => selectionOption(Countries[countryName]))}
      </Field>
      <div className={`input__errorMessage ${parentClassName}__errorMessage`}>
        <div id={`${id}-error`}>{showFeedback && meta.error}</div>
      </div>
    </div>
  );
}
