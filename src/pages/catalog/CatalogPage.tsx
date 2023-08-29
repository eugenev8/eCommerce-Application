/* eslint-disable no-case-declarations */
import {
  FacetResults,
  ProductProjection,
} from '@commercetools/platform-sdk/dist/declarations/src/generated/models/product';
import { useEffect, useReducer, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import ProductCard from '../../components/productCard/productCard';
import styles from './CatalogPage.module.scss';

import Filter from '../../components/filter/Filter';
import { queryReducer, QueryState } from '../../reducers/queryReducer';

import Wrapper from '../../components/wrapper/Wrapper';
import apiRoots from '../../sdk/apiRoots';
import { FacetQueries } from './types';

export default function CatalogPage() {
  const [products, setProducts] = useState<ProductProjection[]>([]);
  const [facets, setFacets] = useState<FacetResults | null>(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const initialQueryState: QueryState = {
    filters: [], // from url address
    sort: 'price desc', // from url address
    facet: FacetQueries,
  };
  const [queryState, dispatchQuery] = useReducer(queryReducer, initialQueryState);

  useEffect(() => {
    async function getProducts() {
      const queryArgs = {
        queryArgs: {
          facet: FacetQueries,
          sort: [searchParams.get('sort') || initialQueryState.sort], //  ['price desc'], ['name.en-us asc']
          filter: [...searchParams.entries()]
            .filter((param) => param[0] !== 'sort')
            .map((param) => `variants.attributes.${param[0]}:${param[1]}`),
        },
      };
      const searchRes = await apiRoots.CredentialsFlow.productProjections().search().get(queryArgs).execute().then();
      setFacets(searchRes.body.facets);
      setProducts(searchRes.body.results);
    }

    getProducts();
  }, [initialQueryState.sort, searchParams]);

  function handleFilter() {
    const queryUrl = new URLSearchParams();
    queryUrl.set('sort', queryState.sort);
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
      <div className={styles.catalog}>
        {facets &&
          Object.entries(facets).map((facetData) => {
            return <Filter facet={facetData} dispatchQuery={dispatchQuery} key={facetData[0]} />;
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
