import { Formik, Form } from 'formik';

import { Address } from '@commercetools/platform-sdk';
import { useState } from 'react';
import CommonInput from '../inputs/CommonInput';
import { AddressValidaiton } from '../CommonValidation';
import Button from '../../buttons/Buttons';
import FlexContainer from '../../containers/FlexContainer';
import CountryInput from '../inputs/CountryInput';
import toaster from '../../../services/toaster';
import useManageCustomer from '../../../hooks/useManageCustomer';
import { AddressType } from '../../../models/customerTypes';

interface AddAddressFormProps {
  addressType: AddressType;
  onSave: (isSuccess: boolean) => void;
}

const validationSchema = AddressValidaiton;

export default function CreateAddressForm({ addressType, onSave }: AddAddressFormProps) {
  const [isSubmitting, setSubmitting] = useState(false);
  const { createNewAddress } = useManageCustomer();

  const initialValues = {
    additionalAddressInfo: '',
    city: '',
    streetName: '',
    postalCode: '',
    country: 'US',
  };

  const handleSubmit = (address: Address) => {
    setSubmitting(true);

    createNewAddress(addressType, address)
      .then((data) => {
        if (data.type.includes('fulfilled')) {
          toaster.showSuccess('Address added successfully!');
          onSave(true);
        } else onSave(false);
      })
      .catch(() => onSave(false))
      .finally(() => setSubmitting(false));
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
