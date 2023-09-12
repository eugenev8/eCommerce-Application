import { Formik, Form } from 'formik';

import { Address, MyCustomerUpdate, Customer } from '@commercetools/platform-sdk';
import { useState } from 'react';
import CommonInput from '../inputs/CommonInput';
import { AddressValidaiton } from '../CommonValidation';
import Button from '../../buttons/Buttons';
import FlexContainer from '../../containers/FlexContainer';
import CountryInput from '../inputs/CountryInput';
import { useAppDispatch } from '../../../hooks/redux';
import { updateCustomerData } from '../../../reducers/ActionCreators/CustomerActions';
import { AddressType } from '../../../pages/user/adresses/types';
import toaster from '../../../services/toaster';

interface AddAddressFormProps {
  addressType: AddressType;
  version: number;
  onSave: (isSuccess: boolean) => void;
}

const validationSchema = AddressValidaiton;

function isCustomer(value: string | Customer | undefined): value is Customer {
  return !!(value && typeof value !== 'string');
}

export default function CreateAddressForm({ addressType, onSave, version }: AddAddressFormProps) {
  const [isSubmitting, setSubmitting] = useState(false);

  const dispatch = useAppDispatch();

  const initialValues = {
    additionalAddressInfo: '',
    city: '',
    streetName: '',
    postalCode: '',
    country: 'US',
  };

  const handleSubmit = (address: Address) => {
    setSubmitting(true);
    const newAddressUpdate: MyCustomerUpdate = { version, actions: [{ action: 'addAddress', address }] };

    dispatch(updateCustomerData(newAddressUpdate))
      .then((payloadAction) => {
        if (payloadAction.type.includes('rejected')) {
          onSave(false);
          toaster.showError('Something went wrong!');
          return;
        }
        if (!isCustomer(payloadAction.payload)) {
          onSave(false);
          toaster.showError('Something went wrong!');
          return;
        }

        const addedAddress = payloadAction.payload.addresses.at(-1);

        const setAddressTypeUpdate: MyCustomerUpdate = {
          version: payloadAction.payload.version,
          actions: [],
        };

        if (addressType === AddressType.Billing) {
          setAddressTypeUpdate.actions.push({ action: 'addBillingAddressId', addressId: addedAddress?.id });
        } else {
          setAddressTypeUpdate.actions.push({ action: 'addShippingAddressId', addressId: addedAddress?.id });
        }

        dispatch(updateCustomerData(setAddressTypeUpdate)).then((newPayloadAction) => {
          if (newPayloadAction.type.includes('rejected')) {
            onSave(false);
            toaster.showError('Something went wrong!');
          } else {
            onSave(true);
          }
        });
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <FlexContainer
      style={{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <h4>Add new {addressType} address</h4>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        validateOnChange
        onSubmit={handleSubmit}
      >
        <Form>
          <CommonInput
            id="additionalAddressInfo"
            labelText="Address name"
            name="additionalAddressInfo"
            placeholder="Type address name"
            type="text"
          />
          <CommonInput id="city" labelText="City" name="city" placeholder="Type your city" type="text" />
          <CommonInput
            id="streetName"
            labelText="Street"
            name="streetName"
            placeholder="Type your street"
            type="text"
          />
          <CommonInput
            id="postalCode"
            labelText="Postal code"
            name="postalCode"
            placeholder="Type your postal code"
            type="text"
          />
          <CountryInput id="country" labelText="Country" name="country" placeholder="Type your country" />

          <Button
            type="submit"
            innerText={isSubmitting ? 'Submitting...' : 'Add address'}
            styling="primary"
            variant="default"
            addedClass=""
            style={{ margin: 'auto' }}
            disabled={isSubmitting}
          />
        </Form>
      </Formik>
    </FlexContainer>
  );
}
