import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Product, ProductVariant } from '@commercetools/platform-sdk';
import { Suspense, useEffect, useMemo, useState } from 'react';
import styles from './ProductPage.module.scss';
import Wrapper from '../../components/wrapper/Wrapper';

import SwiperContainer from '../../components/swiper/Swiper';
import FlexContainer from '../../components/containers/FlexContainer';
import apiRoots from '../../sdk/apiRoots';
import LoaderSpinner from '../../components/loader/Loader';
import ModalContainer from '../../components/modal/ModalContainer';
import Button from '../../components/buttons/Buttons';

type CurrencyCode = 'USD' | 'EUR';

export default function ProductPage() {
  const { productKey } = useParams();
  const [product, setProduct] = useState<Product | null>();
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();

  const searchProductMemoized = useMemo(() => {
    return async (key: string) => {
      setIsLoading(true);
      setIsError(false);

      try {
        const result = await apiRoots.CredentialsFlow.products()
          .withKey({
            key,
          })
          .get()
          .execute();

        return result.body;
      } catch (error) {
        setIsError(true);
        return null;
      } finally {
        setIsLoading(false);
      }
    };
  }, []);

  useEffect(() => {
    if (!productKey) {
      setProduct(null);
      setIsError(false);
    }

    let ignore = false;

    if (productKey) {
      searchProductMemoized(productKey)
        .then((data) => {
          if (!ignore) {
            setProduct(data);
          }
        })
        .catch(() => setIsError(true));
    }

    return () => {
      ignore = true;
    };
  }, [productKey, searchProductMemoized]);

  useEffect(() => {
    const oldTitle = document.title;

    if (product) {
      if (searchParams.has('variant') && searchParams.get('variant') !== '1') {
        const id = searchParams.get('variant') || '2';
        const variant = product.masterData.current.variants.find((productVariant) => {
          return productVariant.id === +id;
        });
        setSelectedVariant(variant);
      } else {
        setSelectedVariant(product.masterData.current.masterVariant);
      }
      document.title = product.masterData.current.name['en-US'];
    }

    return () => {
      document.title = oldTitle;
    };
  }, [product, searchParams]);

  if (isLoading)
    return (
      <Wrapper>
        <FlexContainer
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '60vh',
          }}
        >
          <LoaderSpinner />
        </FlexContainer>
      </Wrapper>
    );

  if (!isLoading && isError)
    return (
      <Wrapper>
        <FlexContainer
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '60vh',
            flexDirection: 'column',
          }}
        >
          <h2>Product not found!</h2>
          <Link to=".." relative="path">
            Go to catalog
          </Link>
        </FlexContainer>
      </Wrapper>
    );

  if (!product) {
    return null;
  }

  const { masterVariant, variants } = product.masterData.current;
  const allVariants = [masterVariant, ...variants];

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
    setIsModalOpen(true);
  };

  function getImagesForVariant() {
    if (selectedVariant && selectedVariant.images) {
      return selectedVariant.images.map((image) => image.url);
    }

    return [];
  }

  function getPriceForCountry(data: ProductVariant, currencyCode: CurrencyCode) {
    const price = data?.prices?.find((p) => p.value.currencyCode === currencyCode);

    if (price) {
      return price.value.centAmount / 100;
    }

    return null;
  }

  function getDiscountedPriceForCountry(data: ProductVariant, currencyCode: CurrencyCode) {
    const price = data?.prices?.find((p) => p.value.currencyCode === currencyCode);

    if (price && price.discounted) {
      return price.discounted.value.centAmount / 100;
    }

    return null;
  }

  const images = getImagesForVariant();

  const renderPrice = () => {
    if (!selectedVariant) {
      return null;
    }
    const price = getPriceForCountry(selectedVariant, 'USD');
    const discPrice = getDiscountedPriceForCountry(selectedVariant, 'USD');

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

  const { description } = product.masterData.current;
  const formattedDescription = (description && description['en-US']) || 'No description';

  return (
    <Suspense fallback={<LoaderSpinner />}>
      <Wrapper>
        <div className={`${styles.product__block}`}>
          <div className={`${styles.product__description}`}>
            <h2>{product.masterData.current.name['en-US']}</h2>
            {!selectedVariant && <h3>Incorrect product variant. Please choose another variant!</h3>}
            <p>{formattedDescription}</p>
            <p>SKU: {selectedVariant?.sku}</p>
          </div>

          <div className={`${styles.product__slider}`}>
            <SwiperContainer imageUrlArray={images} onImageClick={handleImageClick} />
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>Variant</th>
              <th>Attributes</th>
            </tr>
          </thead>
          <tbody>
            {allVariants.map((productVariant) => (
              <tr
                key={productVariant.id}
                onClick={() => {
                  const variantParam = { variant: productVariant.id.toString() };
                  setSearchParams(variantParam);
                  setSelectedVariant(productVariant);
                }}
                className={productVariant === selectedVariant ? styles.selectedVariant : ''}
              >
                <td>{productVariant.sku}</td>
                <td>
                  {productVariant.attributes?.map((attribute) => (
                    <div key={attribute.name}>
                      {attribute.name}: {attribute.value}
                    </div>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {renderPrice()}

        <ModalContainer isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
          {images.length > 0 && (
            <>
              <FlexContainer style={{ width: '80vmin' }}>
                <SwiperContainer imageUrlArray={images} initialSlide={selectedImageIndex} onImageClick={() => null} />
              </FlexContainer>
              <Button
                styling="secondary"
                innerText="Close"
                variant="default"
                type="button"
                addedClass=""
                style={{ margin: 'auto' }}
                onClick={() => setIsModalOpen(false)}
              />
            </>
          )}
        </ModalContainer>
      </Wrapper>
    </Suspense>
  );
}
