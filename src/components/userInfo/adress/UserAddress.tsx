import { Address } from '@commercetools/platform-sdk';
import FlexContainer from '../../containers/FlexContainer';

interface AddressContactInfoProps {
  address: Address | undefined;
}

export default function UserAddressInfo({ address }: AddressContactInfoProps) {
  if (!address) {
    return <p>You have not set this address.</p>;
  }

  return (
    <FlexContainer style={{ flexDirection: 'column' }}>
      <div>
        <p>{address.streetName}</p>
        <p>
          {address.city}, {address.postalCode}
        </p>
        <p>{address.country}</p>
      </div>
    </FlexContainer>
  );
}
