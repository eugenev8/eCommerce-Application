import { ProductProjection, ProductVariant } from '@commercetools/platform-sdk';

import { useNavigate } from 'react-router-dom';
import styles from './ProductCard.module.scss';

type ProductCardProps = {
  productProjection: ProductProjection;
  variantID: number;
  type: 'wide' | 'small';
};

export function getPriceForCountry(data: ProductVariant) {
  const price = data?.prices?.find((p) => p.value.currencyCode === 'USD');

  if (price) {
    return price.value.centAmount / 100;
  }

  return null;
}

export function getDiscountedPriceForCountry(data: ProductVariant) {
  const price = data?.prices?.find((p) => p.value.currencyCode === 'USD');

  if (price && price.discounted) {
    return price.discounted.value.centAmount / 100;
  }

  return null;
}

export default function ProductCard({ productProjection, variantID, type }: ProductCardProps) {
  const navigate = useNavigate();
  const variant =
    variantID === 1
      ? productProjection.masterVariant
      : productProjection.variants.find((productVariant) => productVariant?.id === variantID);

  if (!variant) {
    return <p>Variant not found</p>;
  }
  const images = variant.images?.map((image) => image.url);

  const renderPrice = () => {
    const price = getPriceForCountry(variant);
    const discPrice = getDiscountedPriceForCountry(variant);

    if (!price) return <p>Price not set yet!</p>;

    if (!discPrice) {
      return <div className={`${styles.price}`}>${price.toFixed(2)}</div>;
    }

    return (
      <div className={`${styles.price}`}>
        <span className={`${styles.product__oldPrice}`}>${price.toFixed(2)}</span>{' '}
        <span className={`${styles.product__discPrice}`}>${discPrice.toFixed(2)}</span>
      </div>
    );
  };

  return (
    <div
      onClick={() => navigate(`/catalog/${productProjection.id}?variant=${variant?.id}`)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          navigate(`/catalog/${productProjection.id}`);
        }
      }}
      className={`${styles.productCard} ${type === 'wide' ? styles.productCard_fullWidth : ''}`}
    >
      <div className={`${styles.productCard__images}`}>
        {(images?.length && <img src={images[0]} alt="Main" />) || <p>No photo yet</p>}
      </div>
      <div className={`${styles.productCard__info}`}>
        {renderPrice()}
        <p>{productProjection.name['en-US']}</p>
      </div>
      {variant.attributes?.length && (
        <div className={`${styles.productCard__attributes}`}>
          {variant.attributes.map((attribute) => {
            return (
              <p key={attribute.name + attribute.value}>
                {attribute.name}: {typeof attribute.value === 'object' ? attribute.value.label : attribute.value}
              </p>
            );
          })}
        </div>
      )}
    </div>
  );
}