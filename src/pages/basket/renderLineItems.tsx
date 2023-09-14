import { LineItem } from '@commercetools/platform-sdk';
import styles from './basket.module.scss';
import deletesvg from '../../common/icons/delete.svg';
import editsvg from '../../common/icons/edit.svg';

const removeItemHandler = () => {
  console.log('remove item');
};
const editItemHandler = () => {
  console.log('edit item');
};

const renderLineItems = (lineItems: LineItem[]) => {
  return lineItems.map((item) => (
    <div key={item.id} className={styles.basket__item}>
      <div className={styles.basket__item__img}>
        <img src={item?.variant?.images?.[0]?.url} alt={item.name[`en-US`]} />
      </div>
      <div>{`${item.name['en-US']} ${item.variant?.attributes?.map((a) => `${a.name}: ${a.value}`).join(' ')}`}</div>
      <div key="price">{item.price.value.centAmount / 10 ** item.price.value.fractionDigits}</div>
      <div className={styles.quantity}>
        <input key="quantity" type="number" placeholder={String(item.state[0].quantity)} min={0} />
      </div>
      <div>{item.price.value.centAmount / 10 ** item.price.value.fractionDigits}</div>
      <div className={styles.button__container}>
        <button type="button" className={styles.button} onClick={() => removeItemHandler()}>
          <img src={deletesvg} alt="delete" />
        </button>
        <button type="button" className={styles.button} onClick={() => editItemHandler()}>
          <img src={editsvg} alt="edit" />
        </button>
      </div>
    </div>
  ));
};

export default renderLineItems;
