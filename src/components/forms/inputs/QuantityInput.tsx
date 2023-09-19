import { useState } from 'react';
import styles from './QuantityInput.module.scss';

type QuantityInputProps = {
  quantity: number;
  addItem: () => Promise<boolean>;
  removeItem: () => Promise<boolean>;
};

export default function QuantityInput({ quantity, addItem, removeItem }: QuantityInputProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <div className={styles.quantity}>
      <p>{quantity}</p>
      <div className={styles.buttons}>
        <button
          type="button"
          onClick={() => {
            setIsSubmitting(true);
            addItem().finally(() => {
              setIsSubmitting(false);
            });
          }}
          disabled={isSubmitting}
        >
          +
        </button>
        <button
          type="button"
          onClick={() => {
            setIsSubmitting(true);
            removeItem().finally(() => {
              setIsSubmitting(false);
            });
          }}
          disabled={isSubmitting}
        >
          -
        </button>
      </div>
    </div>
  );
}
