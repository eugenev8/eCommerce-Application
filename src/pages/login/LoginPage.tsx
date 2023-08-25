import { NavLink } from 'react-router-dom';
import LoginForm from '../../components/forms/login/LoginForm';
import useRedirectIfLoggedIn from '../../hooks/useRedirectIfLoggedIn';

import styles from './LoginPage.module.scss';
import Wrapper from '../../components/wrapper/Wrapper';
import FlexContainer from '../../components/containers/FlexContainer';

function LoginPage() {
  useRedirectIfLoggedIn();

  return (
    <div className={`${styles.loginPage}`}>
      <Wrapper>
        <FlexContainer style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <LoginForm />
          <p>Don&apos;t have a account?</p>
          <NavLink to="/register">Sign up</NavLink>
        </FlexContainer>
      </Wrapper>
    </div>
  );
}

export default LoginPage;
