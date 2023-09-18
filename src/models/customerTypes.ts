import { MyCustomerChangePassword } from '@commercetools/platform-sdk';

export enum AddressType {
  Shipping = 'shipping',
  Billing = 'billing',
}

export interface CustomerPersonalData {
  email: string;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
}

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface MyCustomerChangePasswordWithEmail extends MyCustomerChangePassword {
  email: string;
}
