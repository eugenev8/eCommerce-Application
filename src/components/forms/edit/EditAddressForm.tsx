import { Formik, Form } from 'formik';

import { Address } from '@commercetools/platform-sdk';
import CommonInput from '../inputs/CommonInput';
import { AddressValidaiton } from '../CommonValidation';
import Button from '../../buttons/Buttons';
import FlexContainer from '../../containers/FlexContainer';
import CountryInput from '../inputs/CountryInput';

interface EditAddressFormProps {
  address: Address;
  onSave: (updatedAddress: Address) => void;
}

const validationSchema = AddressValidaiton;

export default function EditAddressForm({ address, onSave }: EditAddressFormProps) {
  const initialValues = {
    city: address.city,
    streetName: address.streetName,
    postalCode: address.postalCode,
    country: address.country,
  };

  const handleSubmit = (values: Address) => {
    onSave(values);
  };

  return (
    <FlexContainer
      style={{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
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
            innerText="Update address"
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
