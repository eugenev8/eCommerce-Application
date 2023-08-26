import { NavLink } from 'react-router-dom';
import UserPageLayout from './UserPageLayout';
import FlexContainer from '../../components/containers/FlexContainer';

function UserProfile() {
  return (
    <UserPageLayout>
      <FlexContainer style={{ flexDirection: 'column', gap: '2rem' }}>
        <NavLink to="">Account Dashboard</NavLink>
        <NavLink to="address">Address Book</NavLink>
        <NavLink to="user">Account info</NavLink>
      </FlexContainer>
    </UserPageLayout>
  );
}

export default UserProfile;
