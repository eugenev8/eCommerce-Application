import { NavLink } from 'react-router-dom';
import styles from './MainPage.module.scss';

import { useAppDispatch } from '../../hooks/redux';
import { createCustomerCart, getCustomerCart } from '../../reducers/ActionCreators';

function MainPage() {
  const dispatch = useAppDispatch();

  function handleCreateCart() {
    dispatch(createCustomerCart('1234504'));
  }

  function handleGetActiveCart() {
    dispatch(getCustomerCart());
  }

  return (
    <div className={`${styles.mainPage}`}>
      <h1>Main page</h1>
      <NavLink to="/">Main (you are here)</NavLink>
      <br />
      <NavLink to="/login">Login</NavLink>
      <br />
      <NavLink to="/register">Sign up</NavLink>
      <br />
      <br />

      <button type="button" onClick={handleCreateCart}>
        Create
      </button>

      <br />
      <br />
      <button type="button" onClick={handleGetActiveCart}>
        Get Cart
      </button>
    </div>
  );
}

export default MainPage;
