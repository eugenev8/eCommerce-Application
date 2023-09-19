import { useState } from 'react';
import styles from './DiscountInput.module.scss';
import useManageCart from '../../../hooks/useManageCart';
import Button from '../../buttons/Buttons';

export default function DiscountInput() {
  const { cart, applyPromoCode, removePromoCode } = useManageCart();
  const [promocode, setPromocode] = useState('');

  const isPromocodeActive = !!cart?.discountCodes.length;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPromocode(e.target.value);
  };

  const onClick = () => {
    if (!promocode) {
      return;
    }
    applyPromoCode(promocode);
  };

  if (isPromocodeActive) {
    return (
      <Button
        addedClass={styles.cancelDiscount}
        innerText="Cancel discount code"
        styling="tertiary"
        type="button"
        variant="default"
        onClick={removePromoCode}
      />
    );
  }

  return (
    <label className={styles.discountLabel} htmlFor="discountInput">
      Apply Discount Code:
      <div className={styles.discount}>
        <input
          id="discountInput"
          className={styles.discountInput}
          type="text"
          placeholder="Enter discount code"
          value={promocode || ''}
          onChange={onChange}
        />
        <button className={styles.discountButton} type="button" onClick={onClick}>
          Apply
        </button>
      </div>
    </label>
  );
}
