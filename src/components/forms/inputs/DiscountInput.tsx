import { useState } from 'react';
import styles from './DiscountInput.module.scss';

export default function DiscountInput() {
  const [promocode, setPromocode] = useState('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPromocode(e.target.value);
  };

  return (
    <label className={styles.discountLabel} htmlFor="discountInput">
      Apply Discount Code:
      <div className={styles.discount}>
        <input
          id="discountInput"
          className={styles.dicountInput}
          type="text"
          placeholder="Enter discount code"
          value={promocode || ''}
          onChange={onChange}
        />
        <button className={styles.discountButton} type="button">
          Apply
        </button>
      </div>
    </label>
  );
}
