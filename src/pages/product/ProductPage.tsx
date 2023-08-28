import { useParams } from 'react-router-dom';
import { Product } from '@commercetools/platform-sdk';
import styles from './ProductPage.module.scss';
import Wrapper from '../../components/wrapper/Wrapper';

import productExample from './productExample';
import SwiperContainer from '../../components/swiper/Swiper';
import FlexContainer from '../../components/containers/FlexContainer';

type AvailableCountry = 'US';
type CurrencyCode = 'USD' | 'EUR';

function getPriceForCountry(product: Product, country: AvailableCountry, currencyCode: CurrencyCode) {
  const variant = product.masterData.current.masterVariant;
  const price = variant.prices?.find((p) => p.country === country && p.value.currencyCode === currencyCode);

  if (price) {
    return `${price.value.centAmount / 100} ${currencyCode}`;
  }

  return null;
}

function getDiscountedPriceForCountry(product: Product, country: AvailableCountry, currencyCode: CurrencyCode) {
  const variant = product.masterData.current.masterVariant;
  const price = variant.prices?.find((p) => p.country === country && p.value.currencyCode === currencyCode);

  if (price && price.discounted) {
    return `${price.discounted.value.centAmount / 100} ${currencyCode}`;
  }

  return null;
}

function getImagesForVariant(product: Product, variantId: number) {
  const variant = product.masterData.current.variants.find((v) => v.id === variantId);

  if (variant && variant.images) {
    return variant.images.map((image) => image.url);
  }

  return [];
}

function createProductAttributes(product: Product): [string, Record<string, number[]>][] {
  const attributes = new Map<string, Record<string, number[]>>();

  function updateAttribute(attributeName: string, label: string, variantId: number) {
    const prev = attributes.get(attributeName) || {};

    if (prev[label]) {
      prev[label].push(variantId);
    } else {
      prev[label] = [variantId];
    }

    attributes.set(attributeName, prev);
  }

  const { masterVariant, variants } = product.masterData.current;

  masterVariant.attributes?.forEach((attribute) => {
    updateAttribute(attribute.name, attribute.value.label, masterVariant.id);
  });

  variants.forEach((variant) => {
    variant.attributes?.forEach((attribute) => {
      updateAttribute(attribute.name, attribute.value.label, variant.id);
    });
  });

  return Array.from(attributes.entries());
}

export default function ProductPage() {
  const { productID } = useParams();

  const images = getImagesForVariant(productExample, 2);
  const attributes = createProductAttributes(productExample);

  const renderAttributes = () => {
    return attributes.map(([attributeName, attributeValue]) => (
      <div key={attributeName}>
        <h2>{attributeName}</h2>
        {Object.entries(attributeValue).map(([label, ids]) => (
          <div key={label}>
            <h4>{label}</h4>
            {ids.map((id: number) => (
              <p key={id}>{id}</p>
            ))}
          </div>
        ))}
      </div>
    ));
  };
  const { description } = productExample.masterData.current;
  const formattedDescription = typeof description === 'object' ? description.en : 'No description';

  return (
    <Wrapper>
      <p>Requested id: {productID}</p>
      <div className={`${styles.product__block}`}>
        <div className={`${styles.product__description}`}>
          <h2>{productExample.masterData.current.name['en-US']}</h2>
          <p>{formattedDescription}</p>
          <p>Price: {getPriceForCountry(productExample, 'US', 'USD')}</p>
          <p>Discounted price: {getDiscountedPriceForCountry(productExample, 'US', 'USD')}</p>
          <p>SKU: {productExample.masterData.current.masterVariant.sku}</p>
        </div>

        <FlexContainer style={{ width: '500px', height: '500px' }}>
          <SwiperContainer imageUrlArray={images} />
        </FlexContainer>
      </div>

      {renderAttributes()}
    </Wrapper>
  );
}
