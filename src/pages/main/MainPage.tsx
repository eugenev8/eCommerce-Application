import { NavLink } from 'react-router-dom';
import styles from './MainPage.module.scss';

function MainPage() {
  return (
    <div className={`${styles.mainPage}`}>
      <h1>Main page</h1>
      <NavLink to="/">Main (you are here)</NavLink>
      <br />
      <NavLink to="/login">Login</NavLink>
      <br />
      <NavLink to="/register">Sign up</NavLink>
    </div>
  );
}

export default MainPage;
