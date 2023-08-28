import { Formik, Form } from 'formik';

import { Address, MyCustomerUpdate, Customer } from '@commercetools/platform-sdk';
import CommonInput from '../inputs/CommonInput';
import { AddressValidaiton } from '../CommonValidation';
import Button from '../../buttons/Buttons';
import FlexContainer from '../../containers/FlexContainer';
import CountryInput from '../inputs/CountryInput';
import { useAppDispatch } from '../../../hooks/redux';
import { updateCustomerData } from '../../../reducers/ActionCreators';
import { AddressType } from '../../../pages/user/adresses/types';

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
  const dispatch = useAppDispatch();

  const initialValues = {
    additionalAddressInfo: '',
    city: '',
    streetName: '',
    postalCode: '',
    country: 'US',
  };

  const handleSubmit = (address: Address) => {
    const newAddressUpdate: MyCustomerUpdate = { version, actions: [{ action: 'addAddress', address }] };

    dispatch(updateCustomerData(newAddressUpdate)).then((payloadAction) => {
      if (payloadAction.type.includes('rejected')) {
        onSave(false);
        // show error on the form
        return;
      }
      if (!isCustomer(payloadAction.payload)) {
        onSave(false);
        // show error on the form - is Error?
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
          // show error on the form
        } else {
          onSave(true);
        }
      });
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
