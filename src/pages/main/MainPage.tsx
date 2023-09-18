import styles from './MainPage.module.scss';

import AnimatedContainer from '../../components/containers/AnimatedContainer';
import Wrapper from '../../components/wrapper/Wrapper';
import ColoredContainer from '../../components/containers/ColoredContainer';

function MainPage() {
  return (
    <div className={`${styles.mainPage}`}>
      <AnimatedContainer>
        <Wrapper>
          <h2>Current promocodes</h2>
          <ColoredContainer
            style={{
              borderRadius: '10px',
              boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px',
              margin: '3rem auto',
            }}
          >
            <h3>demo9</h3>
            <p>
              Promo code that reduces the price of all products in the cart by 5% except for products that have been
              already discounted.
            </p>
          </ColoredContainer>
          <ColoredContainer
            style={{
              borderRadius: '10px',
              boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px',
              margin: '3rem auto',
            }}
          >
            <h3>all5</h3>
            <p>Promo code that reduces the price of all products in the cart by 5%.</p>
          </ColoredContainer>
          <ColoredContainer
            style={{
              borderRadius: '10px',
              boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px',
              margin: '3rem auto',
            }}
          >
            <h3>apple6</h3>
            <p>Promo code that reduces the price of all Apple products in the cart by 6%.</p>
          </ColoredContainer>
        </Wrapper>
      </AnimatedContainer>
    </div>
  );
}

export default MainPage;
