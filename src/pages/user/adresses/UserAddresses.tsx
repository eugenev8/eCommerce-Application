import Modal from 'react-modal';
import { useState } from 'react';

import { Address } from '@commercetools/platform-sdk';

import FlexContainer from '../../../components/containers/FlexContainer';
import UserAddressInfo from '../../../components/userInfo/adress/UserAddress';
import { useAppSelector } from '../../../hooks/redux';

import styles from './UserAddresses.module.scss';
import EditAddressForm from '../../../components/forms/edit/EditAddressForm';
import Button from '../../../components/buttons/Buttons';
import CreateAddressForm from '../../../components/forms/create/CreateAddressForm';
import toaster from '../../../services/toaster';
import useManageCustomer from '../../../hooks/useManageCustomer';
import { AddressType } from '../../../models/customerTypes';

export function DefaultAddresses(
  defaultShippingAddress: Address | undefined,
  defaultBillingAddress: Address | undefined
) {
  return (
    <>
      <h3 className={`${styles['block-heading']}`}>Address Book</h3>
      <FlexContainer style={{ justifyContent: 'space-between', flexWrap: 'wrap' }}>
        <FlexContainer style={{ gap: '1rem', minWidth: '240px' }}>
          <FlexContainer style={{ flexDirection: 'column' }}>
            <h4>Default Shipping Address</h4>
            <UserAddressInfo address={defaultShippingAddress} />
          </FlexContainer>
        </FlexContainer>

        <FlexContainer style={{ gap: '1rem', minWidth: '240px' }}>
          <FlexContainer style={{ flexDirection: 'column' }}>
            <h4>Default Billing Address</h4>
            <UserAddressInfo address={defaultBillingAddress} />
          </FlexContainer>
        </FlexContainer>
      </FlexContainer>
    </>
  );
}

function renderAddresses(
  addressType: AddressType,
  addressesArray: Address[],
  defaultAddress: Address | undefined,
  handleEditAddress: (address: Address) => void,
  handleSetDefaultAddress: (addressId: string, addressType: AddressType) => void,
  handleDeleteAddress: (addressId: string, addressType: AddressType) => void,
  handleClearDefaultAddress: (addressType: AddressType) => void
) {
  return (
    <FlexContainer style={{ gap: '25%', flexWrap: 'wrap', flexDirection: 'column' }}>
      {addressesArray.map((address) => {
        return (
          <div className={`${styles.address}`} key={address.id}>
            <h4>{address.additionalAddressInfo || address.streetName}</h4>
            <FlexContainer style={{ justifyContent: 'space-between', flexWrap: 'wrap' }}>
              <UserAddressInfo address={address} />

              <FlexContainer style={{ flexDirection: 'column', minWidth: '240px' }}>
                {(defaultAddress === address && (
                  <span className={`${styles.defaultAddress}`}>
                    Default {addressType} address{' '}
                    <button
                      type="button"
                      className={`${styles.fakeLink}`}
                      onClick={() => handleClearDefaultAddress(addressType)}
                    >
                      clear
                    </button>
                  </span>
                )) || (
                  <button
                    type="button"
                    className={`${styles.fakeLink}`}
                    onClick={() => handleSetDefaultAddress(address.id!, addressType)}
                  >
                    Set as default
                  </button>
                )}
                <button type="button" className={`${styles.fakeLink}`} onClick={() => handleEditAddress(address)}>
                  Edit address
                </button>

                <button
                  type="button"
                  className={`${styles.fakeLink}`}
                  onClick={() => handleDeleteAddress(address.id!, addressType)}
                >
                  Delete address
                </button>
              </FlexContainer>
            </FlexContainer>
          </div>
        );
      })}
    </FlexContainer>
  );
}

export default function UserAddresses() {
  const { customer } = useAppSelector((state) => state.customerReducer);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [selectedAddAddress, setSelectedAddAddress] = useState<AddressType | null>(null);
  const { deleteAddress, clearDefaultAddress, setDefaultAddress } = useManageCustomer();

  if (!customer) {
    return <h2>No customer</h2>;
  }

  const shippingAddresses: Address[] = [];
  const billingAddresses: Address[] = [];

  customer.addresses.forEach((address) => {
    if (customer.billingAddressIds!.includes(address.id!)) {
      billingAddresses.push(address);
    } else {
      shippingAddresses.push(address);
    }
  });

  const handleEditAddress = (address: Address) => {
    setSelectedAddress(address);
    setIsModalOpen(true);
  };

  const handleAddAddress = (addressType: AddressType) => {
    setSelectedAddAddress(addressType);
    setIsModalOpen(true);
  };

  const handleSetDefaultAddress = (addressId: string, addressType: AddressType) => {
    setDefaultAddress(addressId, addressType).then((data) => {
      if (data.type.includes('fulfilled')) {
        toaster.showSuccess('Address is set as default successfully!');
      }
    });
  };

  const handleDeleteAddress = (addressId: string, addressType: AddressType) => {
    deleteAddress(addressId, addressType)
      .then((data) => {
        if (data.type.includes('fulfilled')) {
          toaster.showSuccess('Address deleted!');
        }
      })
      .catch((error) => toaster.showError(error.message));
  };

  const handleClearDefaultAddress = (addressType: AddressType) => {
    clearDefaultAddress(addressType).then((data) => {
      if (data.type.includes('fulfilled')) {
        toaster.showSuccess('Default address cleared!');
      }
    });
  };

  const handleModalClose = () => {
    setSelectedAddress(null);
    setSelectedAddAddress(null);

    setIsModalOpen(false);
  };

  const defaultShippingAddress = customer.addresses.find((address) => address.id === customer.defaultShippingAddressId);
  const defaultBillingAddress = customer.addresses.find((address) => address.id === customer.defaultBillingAddressId);

  return (
    <>
      <FlexContainer style={{ flexDirection: 'column', flex: '1 1 60%' }}>
        {DefaultAddresses(defaultShippingAddress, defaultBillingAddress)}

        <FlexContainer style={{ flexDirection: 'column' }}>
          <h3 className={`${styles['block-heading']}`}>Shipping addresses</h3>
          <button type="button" className={`${styles.fakeLink}`} onClick={() => handleAddAddress(AddressType.Shipping)}>
            Add new shipping address
          </button>

          {(shippingAddresses.length &&
            renderAddresses(
              AddressType.Shipping,
              shippingAddresses,
              defaultShippingAddress,
              handleEditAddress,
              handleSetDefaultAddress,
              handleDeleteAddress,
              handleClearDefaultAddress
            )) || <p>You dont have shipping addresses</p>}

          <h3 className={`${styles['block-heading']}`}>Billing addresses</h3>
          <button type="button" className={`${styles.fakeLink}`} onClick={() => handleAddAddress(AddressType.Billing)}>
            Add new billing address
          </button>

          {(billingAddresses.length &&
            renderAddresses(
              AddressType.Billing,
              billingAddresses,
              defaultBillingAddress,
              handleEditAddress,
              handleSetDefaultAddress,
              handleDeleteAddress,
              handleClearDefaultAddress
            )) || <p>You dont have billing addresses</p>}
        </FlexContainer>
      </FlexContainer>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleModalClose}
        appElement={document.getElementById('root') || undefined}
        closeTimeoutMS={200}
      >
        <FlexContainer style={{ flexDirection: 'column', gap: '20px' }}>
          {selectedAddress && (
            <EditAddressForm
              address={selectedAddress}
              onSave={(isUpdated) => {
                if (isUpdated) {
                  handleModalClose();
                }
              }}
            />
          )}

          {selectedAddAddress && (
            <CreateAddressForm
              addressType={selectedAddAddress}
              onSave={(isSuccess) => {
                if (isSuccess) {
                  handleModalClose();
                }
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
