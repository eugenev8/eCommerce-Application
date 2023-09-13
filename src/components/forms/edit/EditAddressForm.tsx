import { Formik, Form } from 'formik';

import { Address, MyCustomerUpdate } from '@commercetools/platform-sdk';
import { useState } from 'react';
import CommonInput from '../inputs/CommonInput';
import { AddressValidaiton } from '../CommonValidation';
import Button from '../../buttons/Buttons';
import FlexContainer from '../../containers/FlexContainer';
import CountryInput from '../inputs/CountryInput';
import { useAppDispatch } from '../../../hooks/redux';
import { updateCustomerData } from '../../../reducers/ActionCreators/Customer';
import toaster from '../../../services/toaster';

interface EditAddressFormProps {
  address: Address;
  version: number;
  onSave: (isUpdated: boolean) => void;
}

const validationSchema = AddressValidaiton;

export default function EditAddressForm({ address, version, onSave }: EditAddressFormProps) {
  const [isSubmitting, setSubmitting] = useState(false);

  const dispatch = useAppDispatch();

  const initialValues = {
    additionalAddressInfo: address.additionalAddressInfo,
    city: address.city,
    streetName: address.streetName,
    postalCode: address.postalCode,
    country: address.country,
  };

  const handleSubmit = (values: Address) => {
    setSubmitting(true);

    const changeAddressUpdate: MyCustomerUpdate = {
      version,
      actions: [{ action: 'changeAddress', address: values, addressId: address.id }],
    };

    dispatch(updateCustomerData(changeAddressUpdate))
      .then((payloadAction) => {
        if (payloadAction.type.includes('rejected')) {
          toaster.showError('Something went wrong!');
          onSave(false);
        } else {
          onSave(true);
        }
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
      <h4>Edit address</h4>
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
            innerText={isSubmitting ? 'Updating...' : 'Update address'}
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
