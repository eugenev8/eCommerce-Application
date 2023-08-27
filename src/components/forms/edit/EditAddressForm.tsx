import { Formik, Form } from 'formik';

import { Address, MyCustomerUpdate } from '@commercetools/platform-sdk';
import CommonInput from '../inputs/CommonInput';
import { AddressValidaiton } from '../CommonValidation';
import Button from '../../buttons/Buttons';
import FlexContainer from '../../containers/FlexContainer';
import CountryInput from '../inputs/CountryInput';
import { useAppDispatch } from '../../../hooks/redux';
import { updateCustomerData } from '../../../reducers/ActionCreators';

interface EditAddressFormProps {
  address: Address;
  version: number;
  onSave: (isUpdated: boolean) => void;
}

const validationSchema = AddressValidaiton;

export default function EditAddressForm({ address, version, onSave }: EditAddressFormProps) {
  const dispatch = useAppDispatch();
  const initialValues = {
    city: address.city,
    streetName: address.streetName,
    postalCode: address.postalCode,
    country: address.country,
  };

  const handleSubmit = (values: Address) => {
    const changeAddressUpdate: MyCustomerUpdate = {
      version,
      actions: [{ action: 'changeAddress', address: values, addressId: address.id }],
    };

    dispatch(updateCustomerData(changeAddressUpdate)).then((payloadAction) => {
      if (payloadAction.type.includes('rejected')) {
        // show error on the form
        onSave(false);
      } else {
        onSave(true);
      }
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
