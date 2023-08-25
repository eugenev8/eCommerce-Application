import { useNavigate } from 'react-router-dom';
import LoginForm from '../../components/forms/login/LoginForm';
import useRedirectIfLoggedIn from '../../hooks/useRedirectIfLoggedIn';

import styles from './LoginPage.module.scss';
import Wrapper from '../../components/wrapper/Wrapper';
import FlexContainer from '../../components/containers/FlexContainer';
import ColoredContainer from '../../components/containers/ColoredContainer';
import Button from '../../components/buttons/Buttons';

function LoginPage() {
  const navigate = useNavigate();
  useRedirectIfLoggedIn();

  return (
    <div className={`${styles.loginPage}`}>
      <Wrapper>
        <FlexContainer style={{ flexDirection: 'column', justifyContent: 'center' }}>
          <h2>Customer Login</h2>
          <FlexContainer style={{ justifyContent: 'center', flexWrap: 'wrap', gap: '2rem' }}>
            <ColoredContainer>
              <LoginForm />
            </ColoredContainer>
            <ColoredContainer>
              <FlexContainer style={{ flexDirection: 'column' }}>
                <h2>New Customer?</h2>
                <p>Creating an account has many benefits:</p>
                <ul style={{ padding: '2% 5% 5%', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <li>Check out faster</li>
                  <li>Keep more than one address</li>
                  <li>Track orders and more</li>
                </ul>
                <Button
                  onClick={() => navigate('/register')}
                  addedClass=""
                  innerText="Create an account"
                  styling="primary"
                  type="button"
                  variant="default"
                />
              </FlexContainer>
            </ColoredContainer>
          </FlexContainer>
        </FlexContainer>
      </Wrapper>
    </div>
  );
}

export default LoginPage;
