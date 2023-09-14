import { Link, useNavigate } from 'react-router-dom';
import { LineItem } from '@commercetools/platform-sdk';
import Wrapper from '../../components/wrapper/Wrapper';
import styles from './basket.module.scss';
import useManageCart from '../../hooks/useManageCart';
import renderLineItems from './renderLineItems';

const clearCartHandler = () => {
  console.log('clear cart');
};
const updateCartHandler = () => {
  console.log('update cart');
};

const applyPromoHandler = () => {
  console.log('apply promo');
};
const proceedToCheckoutHandler = () => {
  console.log('proceed to checkout');
};

const checkoutWithPayPalHandler = () => {
  console.log('checkout with paypal');
};

const checkoutWithMultipleAddressesHandler = () => {
  console.log('checkout with multiple addresses');
};

export default function BasketPage() {
  const { cart } = useManageCart();
  const lineItems: LineItem[] = cart?.lineItems ?? [];
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const navigate = useNavigate();
  return (
    <Wrapper>
      <h2>Shopping Cart</h2>
      <div className={styles.container}>
        <div className={styles.container__items}>
          <div className={styles.items__header}>
            <div>Item</div>
            <div />
            <div>Price</div>
            <div>Qty</div>
            <div>Subtotal</div>
            <div />
          </div>
          {renderLineItems(lineItems)}
          <div className={styles.cartControls}>
            <div className={styles.leftButtons}>
              <Link to="/catalog">
                <button className={`${styles.buttonGray} ${styles.buttonBlackGray}`} type="button">
                  Continue Shopping
                </button>
              </Link>
              <button
                className={`${styles.buttonBlack} ${styles.buttonBlackGray}`}
                type="button"
                onClick={() => clearCartHandler()}
              >
                Clear Shopping Cart
              </button>
            </div>
            <div className={styles.rightButtons}>
              <button
                className={`${styles.buttonBlack} ${styles.buttonBlackGray}`}
                type="button"
                onClick={() => updateCartHandler()}
              >
                Update Shopping Cart
              </button>
            </div>
          </div>
        </div>
        <div className={styles.summary}>
          <h3>Summary</h3>
          <p>Estimate Shipping and Tax</p>
          <p className={styles.summary__destination}>Enter your destination to get a shipping estimate.</p>
          <div className={styles.summary__promo}>
            <p>Apply Discount Code</p>
            <input type="text" name="promo" id="promo" placeholder="Enter discount code" />
            <button type="button" onClick={() => applyPromoHandler()}>
              Apply
            </button>
          </div>
          <div className={styles.summary__calculations}>
            <div>Subtotal</div>
            <div>$1299.00</div>
            <div>Shipping</div>
            <div>$21.00</div>
            <div>Tax</div>
            <div>$1.50</div>
            <div>GST(10%)</div>
            <div>$1.50</div>
            <div>Order Total</div>
            <div>$1349.00</div>
          </div>
          <div className={styles.summary__buttons}>
            <button type="button" className={styles.summary__button} onClick={() => proceedToCheckoutHandler()}>
              Proceed to Checkout
            </button>
            <button type="button" className={styles.summary__button} onClick={() => checkoutWithPayPalHandler()}>
              Checkout with PayPal
            </button>
            <button
              type="button"
              className={styles.summary__button}
              onClick={() => checkoutWithMultipleAddressesHandler()}
            >
              Checkout with multiple addresses
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}
