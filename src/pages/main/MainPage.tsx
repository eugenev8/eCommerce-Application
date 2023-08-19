import { useAppDispatch } from '../../hooks/redux';
import { authSlice } from '../../reducers/authSlice';
import './MainPage.css';

function MainPage() {
  const dispatch = useAppDispatch();

  function handleLogout() {
    dispatch(authSlice.actions.logout());
    localStorage.removeItem(import.meta.env.VITE_LOCALSTORAGE_KEY_CUSTOMER_TOKEN);
  }
  return (
    <div id="MainPage">
      <h1>Main page</h1>
      <button type="button" onClick={() => handleLogout()}>
        Logout
      </button>
    </div>
  );
}

export default MainPage;
