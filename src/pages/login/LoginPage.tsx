import { NavLink } from 'react-router-dom';
import LoginForm from '../../components/forms/login/LoginForm';
import useRedirectIfLoggedIn from '../../hooks/useRedirectIfLoggedIn';

import './LoginPage.css';

function LoginPage() {
  useRedirectIfLoggedIn();

  return (
    <div className="loginPage">
      <LoginForm />
      <p>Don&apos;t have a account?</p>
      <NavLink to="/register">Sign up</NavLink>
    </div>
  );
}

export default LoginPage;
