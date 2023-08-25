import { NavLink, Outlet } from 'react-router-dom';
import ColoredContainer from '../../components/containers/ColoredContainer';
import FlexContainer from '../../components/containers/FlexContainer';
import Wrapper from '../../components/wrapper/Wrapper';
import { useAppSelector } from '../../hooks/redux';

function UserProfile() {
  const { customer } = useAppSelector((state) => state.customerReducer);
  const userAccountInfo = useAppSelector((state) => state.authReducer);

  const { authStatus, error } = userAccountInfo;

  if (authStatus === 'AnonymousFlow') {
    return <div>Hello, anonymous</div>;
  }

  if (customer) {
    return (
      <Wrapper>
        <h2>Hello, {customer.firstName}</h2>
        <FlexContainer style={{ gap: '10%', flexWrap: 'wrap' }}>
          <ColoredContainer>
            <FlexContainer style={{ flexDirection: 'column', gap: '2rem' }}>
              <NavLink to="">Account Dashboard</NavLink>
              <NavLink to="address">Address Book</NavLink>
            </FlexContainer>
          </ColoredContainer>

          <Outlet />
        </FlexContainer>
      </Wrapper>
    );
  }

  return <div>Error: {error}</div>;
}

export default UserProfile;
