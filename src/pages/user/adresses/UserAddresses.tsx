import Modal from 'react-modal';
import { useState } from 'react';

import { Address, MyCustomerUpdate } from '@commercetools/platform-sdk';

import FlexContainer from '../../../components/containers/FlexContainer';
import UserAddressInfo from '../../../components/userInfo/adress/UserAddress';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';

import styles from './UserAddresses.module.scss';
import EditAddressForm from '../../../components/forms/edit/EditAddressForm';
import Button from '../../../components/buttons/Buttons';
import CreateAddressForm from '../../../components/forms/create/CreateAddressForm';
import { updateCustomerData } from '../../../reducers/ActionCreators/CustomerActions';
import toaster from '../../../services/toaster';
import { AddressType } from './types';

export function DefaultAddresses(
  defaultShippingAddress: Address | undefined,
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
          </FlexContainer>
        </FlexContainer>

        <FlexContainer style={{ gap: '1rem' }}>
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
  handleSetDefaultAddress: (address: Address, addressType: AddressType) => void,
  handleDeleteAddress: (address: Address, addressType: AddressType) => void,
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

              <FlexContainer style={{ flexDirection: 'column' }}>
                {(defaultAddress === address && (
                  <p>
                    <span className={`${styles.defaultAddress}`}>Default {addressType} address</span>
                    <button
                      type="button"
                      className={`${styles.fakeLink}`}
                      onClick={() => handleClearDefaultAddress(addressType)}
                    >
                      clear
                    </button>
                  </p>
                )) || (
                  <button
                    type="button"
                    className={`${styles.fakeLink}`}
                    onClick={() => handleSetDefaultAddress(address, addressType)}
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
                  onClick={() => handleDeleteAddress(address, addressType)}
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
  const dispatch = useAppDispatch();

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

  const handleSetDefaultAddress = (address: Address, addressType: AddressType) => {
    const setDefaultAddressUpdate: MyCustomerUpdate = {
      version: customer.version,
      actions: [],
    };
    if (addressType === AddressType.Shipping) {
      setDefaultAddressUpdate.actions.push({ action: 'setDefaultShippingAddress', addressId: address.id });
    } else {
      setDefaultAddressUpdate.actions.push({ action: 'setDefaultBillingAddress', addressId: address.id });
    }
    dispatch(updateCustomerData(setDefaultAddressUpdate)).then((payloadAction) => {
      if (payloadAction.type.includes('rejected')) {
        toaster.showError('Something went wrong.');
        return;
      }
      toaster.showSuccess('Address is set as default successfully!');
    });
  };

  const handleDeleteAddress = (address: Address, addressType: AddressType) => {
    if (addressType === AddressType.Shipping) {
      if (customer.shippingAddressIds && customer.shippingAddressIds?.length < 2) {
        toaster.showError('This is the last shipping address. Do not delete');
        return;
      }
    } else if (customer.billingAddressIds && customer.billingAddressIds.length < 2) {
      toaster.showError('This is the last billing address. Do not delete');
      return;
    }

    const deleteAddressUpdate: MyCustomerUpdate = {
      version: customer.version,
      actions: [{ action: 'removeAddress', addressId: address.id }],
    };

    dispatch(updateCustomerData(deleteAddressUpdate)).then((payloadAction) => {
      if (payloadAction.type.includes('rejected')) {
        toaster.showError('Something went wrong.');

        return;
      }
      toaster.showSuccess('Address deleted!');
    });
  };

  const handleClearDefaultAddress = (addressType: AddressType) => {
    const clearDefaultAddressUpdate: MyCustomerUpdate = {
      version: customer.version,
      actions: [],
    };
    if (addressType === AddressType.Shipping) {
      clearDefaultAddressUpdate.actions.push({ action: 'setDefaultShippingAddress', addressId: undefined });
    } else {
      clearDefaultAddressUpdate.actions.push({ action: 'setDefaultBillingAddress', addressId: undefined });
    }

    dispatch(updateCustomerData(clearDefaultAddressUpdate)).then((payloadAction) => {
      if (payloadAction.type.includes('rejected')) {
        toaster.showError('Something went wrong.');

        return;
      }
      toaster.showSuccess('Default address cleared!');
    });
  };

  const handleModalClose = () => {
    setSelectedAddress(null);
    setSelectedAddAddress(null);

    setIsModalOpen(false);
  };

  const hasBillingAddress = !!customer.billingAddressIds?.length;

  const defaultShippingAddress = customer.addresses.find((address) => address.id === customer.defaultShippingAddressId);
  const defaultBillingAddress = hasBillingAddress
    ? customer.addresses.find((address) => address.id === customer.defaultBillingAddressId)
    : undefined;

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
              version={customer.version}
              onSave={(isUpdated) => {
                if (isUpdated) {
                  toaster.showSuccess('Address updated successfully!');
                  handleModalClose();
                }
              }}
            />
          )}

          {selectedAddAddress && (
            <CreateAddressForm
              addressType={selectedAddAddress}
              version={customer.version}
              onSave={(isSuccess) => {
                if (isSuccess) {
                  toaster.showSuccess('Address added successfully!');
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
