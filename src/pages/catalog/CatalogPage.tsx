import { useNavigate } from 'react-router-dom';
import { ProductProjection } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/product';
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
    navigate(`./?${queryUrl.toString()}`);
  };

  function handleChangeSortType(newSortType: string) {
    dispatch(querySlice.actions.setSortType(newSortType));
  }

  const getVariantIdForRender = (product: ProductProjection) => {
    const { masterVariant, variants } = product;
    const allVariants = [masterVariant, ...variants];
    return allVariants.find((variant) => variant.isMatchingVariant)?.id || 1;
  };

  return (
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
          {products && products.length ? (
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
          )}
        </div>
      </div>
    </Wrapper>
  );
}
