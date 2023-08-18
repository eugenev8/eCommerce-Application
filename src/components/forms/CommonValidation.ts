import * as Yup from 'yup';

export const PasswordValidation = Yup.string()
  .min(8, 'Password must be at least 8 characters')
  .matches(/^[a-zA-Z0-9!@#$%^&*]*$/, 'Password must only contain Latin symbols, digits, and special characters')
  .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
  .matches(/[0-9]/, 'Password must contain at least one digit')
  .matches(/[!@#$%^&*]/, 'Password must contain at least one special character')
  .matches(/^\S*$/, 'Password must not contain whitespace')
  .required('Password is required');

export const EmailValidation = Yup.string()
  .email('Invalid email address')
  .required('Email is required')
  .matches(/^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Invalid email format or missing domain');

export const AddressValidaiton = Yup.object({
  street: Yup.string()
    .min(1, 'Street must contain at least one character')
    .required('Street is required')
    .matches(/^[a-zA-Z\s]*$/, 'Street must not contain special characters or numbers'),
  city: Yup.string()
    .min(1, 'City must contain at least one character')
    .matches(/^[a-zA-Z\s]*$/, 'City must not contain special characters or numbers')
    .required('City is required'),
  postal: Yup.string().required('Postal code is required').matches(/^\d+$/, 'Postal code must contain only numbers'),
  country: Yup.string()
    .required('Country is required')
    .matches(/^[a-zA-Z0-9!@#$%^&*]*$/, 'Country must only contain Latin symbols, digits, and special characters'),
});

export const FirstNameValidation = Yup.string()
  .min(1, 'First name must contain at least one character')
  .matches(/^[a-zA-Z]*$/, 'First name must not contain special characters or numbers')
  .required('First name is required');

export const LastNameValidation = Yup.string()
  .min(1, 'Last name must contain at least one character')
  .matches(/^[a-zA-Z]*$/, 'Last name must not contain special characters or numbers')
  .required('Last name is required');

export const AgeValidation = Yup.date()
  .required('Date of birth is required')
  .min(new Date(new Date().getFullYear() - 130, 0, 1), 'You must be at most 130 years old')
  .max(
    new Date(new Date().getFullYear() - 13, new Date().getMonth(), new Date().getDate()),
    'You must be at least 13 years old'
  );
