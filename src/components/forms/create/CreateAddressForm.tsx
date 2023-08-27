import { Formik, Form } from 'formik';

import { Address } from '@commercetools/platform-sdk';
import CommonInput from '../inputs/CommonInput';
import { AddressValidaiton } from '../CommonValidation';
import Button from '../../buttons/Buttons';
import FlexContainer from '../../containers/FlexContainer';
import CountryInput from '../inputs/CountryInput';

interface AddAddressFormProps {
  addressType: 'Billing' | 'Shipping';
  onSave: (isSuccess: boolean) => void;
}

const validationSchema = AddressValidaiton;

export default function CreateAddressForm({ addressType, onSave }: AddAddressFormProps) {
  const initialValues = {
    city: '',
    streetName: '',
    postalCode: '',
    country: 'US',
  };

  const handleSubmit = (values: Address) => {
    // Add logic to add address
    if (addressType === 'Billing') {
      // Billing
    } else {
      // Shipping
    }
    alert(values);

    const isSuccess = true;
    onSave(isSuccess);
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
            innerText="Add address"
            styling="primary"
            variant="default"
            addedClass=""
            style={{ margin: 'auto' }}
          />
        </Form>
      </Formik>
    </FlexContainer>
  );
}
