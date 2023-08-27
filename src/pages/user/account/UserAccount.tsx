import Modal from 'react-modal';
import { useState } from 'react';

import { Customer } from '@commercetools/platform-sdk';

import FlexContainer from '../../../components/containers/FlexContainer';
import { useAppSelector } from '../../../hooks/redux';

import styles from './UserAccount.module.scss';
import Button from '../../../components/buttons/Buttons';
import UserContactInfo from '../../../components/userInfo/contacts/UserContacts';
import EditCustomerSmallForm from '../../../components/forms/edit/EditCustomerForm';
import EditPasswordForm from '../../../components/forms/edit/EditPasswordForm';

export default function UserAccount() {
  const { customer } = useAppSelector((state) => state.customerReducer);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [selectedPassword, setSelectedPassword] = useState<true | null>(null);

  if (!customer) {
    return <h2>No customer</h2>;
  }

  const handleEditCustomer = (address: Customer) => {
    setSelectedCustomer(address);
    setIsModalOpen(true);
  };

  const handleEditPassword = () => {
    setSelectedPassword(true);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setSelectedPassword(null);
    setSelectedCustomer(null);

    setIsModalOpen(false);
  };

  return (
    <>
      <FlexContainer style={{ flexDirection: 'column', flex: '1 1 60%' }}>
        <h3 className={`${styles['block-heading']}`}>Account information</h3>
        <UserContactInfo firstName={customer.firstName} lastName={customer.lastName} email={customer.email} />
        <p>
          Date of birth {customer.dateOfBirth && <span>{new Date(customer.dateOfBirth).toLocaleDateString()}</span>}
        </p>

        <FlexContainer style={{ gap: '1rem' }}>
          <button type="button" className={`${styles.fakeLink}`} onClick={() => handleEditCustomer(customer)}>
            Edit
          </button>
          <button type="button" className={`${styles.fakeLink}`} onClick={handleEditPassword}>
            Change password
          </button>
        </FlexContainer>

        <h3 className={`${styles['block-heading']}`}>Other info</h3>

        <h4>Created account date</h4>
        {customer.createdAt && <p>{new Date(customer.createdAt).toLocaleDateString()}</p>}

        <h4>Last modified account date</h4>
        {customer.lastModifiedAt && <p>{new Date(customer.lastModifiedAt).toLocaleDateString()}</p>}
      </FlexContainer>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleModalClose}
        appElement={document.getElementById('root') || undefined}
        closeTimeoutMS={200}
      >
        <FlexContainer style={{ flexDirection: 'column', gap: '20px' }}>
          {selectedCustomer && (
            <EditCustomerSmallForm
              customer={customer}
              onSave={(isUpdated) => {
                if (isUpdated) handleModalClose();
              }}
            />
          )}

          {selectedPassword && (
            <EditPasswordForm
              email={customer.email}
              version={customer.version}
              onSave={(isUpdated) => {
                if (isUpdated) handleModalClose();
              }}
            />
          )}

          <Button
            onClick={handleModalClose}
            innerText="Cancel"
            styling="secondary"
            type="button"
            variant="default"
            addedClass=""
            style={{ margin: 'auto' }}
          />
        </FlexContainer>
      </Modal>
    </>
  );
}
