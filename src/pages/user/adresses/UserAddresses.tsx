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
import { updateCustomerData } from '../../../reducers/ActionCreators';
import toaster from '../../../services/toaster';

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

function renderShippingAddresses(
  shippingAddressesArray: Address[],
  defaultShippingAddress: Address | undefined,
  handleEditAddress: (address: Address) => void,
  handleSetDefautAddress: (address: Address) => void,
  handleDeleteAddress: (address: Address) => void
) {
  return (
    <FlexContainer style={{ gap: '25%', flexWrap: 'wrap', flexDirection: 'column' }}>
      {shippingAddressesArray.map((address) => {
        return (
          <div className={`${styles.address}`} key={address.id}>
            <h4>{address.streetName}</h4>
            <FlexContainer style={{ justifyContent: 'space-between', flexWrap: 'wrap' }}>
              <UserAddressInfo address={address} />

              <FlexContainer style={{ flexDirection: 'column' }}>
                {(defaultShippingAddress === address && (
                  <p>
                    <span className={`${styles.defaultAddress}`}>Default shipping address</span>
                  </p>
                )) || (
                  <button
                    type="button"
                    className={`${styles.fakeLink}`}
                    onClick={() => handleSetDefautAddress(address)}
                  >
                    Set as default
                  </button>
                )}

                <button type="button" className={`${styles.fakeLink}`} onClick={() => handleEditAddress(address)}>
                  Edit address
                </button>

                <button type="button" className={`${styles.fakeLink}`} onClick={() => handleDeleteAddress(address)}>
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

function renderBillingAddresses(
  billingAddressesArray: Address[],
  defaultBillingAddress: Address | undefined,
  handleEditAddress: (address: Address) => void,
  handleSetDefautAddress: (address: Address) => void,
  handleDeleteAddress: (address: Address) => void
) {
  return (
    <FlexContainer style={{ gap: '25%', flexWrap: 'wrap', flexDirection: 'column' }}>
      {billingAddressesArray.map((address) => {
        return (
          <div className={`${styles.address}`} key={address.id}>
            <h4>{address.streetName}</h4>
            <FlexContainer style={{ justifyContent: 'space-between', flexWrap: 'wrap' }}>
              <UserAddressInfo address={address} />

              <FlexContainer style={{ flexDirection: 'column' }}>
                {(defaultBillingAddress === address && (
                  <p>
                    <span className={`${styles.defaultAddress}`}>Default billing address</span>
                  </p>
                )) || (
                  <button
                    type="button"
                    className={`${styles.fakeLink}`}
                    onClick={() => handleSetDefautAddress(address)}
                  >
                    Set as default
                  </button>
                )}
                <button type="button" className={`${styles.fakeLink}`} onClick={() => handleEditAddress(address)}>
                  Edit address
                </button>

                <button type="button" className={`${styles.fakeLink}`} onClick={() => handleDeleteAddress(address)}>
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
  const [selectedAddAddress, setSelectedAddAddress] = useState<'Shipping' | 'Billing' | null>(null);
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

  const handleAddAddress = (addressType: 'Shipping' | 'Billing') => {
    setSelectedAddAddress(addressType);
    setIsModalOpen(true);
  };

  const handleSetDefaultAddress = (address: Address) => {
    // Need to set as default
    console.log(address);
  };

  const handleDeleteAddress = (address: Address) => {
    const deleteAddressUpdate: MyCustomerUpdate = {
      version: customer.version,
      actions: [{ action: 'removeAddress', addressId: address.id }],
    };

    dispatch(updateCustomerData(deleteAddressUpdate)).then((payloadAction) => {
      if (payloadAction.type.includes('rejected')) {
        // show error on the form
        return;
      }
      toaster.showSuccess('Address deleted!');
    });
  };

  const handleModalClose = () => {
    setSelectedAddress(null);
    setSelectedAddAddress(null);

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
        {DefaultAddresses(defaultShippingAddress, defaultBillingAddress)}

        <FlexContainer style={{ flexDirection: 'column' }}>
          <h3 className={`${styles['block-heading']}`}>Shipping addresses</h3>
          <button type="button" className={`${styles.fakeLink}`} onClick={() => handleAddAddress('Shipping')}>
            Add new shipping address
          </button>

          {(shippingAddresses.length &&
            renderShippingAddresses(
              shippingAddresses,
              defaultShippingAddress,
              handleEditAddress,
              handleSetDefaultAddress,
              handleDeleteAddress
            )) || <p>You dont have shipping addresses</p>}

          <h3 className={`${styles['block-heading']}`}>Billing addresses</h3>
          <button type="button" className={`${styles.fakeLink}`} onClick={() => handleAddAddress('Billing')}>
            Add new billing address
          </button>

          {(billingAddresses.length &&
            renderBillingAddresses(
              billingAddresses,
              defaultBillingAddress,
              handleEditAddress,
              handleSetDefaultAddress,
              handleDeleteAddress
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
