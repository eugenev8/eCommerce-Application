import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';
import ProductCard from '../../components/productCard/productCard';
import styles from './CatalogPage.module.scss';
import Filter from '../../components/filter/Filter';
import Wrapper from '../../components/wrapper/Wrapper';
import { SORTING_TYPES } from './types';
import PriceFilter from '../../components/rangeFilter/PriceFilter';
import useUrlParams from '../../hooks/useUrlParams';

export default function CatalogPage() {
  const navigate = useNavigate();
  const queryState = useAppSelector((state) => state.queryReducer);

  const { facets, products } = useUrlParams();

  function handleFilter() {
    const queryUrl = new URLSearchParams();
    queryUrl.set('sort', queryState.sort);
    queryState.filters.forEach((filter) => {
      queryUrl.set(filter.attribute, filter.values.join(','));
    });
    navigate(`./?${queryUrl.toString()}`);
  }

  function handleChangeSortType(newType: string) {
    const queryUrl = new URLSearchParams();
    queryUrl.set('sort', newType);
    queryState.filters.forEach((filter) => {
      queryUrl.set(filter.attribute, filter.values.join(','));
    });
    navigate(`./?${queryUrl.toString()}`);
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
            const [attribute] = facetData;
            if (attribute === 'ss') return <PriceFilter facet={facetData} key={attribute} />;
            return <Filter facet={facetData} key={facetData[0]} />;
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
