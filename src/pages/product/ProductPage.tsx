import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Product, ProductVariant } from '@commercetools/platform-sdk';
import { Suspense, useEffect, useState } from 'react';
import styles from './ProductPage.module.scss';
import Wrapper from '../../components/wrapper/Wrapper';
import SwiperContainer from '../../components/swiper/Swiper';
import FlexContainer from '../../components/containers/FlexContainer';
import apiRoots from '../../sdk/apiRoots';
import LoaderSpinner from '../../components/loader/Loader';
import ModalContainer from '../../components/modal/ModalContainer';
import Button from '../../components/buttons/Buttons';
import AnimatedContainer from '../../components/containers/AnimatedContainer';
import useManageCart from '../../hooks/useManageCart';

type CurrencyCode = 'USD' | 'EUR';

export default function ProductPage() {
  const { productKey } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const { addLineItem, findItemInCart, removeLineItem, isCartLoading } = useManageCart();

  useEffect(() => {
    let ignore = false;

    const fetchData = async () => {
      setIsLoading(true);
      setIsError(false);

      try {
        if (!productKey) {
          throw new Error('Product key is missing');
        }

        const result = await apiRoots.CredentialsFlow.products().withKey({ key: productKey }).get().execute();

        if (!ignore) {
          setProduct(result.body);
        }
      } catch (error) {
        if (!ignore) {
          setIsError(true);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      ignore = true;
    };
  }, [productKey]);

  useEffect(() => {
    const oldTitle = document.title;

    if (product) {
      const variantId = searchParams.get('variant');
      const variant =
        variantId && variantId !== '1'
          ? product.masterData.current.variants.find((productVariant) => productVariant.id === +variantId)
          : product.masterData.current.masterVariant;

      setSelectedVariant(variant || null);
      document.title = product.masterData.current.name['en-US'];
    }

    return () => {
      document.title = oldTitle;
    };
  }, [product, searchParams]);

  if (isLoading || (!isLoading && isError)) {
    return (
      <AnimatedContainer>
        <Wrapper>
          <FlexContainer
            style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}
          >
            {isLoading ? <LoaderSpinner /> : <h2>Product not found!</h2>}
            {!isLoading && isError && (
              <Link to=".." relative="path">
                Go to catalog
              </Link>
            )}
          </FlexContainer>
        </Wrapper>
      </AnimatedContainer>
    );
  }

  if (!product) {
    return (
      <AnimatedContainer>
        <Wrapper>
          <FlexContainer style={{ justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
            <LoaderSpinner />
          </FlexContainer>
        </Wrapper>
      </AnimatedContainer>
    );
  }

  if (!selectedVariant) {
    return (
      <Wrapper>
        <FlexContainer
          style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}
        >
          <h3>Variant doesnt exists!</h3>
          <Button
            addedClass=""
            innerText="Go to master variant"
            styling="primary"
            type="button"
            variant="default"
            onClick={() => {
              setSearchParams({ variant: '1' });
              setSelectedVariant(product.masterData.current.masterVariant);
            }}
          />
        </FlexContainer>
      </Wrapper>
    );
  }

  const { masterVariant, variants } = product.masterData.current;
  const allVariants = [masterVariant, ...variants];
  const lineItem = findItemInCart(product.id, selectedVariant.id);

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
    setIsModalOpen(true);
  };

  const getImagesForVariant = () => (selectedVariant?.images || []).map((image) => image.url);

  const getPriceForCountry = (data: ProductVariant, currencyCode: CurrencyCode) => {
    const price = data?.prices?.find((p) => p.value.currencyCode === currencyCode);
    return price ? price.value.centAmount / 100 : null;
  };

  const getDiscountedPriceForCountry = (data: ProductVariant, currencyCode: CurrencyCode) => {
    const price = data?.prices?.find((p) => p.value.currencyCode === currencyCode);
    return price && price.discounted ? price.discounted.value.centAmount / 100 : null;
  };

  const images = getImagesForVariant();

  const renderPrice = () => {
    if (!selectedVariant) return null;

    const price = getPriceForCountry(selectedVariant, 'USD');
    const discPrice = getDiscountedPriceForCountry(selectedVariant, 'USD');

    if (!price) return <p>Price not set yet!</p>;

    return (
      <div className={`${styles.price}`}>
        {discPrice ? (
          <>
            <span className={`${styles.product__oldPrice}`}>${price.toFixed(2)}</span>{' '}
            <span className={`${styles.product__discPrice}`}>${discPrice.toFixed(2)}</span>
          </>
        ) : (
          <span>${price.toFixed(2)}</span>
        )}
      </div>
    );
  };

  const { description } = product.masterData.current;
  const formattedDescription = (description && description['en-US']) || 'No description';

  const renderAddToCart = () => {
    if (!lineItem) {
      return (
        <Button
          addedClass={`${styles.product_cartButton}`}
          innerText="Add to Cart"
          styling="secondary"
          type="button"
          variant="default"
          onClick={() => {
            addLineItem(product.id, selectedVariant.id);
          }}
          disabled={isCartLoading}
        />
      );
    }
    return (
      <FlexContainer style={{ flexDirection: 'column' }}>
        <FlexContainer style={{ gap: '1rem' }}>
          <Button
            addedClass={`${styles.product_cartButton}`}
            innerText="+"
            styling="secondary"
            type="button"
            variant="default"
            onClick={() => {
              addLineItem(product.id, selectedVariant.id);
            }}
            disabled={isCartLoading}
          />
          <Button
            addedClass={`${styles.product_cartButton}`}
            innerText="-"
            styling="secondary"
            type="button"
            variant="default"
            onClick={() => {
              removeLineItem(lineItem.id);
            }}
            disabled={isCartLoading}
          />
        </FlexContainer>
      </FlexContainer>
    );
  };

  return (
    <Suspense fallback={<LoaderSpinner />}>
      <div className={`${styles.product_header}`}>
        <AnimatedContainer>
          <Wrapper>
            <div className={`${styles.product_headerInfo}`}>
              {renderPrice()}
              {lineItem && <p>In cart: {lineItem.quantity}</p>}
              {renderAddToCart()}
            </div>
          </Wrapper>
        </AnimatedContainer>
      </div>
      <AnimatedContainer>
        <Wrapper>
          <div className={`${styles.product__block}`}>
            <div className={`${styles.product__description}`}>
              <h2>{product.masterData.current.name['en-US']}</h2>
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
      </AnimatedContainer>
    </Suspense>
  );
}
