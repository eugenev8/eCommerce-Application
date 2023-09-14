import { useNavigate } from 'react-router-dom';
import { ProductProjection } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/product';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import styles from './CatalogPage.module.scss';
import Filter from '../../components/filter/Filter';
import Wrapper from '../../components/wrapper/Wrapper';
import { PRICE_FACET, SORTING_TYPES } from './types';
import PriceFilter from '../../components/priceFilter/PriceFilter';
import useUrlParams from '../../hooks/useUrlParams';
import { querySlice } from '../../reducers/QuerySlice';
import toaster from '../../services/toaster';
import ProductCard from '../../components/productCard/ProductCard';
import ProductCardsContainer from '../../components/containers/ProductCardsContainer';
import CategoryFilter from '../../components/categoryFilter/CategoryFilter';
import TextFilter from '../../components/textFilter/TextFilter';
import Button from '../../components/buttons/Buttons';
import LoaderSpinner from '../../components/loader/Loader';
import FlexContainer from '../../components/containers/FlexContainer';
import AnimatedContainer from '../../components/containers/AnimatedContainer';
import useCategoriesMethods from '../../hooks/useCategoriesMethods';

function createPriceFilterQuery(values: string[]) {
  const [min, max] = values;

  if (min !== '*' && max !== '*' && Number(min) >= Number(max)) {
    return '';
  }
  return `(${min} to ${max})`;
}

export default function CatalogPage() {
  const navigate = useNavigate();
  const queryState = useAppSelector((state) => state.queryReducer);
  const { facets, products } = useUrlParams();
  const dispatch = useAppDispatch();
  const [currentSort, setCurrentSort] = useState(queryState.sort);
  const { getCategoriesPathByCategoryId } = useCategoriesMethods();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setCurrentSort(queryState.sort), [products]);

  const handleFilter = () => {
    const queryUrl = new URLSearchParams();
    queryState.filters.forEach((filter) => {
      queryUrl.set(filter.attribute, filter.values.join(','));
    });

    if (queryState.priceFilter) {
      const priceFilterQuery = createPriceFilterQuery(queryState.priceFilter.values);
      if (!priceFilterQuery) {
        toaster.showError('Error in price filter! Specify correct values');
        return;
      }
      queryUrl.set(queryState.priceFilter.attribute, priceFilterQuery);
    }

    if (queryState.search) queryUrl.set('search', queryState.search.toLowerCase());

    if (queryState.sort) queryUrl.set('sort', queryState.sort);

    const categoriesPath = queryState.category ? getCategoriesPathByCategoryId(queryState.category) : '';
    navigate(`./${categoriesPath}?${queryUrl.toString()}`);
  };

  function handleChangeSortType(newSortType: string) {
    dispatch(querySlice.actions.setSortType(newSortType));
  }

  const getVariantIdForRender = (product: ProductProjection) => {
    const { masterVariant, variants } = product;
    const allVariants = [masterVariant, ...variants]
      .map((variant) => {
        const price = variant.prices ? variant.prices[0] : null;
        const discPrice = variant.prices && variant.prices[0].discounted ? variant.prices[0].discounted : null;

        if (discPrice) {
          return {
            id: variant.id,
            price: discPrice,
            isValid: variant.isMatchingVariant,
          };
        }

        return {
          id: variant.id,
          price,
          isValid: variant.isMatchingVariant,
        };
      })
      .filter((variant) => variant.isValid);

    if (currentSort === SORTING_TYPES[0].queryString) {
      allVariants.sort((a, b) => {
        if (a.price && b.price) {
          return b.price.value.centAmount - a.price.value.centAmount;
        }
        return 0;
      });
    } else if (currentSort === SORTING_TYPES[1].queryString) {
      allVariants.sort((a, b) => {
        if (a.price && b.price) {
          return a.price.value.centAmount - b.price.value.centAmount;
        }
        return 0;
      });
    }

    return allVariants[0].id || 1;
  };

  return (
    <AnimatedContainer>
      <Wrapper>
        <h2>Catalog</h2>
        <div className={`${styles.catalog__wrapper}`}>
          <div className={`${styles.catalog__leftBlock}`}>
            <Button
              styling="primary"
              innerText="Apply"
              variant="default"
              type="button"
              addedClass=""
              onClick={handleFilter}
              style={{ margin: '1rem auto' }}
            />

            <select onChange={(e) => handleChangeSortType(e.target.value)} value={queryState.sort}>
              {SORTING_TYPES.map((type) => (
                <option key={type.name} value={type.queryString}>
                  {type.name}
                </option>
              ))}
            </select>
            <CategoryFilter />

            <TextFilter onEnterKeyPress={handleFilter} />
            <div className={styles.catalog}>
              {facets &&
                Object.entries(facets).map((facetData) => {
                  const [queryAttribute] = facetData;
                  if (queryAttribute === PRICE_FACET.query) {
                    return <PriceFilter facet={facetData} key={queryAttribute} />;
                  }
                  return <Filter facet={facetData} key={queryAttribute} />;
                })}
            </div>
          </div>

          <div className={`${styles.catalog__rightBlock}`}>
            {/* eslint-disable-next-line no-nested-ternary */}
            {products ? (
              products.length ? (
                <>
                  <p className={`${styles.catalog__productsFound}`}>Products found: {products.length}</p>
                  <ProductCardsContainer>
                    {products &&
                      products.map((productToRender) => {
                        return (
                          <ProductCard
                            key={productToRender.id}
                            productProjection={productToRender}
                            variantID={getVariantIdForRender(productToRender)}
                            type="small"
                          />
                        );
                      })}
                  </ProductCardsContainer>
                </>
              ) : (
                <p>Items not found, disable some filters!</p>
              )
            ) : (
              <FlexContainer style={{ justifyContent: 'center', alignItems: 'center', minHeight: '40vh' }}>
                <LoaderSpinner />
              </FlexContainer>
            )}
          </div>
        </div>
      </Wrapper>
    </AnimatedContainer>
  );
}
