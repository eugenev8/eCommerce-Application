import { NavLink } from 'react-router-dom';
import RegisterForm from '../../components/forms/register/RegisterForm';
import useRedirectIfLoggedIn from '../../hooks/useRedirectIfLoggedIn';

import styles from './RegisterPage.module.scss';
import Wrapper from '../../components/wrapper/Wrapper';
import FlexContainer from '../../components/containers/FlexContainer';
import ColoredContainer from '../../components/containers/ColoredContainer';
import AnimatedContainer from '../../components/containers/AnimatedContainer';

function RegisterPage() {
  useRedirectIfLoggedIn();

  return (
    <div className={`${styles.registerPage}`}>
      <AnimatedContainer>
        <Wrapper>
          <h2>Customer Registration</h2>
          <FlexContainer style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <ColoredContainer style={{ width: '90%', margin: '3% auto' }}>
              <RegisterForm />
            </ColoredContainer>

            <p>Already have an account?</p>
            <NavLink to="/login">Login</NavLink>
          </FlexContainer>
        </Wrapper>
      </AnimatedContainer>
    </div>
  );
}

export default RegisterPage;
