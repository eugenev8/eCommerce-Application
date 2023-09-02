import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import ProductCard from '../../components/productCard/productCard';
import styles from './CatalogPage.module.scss';
import Filter from '../../components/filter/Filter';
import Wrapper from '../../components/wrapper/Wrapper';
import { PRICE_FACET, SORTING_TYPES } from './types';
import PriceFilter from '../../components/priceFilter/PriceFilter';
import useUrlParams from '../../hooks/useUrlParams';
import { querySlice } from '../../reducers/QuerySlice';

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

  function handleFilter() {
    const queryUrl = new URLSearchParams();
    if (queryState.sort) queryUrl.set('sort', queryState.sort);
    queryState.filters.forEach((filter) => {
      queryUrl.set(filter.attribute, filter.values.join(','));
    });
    if (queryState.priceFilter) {
      const priceFilterQuery = createPriceFilterQuery(queryState.priceFilter.values);
      if (!priceFilterQuery) {
        console.log('Min>=Max!');
        return;
      }
      queryUrl.set(queryState.priceFilter.attribute, priceFilterQuery);
    }
    navigate(`./?${queryUrl.toString()}`);
  }

  function handleChangeSortType(newSortType: string) {
    dispatch(querySlice.actions.setSortType(newSortType));
  }

  return (
    <Wrapper>
      <h2>Catalog</h2>
      <button type="button" onClick={handleFilter}>
        Filter
      </button>
      <select onChange={(e) => handleChangeSortType(e.target.value)} value={queryState.sort}>
        {SORTING_TYPES.map((type) => (
          <option key={type.name} value={type.queryString}>
            {type.name}
          </option>
        ))}
      </select>

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

      {products.length ? (
        <div className={styles.catalog}>
          {products.map((productProjection) => {
            return <ProductCard productProjection={productProjection} key={productProjection.id} />;
          })}
        </div>
      ) : (
        <p>Items not found, disable some filters!</p>
      )}
    </Wrapper>
  );
}
