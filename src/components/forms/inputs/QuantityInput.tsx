import styles from './QuantityInput.module.scss';

type QuantityInputProps = {
  quantity: number;
  addItem: () => void;
  removeItem: () => void;
};

export default function QuantityInput({ quantity, addItem, removeItem }: QuantityInputProps) {
  return (
    <div className={styles.quantity}>
      <p>{quantity}</p>
      <div className={styles.buttons}>
        <button type="button" onClick={addItem}>
          +
        </button>
        <button type="button" onClick={removeItem}>
          -
        </button>
      </div>
    </div>
  );
}
