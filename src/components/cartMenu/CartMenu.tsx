import { LineItem } from '@commercetools/platform-sdk';
import useManageCart from '../../hooks/useManageCart';
import IconBasket from '../icons/IconBasket';
import styles from './CartMenu.module.scss';
import { NAME_LOCALE } from '../../sdk/types';

function lineItem(lineItemInCart: LineItem) {
  return (
    <div key={lineItemInCart.id} className={styles.cartMenu__item}>
      <p className={styles.cartMenu__item_name}>{lineItemInCart.name[NAME_LOCALE]}</p>
      <p className={styles.cartMenu__item_quantity}>{lineItemInCart.quantity}</p>
      <p className={styles.cartMenu__item_price}>${(lineItemInCart.totalPrice.centAmount / 100).toFixed(2)}</p>
    </div>
  );
}

export default function CartMenu() {
  const { cart } = useManageCart();
  const lineItems = cart?.lineItems;

  return (
    <div className={styles.cart}>
      <p className={styles.cart__title}>Cart</p>
      <div className={`${styles.cartMenu}`}>
        <IconBasket />
        {lineItems && !!lineItems.length && (
          <span className={styles.cartMenu__itemsCount}>{cart?.lineItems?.length}</span>
        )}
        {!!lineItems?.length && (
          <div className={`${styles.cartMenu__subMenu}`}>
            <div className={styles.cartMenu__items}>{lineItems.map((item) => lineItem(item))}</div>
            {cart?.totalPrice && cart.totalPrice.centAmount > 0 && (
              <p className={styles.cartMenu__totalPrice}>${(cart.totalPrice.centAmount / 100).toFixed(2)}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
