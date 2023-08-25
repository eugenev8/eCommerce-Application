import { NavLink } from 'react-router-dom';
import RegisterForm from '../../components/forms/register/RegisterForm';
import useRedirectIfLoggedIn from '../../hooks/useRedirectIfLoggedIn';

import styles from './RegisterPage.module.scss';
import Wrapper from '../../components/wrapper/Wrapper';
import FlexContainer from '../../components/containers/FlexContainer';

function RegisterPage() {
  useRedirectIfLoggedIn();

  return (
    <div className={`${styles.registerPage}`}>
      <Wrapper>
        <FlexContainer style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <RegisterForm />
          <p>Already have an account?</p>
          <NavLink to="/login">Login</NavLink>
        </FlexContainer>
      </Wrapper>
    </div>
  );
}

export default RegisterPage;
