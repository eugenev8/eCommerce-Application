import { Address, Customer } from '@commercetools/platform-sdk';
import Modal from 'react-modal';
import { useState } from 'react';
import FlexContainer from '../../../components/containers/FlexContainer';
import UserContactInfo from '../../../components/userInfo/contacts/UserContacts';
import { useAppSelector } from '../../../hooks/redux';
import { DefaultAddresses } from '../adresses/UserAddresses';

import styles from './UserDashboard.module.scss';
import EditAddressForm from '../../../components/forms/edit/EditAddressForm';
import EditCustomerSmallForm from '../../../components/forms/edit/EditCustomerForm';
import EditPasswordForm from '../../../components/forms/edit/EditPasswordForm';

export default function UserDashboard() {
  const { customer } = useAppSelector((state) => state.customerReducer);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [selectedPassword, setSelectedPassword] = useState<true | null>(null);

  if (!customer) {
    return <h2>No customer</h2>;
  }

  const handleEditAddress = (address: Address) => {
    setSelectedAddress(address);
    setIsModalOpen(true);
  };

  const handleEditCustomer = (customerData: Customer) => {
    setSelectedCustomer(customerData);
    setIsModalOpen(true);
  };

  const handleEditPassword = () => {
    setSelectedPassword(true);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setSelectedAddress(null);
    setSelectedCustomer(null);
    setSelectedPassword(null);

    setIsModalOpen(false);
  };

  const hasBillingAddress = !!customer.billingAddressIds?.length;

  const defaultShippingAddress = customer.addresses.find((adress) => adress.id === customer.defaultShippingAddressId);
  const defaultBillingAddress = hasBillingAddress
    ? customer.addresses.find((adress) => adress.id === customer.defaultBillingAddressId)
    : undefined;

  return (
    <>
      <FlexContainer style={{ flexDirection: 'column', flex: '1 1 60%' }}>
        <h3 className={`${styles['block-heading']}`}>Account information</h3>
        <UserContactInfo firstName={customer.firstName} lastName={customer.lastName} email={customer.email} />
        <FlexContainer style={{ gap: '1rem' }}>
          <button type="button" className={`${styles.fakeLink}`} onClick={() => handleEditCustomer(customer)}>
            Edit
          </button>
          <button type="button" className={`${styles.fakeLink}`} onClick={handleEditPassword}>
            Change password
          </button>
        </FlexContainer>

        {DefaultAddresses(defaultShippingAddress, handleEditAddress, defaultBillingAddress)}
      </FlexContainer>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleModalClose}
        appElement={document.getElementById('root') || undefined}
        closeTimeoutMS={200}
      >
        {selectedAddress && (
          <EditAddressForm
            address={selectedAddress}
            onSave={(updatedValues) => {
              alert(JSON.stringify({ ...selectedAddress, ...updatedValues }, null, 2));
              // Handle address update here
              // Close the modal after successful update
              handleModalClose();
            }}
          />
        )}

        {selectedCustomer && (
          <EditCustomerSmallForm
            customer={customer}
            onSave={(updatedCustomerData) => {
              alert(JSON.stringify({ updatedCustomerData }, null, 2));
              // Handle address update here
              // Close the modal after successful update
              handleModalClose();
            }}
          />
        )}

        {selectedPassword && (
          <EditPasswordForm
            onSave={(isUpdated) => {
              alert(`isUpdated: ${isUpdated}`);
              // Handle address update here
              // Close the modal after successful update
              handleModalClose();
            }}
          />
        )}
      </Modal>
    </>
  );
}
