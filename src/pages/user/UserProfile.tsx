import { NavLink } from 'react-router-dom';
import UserPageLayout from './UserPageLayout';
import styles from './UserProfile.module.scss';
import { useAppDispatch } from '../../hooks/redux';
import { authActions } from '../../reducers/AuthSlice';
import Button from '../../components/buttons/Buttons';
import { customerActions } from '../../reducers/CustomerSlice';
import { cartActions } from '../../reducers/CartSlice';

function UserProfile() {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(authActions.logout());
    dispatch(customerActions.clearCustomerData());
    dispatch(cartActions.clearCart());
    localStorage.removeItem(import.meta.env.VITE_LOCALSTORAGE_KEY_CUSTOMER_TOKENS);
  };

  return (
    <UserPageLayout>
      <div className={styles.userPage__menu}>
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
      </div>
    </UserPageLayout>
  );
}

export default UserProfile;
