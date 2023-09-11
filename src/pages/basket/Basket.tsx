import { Link, useNavigate } from 'react-router-dom';
import Wrapper from '../../components/wrapper/Wrapper';
import styles from './basket.module.scss';

export default function BasketPage() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const navigate = useNavigate();
  return (
    <Wrapper>
      <h2>Shopping Cart</h2>
      <div className={styles.container}>
        <div className={styles.container__items}>
          <div className={styles.items__header}>
            <div>Item</div>
            <div>Specs</div>
            <div>Price</div>
            <div>Quantity</div>
            <div>SubTotal</div>
            <div />
            <div>Apple macbook</div>
            <div>RAM: 16 Diagonal: 14.2 HDD: 512 OS: macOS CPU: M2 Max</div>
            <div>$1299.00</div>
            <div>1</div>
            <div>$1299.00</div>
            <div className={styles.button__container}>
              <div className={styles.button}>
                <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="13.4882" cy="13.4883" r="12.4882" fill="white" stroke="#CACDD8" strokeWidth="2" />
                  <path d="M9.44177 9.44183L18.2091 18.2092" stroke="#A2A6B0" strokeWidth="2" strokeLinecap="round" />
                  <path d="M18.2091 9.44183L9.44178 18.2092" stroke="#A2A6B0" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <div className={styles.button}>
                <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="13.5" cy="13.5001" r="12.5" fill="white" stroke="#CACDD8" strokeWidth="2" />
                  <path
                    d="M8.16298 19.9039H8.2377L11.6994 19.5884C12.0786 19.5506 12.4333 19.3836 12.7039 19.1152L20.1752 11.6439C20.4652 11.3375 20.6219 10.9287 20.611 10.507C20.6001 10.0853 20.4225 9.68515 20.1171 9.39418L17.8425 7.11957C17.5456 6.84072 17.1566 6.68072 16.7495 6.67001C16.3423 6.65929 15.9454 6.79861 15.6343 7.06146L8.16298 14.5328C7.89465 14.8034 7.72757 15.1581 7.6898 15.5373L7.33283 18.999C7.32165 19.1206 7.33743 19.2431 7.37904 19.3579C7.42065 19.4727 7.48708 19.5769 7.57358 19.6631C7.65115 19.7401 7.74314 19.8009 7.84428 19.8422C7.94543 19.8836 8.05373 19.9045 8.16298 19.9039ZM16.6886 8.28178L18.9549 10.5481L17.2946 12.1669L15.0698 9.94208L16.6886 8.28178ZM9.30029 15.6784L13.974 11.0379L16.2154 13.2793L11.5666 17.9281L9.07615 18.1605L9.30029 15.6784Z"
                    fill="#A2A6B0"
                  />
                </svg>
              </div>
            </div>
            <div>Apple macbook</div>
            <div>RAM: 16 Diagonal: 14.2 HDD: 512 OS: macOS CPU: M2 Max</div>
            <div>$1299.00</div>
            <div>1</div>
            <div>$1299.00</div>
            <div className={styles.button__container}>
              <div className={styles.button}>
                <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="13.4882" cy="13.4883" r="12.4882" fill="white" stroke="#CACDD8" strokeWidth="2" />
                  <path d="M9.44177 9.44183L18.2091 18.2092" stroke="#A2A6B0" strokeWidth="2" strokeLinecap="round" />
                  <path d="M18.2091 9.44183L9.44178 18.2092" stroke="#A2A6B0" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <div className={styles.button}>
                <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="13.5" cy="13.5001" r="12.5" fill="white" stroke="#CACDD8" strokeWidth="2" />
                  <path
                    d="M8.16298 19.9039H8.2377L11.6994 19.5884C12.0786 19.5506 12.4333 19.3836 12.7039 19.1152L20.1752 11.6439C20.4652 11.3375 20.6219 10.9287 20.611 10.507C20.6001 10.0853 20.4225 9.68515 20.1171 9.39418L17.8425 7.11957C17.5456 6.84072 17.1566 6.68072 16.7495 6.67001C16.3423 6.65929 15.9454 6.79861 15.6343 7.06146L8.16298 14.5328C7.89465 14.8034 7.72757 15.1581 7.6898 15.5373L7.33283 18.999C7.32165 19.1206 7.33743 19.2431 7.37904 19.3579C7.42065 19.4727 7.48708 19.5769 7.57358 19.6631C7.65115 19.7401 7.74314 19.8009 7.84428 19.8422C7.94543 19.8836 8.05373 19.9045 8.16298 19.9039ZM16.6886 8.28178L18.9549 10.5481L17.2946 12.1669L15.0698 9.94208L16.6886 8.28178ZM9.30029 15.6784L13.974 11.0379L16.2154 13.2793L11.5666 17.9281L9.07615 18.1605L9.30029 15.6784Z"
                    fill="#A2A6B0"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className={styles.cartControls}>
            <div className="leftButtons">
              <Link to="/catalog">
                <button className={styles.buttonGray} type="button">
                  Continue Shopping
                </button>
              </Link>
              <button className={styles.buttonBlack} type="button">
                Clear Shopping Cart
              </button>
            </div>
            <div className="rightButtons">
              <button className={styles.buttonBlack} type="button">
                Update Shopping Cart
              </button>
            </div>
          </div>
        </div>
        <div className={styles.summary}>
          <h3>Summary</h3>
          <p>Estimate Shipping and Tax</p>
          <p className={styles.summary__destination}>Enter your destination to get a shipping estimate.</p>
          <div>
            <p>Apply Discount Code</p>
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
            <button type="button" className={styles.summary__button}>
              Proceed to Checkout
            </button>
            <button type="button" className={styles.summary__button}>
              Checkout with PayPal
            </button>
            <button type="button" className={styles.summary__button}>
              Checkout with multiple addresses
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}
