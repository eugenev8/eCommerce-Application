import { ErrorMessage, Field } from 'formik';

interface AdressFieldProps {
  labelText: string;
  parentClassName: string;
  placeholder: string;
  id: string;
  name: string;
}

function AdressField({ labelText, parentClassName, placeholder, id, name }: AdressFieldProps) {
  return (
    <>
      <label className={`${parentClassName}__label`} htmlFor={id}>
        {labelText}
      </label>
      <Field
        placeholder={placeholder}
        type="text"
        id={id}
        name={name}
        aria-describedby={`${id}-error`}
        className={`${parentClassName}__input ${parentClassName}__${id}Input`}
      />
      <div className={`${parentClassName}__errorMessage`}>
        <ErrorMessage name={id} id={`${id}-error`} />
      </div>
    </>
  );
}

interface AdressContainerProps {
  name: string;
  parentClassName: string;
  heading: string;
}

export default function AdressInputContainer({ name, parentClassName, heading }: AdressContainerProps) {
  return (
    <div className={`${parentClassName}__adressContainer`}>
      <h3>{heading}</h3>
      <AdressField
        id={`${name}.street`}
        labelText="Street"
        name={`${name}.street`}
        parentClassName={parentClassName}
        placeholder="Type your street"
      />
      <AdressField
        id={`${name}.city`}
        labelText="City"
        name={`${name}.city`}
        parentClassName={parentClassName}
        placeholder="Type your city"
      />
      <AdressField
        id={`${name}.postal`}
        labelText="Postal"
        name={`${name}.postal`}
        parentClassName={parentClassName}
        placeholder="Type your postal"
      />
      <AdressField
        id={`${name}.country`}
        labelText="Country"
        name={`${name}.country`}
        parentClassName={parentClassName}
        placeholder="Type your country"
      />
    </div>
  );
}
