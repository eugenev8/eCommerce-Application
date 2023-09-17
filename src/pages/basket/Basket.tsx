import { Link, useNavigate } from 'react-router-dom';
import { LineItem } from '@commercetools/platform-sdk';
import Wrapper from '../../components/wrapper/Wrapper';
import styles from './basket.module.scss';
import useManageCart from '../../hooks/useManageCart';
import AnimatedContainer from '../../components/containers/AnimatedContainer';
import ColoredContainer from '../../components/containers/ColoredContainer';
import DiscountInput from '../../components/forms/inputs/DiscountInput';
import Button from '../../components/buttons/Buttons';
import FlexContainer from '../../components/containers/FlexContainer';
import ROUTES_PATHS from '../../routesPaths';
import QuantityInput from '../../components/forms/inputs/QuantityInput';
import IconClose from '../../components/icons/IconClose';
import useCategoriesMethods from '../../hooks/useCategoriesMethods';

export default function BasketPage() {
  const { cart, isCartLoading, clearCart, addLineItem, removeLineItem } = useManageCart();
  const { getCategoriesPathByCategoryId } = useCategoriesMethods();
  const navigate = useNavigate();
  const lineItems: LineItem[] = cart?.lineItems ?? [];

  const clearCurrentCart = () => {
    return clearCart();
  };

  let totalPrice = '0';
  if (cart && cart.totalPrice) {
    totalPrice = (cart.totalPrice.centAmount / 100).toFixed(cart.totalPrice.fractionDigits);
  }

  function lineItem(item: LineItem) {
    const itemPrice = item.price.value.centAmount / 10 ** item.price.value.fractionDigits;
    const discountedPrice = item.price.discounted
      ? item.price.discounted.value.centAmount / 10 ** item.price.discounted.value.fractionDigits
      : null;
    const promoPrice = item.discountedPricePerQuantity[0]
      ? item.discountedPricePerQuantity[0].discountedPrice.value.centAmount /
        10 ** item.discountedPricePerQuantity[0].discountedPrice.value.fractionDigits
      : null;
    const itemAttributes = item.variant?.attributes?.map((a) => <p key={a.name}>{`${a.name}: ${a.value}`}</p>);

    return (
      <div key={item.id} className={styles.cart__item}>
        <div className={styles.item__info}>
          <div className={styles.item__image}>
            <img src={item?.variant?.images?.[0]?.url} alt={item.name[`en-US`]} />
          </div>
          <div className={styles.item__productInfo}>
            <div className={styles.item__name}>
              <Link
                to={`/product/${getCategoriesPathByCategoryId(item.custom?.fields?.categoryId)}/${
                  item.productKey
                }?variant=${item.variant?.id}`}
              >
                {item.name[`en-US`]}
              </Link>
            </div>
            <div className={styles.item__attributes}>{itemAttributes}</div>
          </div>
        </div>
        <div className={styles.item_inCartInfo}>
          <div className={styles.item__quantity}>
            <QuantityInput
              quantity={item.quantity}
              addItem={() => {
                return addLineItem(item.productId, item.variant.id, item.custom?.fields?.categoryId);
              }}
              removeItem={() => {
                return removeLineItem(item.id, 1);
              }}
            />
          </div>
          <div className={styles.item__subtotal}>
            <p className={discountedPrice || promoPrice ? styles.item__oldPrice : ''}>
              {`$${(itemPrice * item.quantity).toFixed(2)}`}
            </p>
            {(promoPrice && <p>{`$${(promoPrice * item.quantity).toFixed(2)}`}</p>) ||
              (discountedPrice && <p>{`$${(discountedPrice * item.quantity).toFixed(2)}`}</p>)}
          </div>
        </div>
        <button className={styles.item__delete} type="button" onClick={() => removeLineItem(item.id)}>
          <IconClose />
        </button>
      </div>
    );
  }

  if (!cart || !lineItems.length) {
    return (
      <AnimatedContainer>
        <Wrapper>
          <h2>Shopping Cart</h2>
          <FlexContainer
            style={{
              gap: '1rem',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '40vh',
              flexDirection: 'column',
            }}
          >
            <p>No items in cart!</p>
            <Link to={ROUTES_PATHS.catalog}>Go to Catalog</Link>
          </FlexContainer>
        </Wrapper>
      </AnimatedContainer>
    );
  }

  return (
    <AnimatedContainer>
      <Wrapper className={isCartLoading ? styles.waiting : ''}>
        <h2>Shopping Cart</h2>
        <FlexContainer style={{ gap: '1rem' }}>
          <Button
            addedClass=""
            innerText="Clear cart"
            styling="secondary"
            type="button"
            variant="default"
            style={{ margin: '1rem 0', padding: '0.5rem 1rem', minWidth: 'auto', fontSize: '.9rem' }}
            onClick={clearCurrentCart}
          />
          <Button
            addedClass=""
            innerText="Continue shopping"
            styling="secondary"
            type="button"
            variant="default"
            style={{ margin: '1rem 0', padding: '0.5rem 1rem', minWidth: 'auto', fontSize: '.9rem' }}
            onClick={() => {
              navigate(ROUTES_PATHS.catalog);
            }}
          />
        </FlexContainer>
        <section className={styles.cartContainer}>
          <div className={styles.cart}>{lineItems.map((item) => lineItem(item))}</div>
          <div className={styles.summary}>
            <ColoredContainer>
              <h4>Order Summary</h4>
              <div className={styles.promocode}>
                <DiscountInput />
              </div>
              {!!cart.discountCodes.length && <p className={styles.discountCode__message}>Discount code applied</p>}
              <div className={styles.orderInfo}>
                <div className={styles.orderInfo__line}>
                  <p>Items quantity</p>
                  <p>{cart?.totalLineItemQuantity}</p>
                </div>
                <div className={styles.orderInfo__line}>
                  <p>Total price</p>
                  <p>${totalPrice}</p>
                </div>
              </div>
              <Button
                addedClass=""
                innerText="Procceed to Checkout"
                styling="primary"
                type="button"
                variant="default"
                style={{ margin: '3rem auto' }}
              />
            </ColoredContainer>
          </div>
        </section>
      </Wrapper>
    </AnimatedContainer>
  );
}
