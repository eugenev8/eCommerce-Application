import { useAppSelector } from '../../hooks/redux';

interface Address {
  id: string;
  streetName: string;
  postalCode: string;
  city: string;
  country: string;
}

interface User {
  id: string;
  version: number;
  versionModifiedAt: string;
  lastMessageSequenceNumber: number;
  createdAt: string;
  lastModifiedAt: string;
  lastModifiedBy: {
    clientId: string;
    isPlatformClient: boolean;
  };
  createdBy: {
    clientId: string;
    isPlatformClient: boolean;
  };
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  password: string;
  addresses: Address[];
  defaultShippingAddressId: string;
  shippingAddressIds: string[];
  billingAddressIds: string[];
  isEmailVerified: boolean;
  stores: unknown[];
  authenticationMode: string;
}

function UserProfile() {
  const userInfo: User = {
    id: '0e150d79-cea8-407e-9b07-b20dc68819ef',
    version: 1,
    versionModifiedAt: '2023-08-24T11:54:51.172Z',
    lastMessageSequenceNumber: 1,
    createdAt: '2023-08-24T11:54:51.172Z',
    lastModifiedAt: '2023-08-24T11:54:51.172Z',
    lastModifiedBy: {
      clientId: 'q6wpq4NpUNJjS2ztD5a_-DSC',
      isPlatformClient: false,
    },
    createdBy: {
      clientId: 'q6wpq4NpUNJjS2ztD5a_-DSC',
      isPlatformClient: false,
    },
    email: 'dsdsa@sda.com',
    firstName: 'Loss',
    lastName: 'Soor',
    dateOfBirth: '1995-05-15',
    password: '****Kh0=',
    addresses: [
      {
        id: '-O-hI486',
        streetName: 'Ship 3',
        postalCode: '12354',
        city: 'Shork',
        country: 'US',
      },
      {
        id: 'nld8NwTA',
        streetName: 'Bill 2',
        postalCode: '32154',
        city: 'Bork',
        country: 'US',
      },
    ],
    defaultShippingAddressId: '-O-hI486',
    shippingAddressIds: ['-O-hI486'],
    billingAddressIds: ['nld8NwTA'],
    isEmailVerified: false,
    stores: [],
    authenticationMode: 'Password',
  };

  const defaultShippingAddress = userInfo.addresses.find((adress) => adress.id === userInfo.defaultShippingAddressId);
  const defaultBillingAddress = userInfo.addresses.find((adress) => adress.id === userInfo.billingAddressIds[0]);

  const userAccountInfo = useAppSelector((state) => state.authReducer);

  const { isLoading, authStatus, error } = userAccountInfo;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (authStatus === 'AnonymousFlow') {
    return <div>Hello, anonymous</div>;
  }

  if (authStatus === 'TokenFlow') {
    return (
      <div>
        <h3>Hello, {userInfo.firstName}</h3>
        <h4>Account information</h4>
        <p>
          {userInfo.firstName} {userInfo.lastName}
        </p>
        <p>{userInfo.email}</p>
        <h4>Address book</h4>
        <h5>Default Shipping Address</h5>
        <p>{defaultShippingAddress?.streetName || 'None'}</p>
        <p>{defaultShippingAddress?.city || 'None'}</p>
        <p>{defaultShippingAddress?.country || 'None'}</p>
        <p>{defaultShippingAddress?.postalCode || 'None'}</p>
        <h5>Default Billing Address</h5>
        <p>{defaultBillingAddress?.streetName || 'None'}</p>
        <p>{defaultBillingAddress?.city || 'None'}</p>
        <p>{defaultBillingAddress?.country || 'None'}</p>
        <p>{defaultBillingAddress?.postalCode || 'None'}</p>
      </div>
    );
  }

  return <div>Error: {error}</div>;
}

export default UserProfile;
