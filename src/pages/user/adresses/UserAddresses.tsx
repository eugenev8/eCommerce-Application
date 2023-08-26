import Modal from 'react-modal';
import { useState } from 'react';

import { Address, Customer } from '@commercetools/platform-sdk';

import FlexContainer from '../../../components/containers/FlexContainer';
import UserAddressInfo from '../../../components/userInfo/adress/UserAddress';
import { useAppSelector } from '../../../hooks/redux';

import styles from './UserAddresses.module.scss';
import EditAddressForm from '../../../components/forms/edit/EditAddressForm';

export function DefaultAddresses(
  defaultShippingAddress: Address | undefined,
  handleEditAddress: (address: Address) => void,
  defaultBillingAddress: Address | undefined
) {
  return (
    <>
      <h3 className={`${styles['block-heading']}`}>Address Book</h3>
      <FlexContainer style={{ gap: '25%', flexWrap: 'wrap' }}>
        <FlexContainer style={{ gap: '1rem' }}>
          <FlexContainer style={{ flexDirection: 'column' }}>
            <h4>Default Shipping Address</h4>
            <UserAddressInfo address={defaultShippingAddress} />
            {defaultShippingAddress && (
              <button
                type="button"
                className={`${styles.fakeLink}`}
                onClick={() => handleEditAddress(defaultShippingAddress)}
              >
                Edit address
              </button>
            )}
          </FlexContainer>
        </FlexContainer>

        <FlexContainer style={{ gap: '1rem' }}>
          <FlexContainer style={{ flexDirection: 'column' }}>
            <h4>Default Billing Address</h4>
            <UserAddressInfo address={defaultBillingAddress} />
            {defaultBillingAddress && (
              <button
                type="button"
                className={`${styles.fakeLink}`}
                onClick={() => handleEditAddress(defaultBillingAddress)}
              >
                Edit address
              </button>
            )}
          </FlexContainer>
        </FlexContainer>
      </FlexContainer>
    </>
  );
}

function allAddresses(
  customer: Customer,
  defaultShippingAddress: Address | undefined,
  defaultBillingAddress: Address | undefined,
  handleEditAddress: (address: Address) => void
) {
  return (
    <>
      <h3 className={`${styles['block-heading']}`}>All addresses</h3>
      <FlexContainer style={{ gap: '25%', flexWrap: 'wrap' }}>
        {customer.addresses.map((address, index) => {
          return (
            <FlexContainer key={address.id} style={{ flexDirection: 'column' }}>
              <h4>Address {index + 1}</h4>
              <UserAddressInfo address={address} />
              {defaultShippingAddress === address && <p>Default billing address</p>}
              {defaultBillingAddress === address && <p>Default shipping address</p>}
              <button type="button" className={`${styles.fakeLink}`} onClick={() => handleEditAddress(address)}>
                Edit address
              </button>
              <p className={`${styles.fakeLink}`}>Delete address</p>
            </FlexContainer>
          );
        })}
      </FlexContainer>
    </>
  );
}

export default function UserAddresses() {
  const { customer } = useAppSelector((state) => state.customerReducer);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);

  if (!customer) {
    return <h2>No customer</h2>;
  }

  const handleEditAddress = (address: Address) => {
    setSelectedAddress(address);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setSelectedAddress(null);
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
        {DefaultAddresses(defaultShippingAddress, handleEditAddress, defaultBillingAddress)}

        <FlexContainer style={{ flexDirection: 'column' }}>
          {allAddresses(customer, defaultShippingAddress, defaultBillingAddress, handleEditAddress)}
        </FlexContainer>
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
      </Modal>
    </>
  );
}
