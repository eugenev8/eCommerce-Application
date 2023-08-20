import LoginForm from '../../components/forms/login/LoginForm';
import useRedirectIfLoggedIn from '../../hooks/useRedirectIfLoggedIn';

function LoginPage() {
  useRedirectIfLoggedIn();

  return <LoginForm />;
}

export default LoginPage;
