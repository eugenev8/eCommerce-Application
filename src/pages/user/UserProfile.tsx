import { NavLink } from 'react-router-dom';
import UserPageLayout from './UserPageLayout';
import FlexContainer from '../../components/containers/FlexContainer';
import { useAppDispatch } from '../../hooks/redux';
import { authSlice } from '../../reducers/AuthSlice';
import { customerSlice } from '../../reducers/CustomerSlice';
import Button from '../../components/buttons/Buttons';

function UserProfile() {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(authSlice.actions.logout());
    dispatch(customerSlice.actions.clearCustomerData());
    localStorage.removeItem(import.meta.env.VITE_LOCALSTORAGE_KEY_CUSTOMER_TOKENS);
  };

  return (
    <UserPageLayout>
      <FlexContainer style={{ flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
        <NavLink to="">Account info</NavLink>
        <NavLink to="address">Address Book</NavLink>
        <Button
          onClick={handleLogout}
          innerText="Logout"
          styling="secondary"
          type="button"
          addedClass=""
          variant="default"
        />
      </FlexContainer>
    </UserPageLayout>
  );
}

export default UserProfile;
