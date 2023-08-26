import Modal from 'react-modal';
import { useState } from 'react';

import { Customer } from '@commercetools/platform-sdk';

import FlexContainer from '../../../components/containers/FlexContainer';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';

import styles from './UserAccount.module.scss';
import Button from '../../../components/buttons/Buttons';
import UserContactInfo from '../../../components/userInfo/contacts/UserContacts';
import EditCustomerSmallForm from '../../../components/forms/edit/EditCustomerForm';
import EditPasswordForm from '../../../components/forms/edit/EditPasswordForm';
import EditDateForm from '../../../components/forms/edit/EditDateForm';
import { updateCustomerPersonalData } from '../../../reducers/ActionCreators';

export default function UserAccount() {
  const { customer } = useAppSelector((state) => state.customerReducer);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [selectedPassword, setSelectedPassword] = useState<true | null>(null);
  const [selectedDate, setSelectedDate] = useState<true | null>(null);

  const dispatch = useAppDispatch();

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
  // const handleEditDate = () => {
  //   setSelectedDate(true);
  //   setIsModalOpen(true);
  // };

  const handleModalClose = () => {
    setSelectedPassword(null);
    setSelectedCustomer(null);
    setSelectedDate(null);

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

        {/* <h4>Date of birth</h4>
        {customer.dateOfBirth && <p>{new Date(customer.dateOfBirth).toLocaleDateString()}</p>}
        <button type="button" className={`${styles.fakeLink}`} onClick={handleEditDate}>
          Change date of birth
        </button> */}

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
              onSave={(updatedCustomerData) => {
                // alert(JSON.stringify({ updatedCustomerData }, null, 2));

                dispatch(updateCustomerPersonalData(updatedCustomerData)).then(handleModalClose);
                // Close the modal after successful update
              }}
            />
          )}

          {selectedPassword && (
            <EditPasswordForm
              email={customer.email}
              version={customer.version}
              onSave={(isUpdated) => {
                // alert(`isUpdated: ${isUpdated}`);

                if (isUpdated) handleModalClose();
                // Close the modal after successful update
              }}
            />
          )}

          {selectedDate && (
            <EditDateForm
              date={customer.dateOfBirth!}
              onSave={(isUpdated) => {
                alert(`isUpdated: ${isUpdated}`);
                // Handle address update here
                // Close the modal after successful update
                handleModalClose();
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
