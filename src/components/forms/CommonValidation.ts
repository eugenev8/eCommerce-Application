import * as Yup from 'yup';

export const PasswordValidation = Yup.string()
  .min(8, 'Password must be at least 8 characters')
  .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
  .matches(/[0-9]/, 'Password must contain at least one digit')
  .matches(/[!@#$%^&*]/, 'Password must contain at least one special character')
  .matches(/^\S*$/, 'Password must not contain whitespace')
  .required('Password is required');

export const EmailValidation = Yup.string().email('Invalid email address').required('Email is required');
