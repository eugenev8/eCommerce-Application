import RegisterForm from '../../components/forms/register/RegisterForm';
import useRedirectIfLoggedIn from '../../hooks/useRedirectIfLoggedIn';

function RegisterPage() {
  useRedirectIfLoggedIn();

  return <RegisterForm />;
}

export default RegisterPage;
