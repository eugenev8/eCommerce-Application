import { NavLink } from 'react-router-dom';
import RegisterForm from '../../components/forms/register/RegisterForm';
import useRedirectIfLoggedIn from '../../hooks/useRedirectIfLoggedIn';

import './RegisterPage.css';

function RegisterPage() {
  useRedirectIfLoggedIn();

  return (
    <div className="registerPage">
      <RegisterForm />
      <p>Already have an account?</p>
      <NavLink to="/login">Login</NavLink>
    </div>
  );
}

export default RegisterPage;
