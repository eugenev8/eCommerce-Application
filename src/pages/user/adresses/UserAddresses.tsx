import FlexContainer from '../../../components/containers/FlexContainer';
import UserAddressInfo from '../../../components/userInfo/adress/UserAddress';
import { useAppSelector } from '../../../hooks/redux';

import styles from './UserAddresses.module.scss';

export default function UserAddresses() {
  const { customer } = useAppSelector((state) => state.customerReducer);

  if (!customer) {
    return <h2>No customer</h2>;
  }

  const hasBillingAddress = !!customer.billingAddressIds?.length;

  const defaultShippingAddress = customer.addresses.find((adress) => adress.id === customer.defaultShippingAddressId);
  const defaultBillingAddress = hasBillingAddress
    ? customer.addresses.find((adress) => adress.id === customer.defaultBillingAddressId)
    : undefined;

  return (
    <FlexContainer style={{ flexDirection: 'column', flex: '1 1 60%' }}>
      <h3 className={`${styles['block-heading']}`}>Address Book</h3>

      <FlexContainer style={{ gap: '25%', flexWrap: 'wrap' }}>
        <FlexContainer style={{ gap: '1rem' }}>
          <FlexContainer style={{ flexDirection: 'column' }}>
            <h4>Default Shipping Address</h4>
            <UserAddressInfo address={defaultShippingAddress} />
            <p className={`${styles.fakeLink}`}>Edit address</p>
          </FlexContainer>
        </FlexContainer>

        <FlexContainer style={{ gap: '1rem' }}>
          <FlexContainer style={{ flexDirection: 'column' }}>
            <h4>Default Billing Address</h4>
            <UserAddressInfo address={defaultBillingAddress} />
            <p className={`${styles.fakeLink}`}>Edit address</p>
          </FlexContainer>
        </FlexContainer>
      </FlexContainer>
    </FlexContainer>
  );
}
