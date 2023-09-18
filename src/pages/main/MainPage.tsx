import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './MainPage.module.scss';

import AnimatedContainer from '../../components/containers/AnimatedContainer';
import toaster from '../../services/toaster';
import useManageCart from '../../hooks/useManageCart';

function MainPage() {
  const { applyPromoCode } = useManageCart();
  const [promoCode, setPromoCode] = useState<string>('');
  function handleApplyPromoCode() {
    applyPromoCode(promoCode).then((isSuccess) => {
      if (isSuccess) {
        toaster.showSuccess('Success!');
      }
    });
  }

  return (
    <div className={`${styles.mainPage}`}>
      <AnimatedContainer>
        <h1>Main page</h1>
        <NavLink to="/">Main (you are here)</NavLink>
        <br />
        <NavLink to="/login">Login</NavLink>
        <br />
        <NavLink to="/register">Sign up</NavLink>
        <br />
        <br />
        <button type="button" onClick={handleApplyPromoCode}>
          Apply promo-code
        </button>
        <br />
        <input
          type="text"
          value={promoCode}
          onChange={(e) => setPromoCode(e.target.value)}
          placeholder="promo-code"
          style={{ width: '200px' }}
        />
        <p>
          Есть промокод demo9 которые делает скидку на все товары в корзине на 5% за исключением товаров, у которых уже
          есть скидка
        </p>
      </AnimatedContainer>
    </div>
  );
}

export default MainPage;
