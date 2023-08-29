import {
  FacetResults,
  ProductProjection,
} from '@commercetools/platform-sdk/dist/declarations/src/generated/models/product';
import { useReducer, useState } from 'react';
import Wrapper from '../../components/wrapper/Wrapper';
import apiRoots from '../../sdk/apiRoots';
import ProductCard from '../../components/productCard/productCard';
import styles from './CatalogPage.module.scss';

import { QueryAction, QueryActionKind, QueryState } from './types';
import Filter from '../../components/filter/Filter';

function queryReducer(state: QueryState, action: QueryAction) {
  const { type, payload } = action;

  switch (type) {
    case QueryActionKind.AddFilterQuery:
      return { ...state, filters: [...state.filters, payload] };
    case QueryActionKind.RemoveFilterQuery:
      return { ...state, filters: state.filters.filter((query) => query !== payload) };
    case QueryActionKind.ChangeSorting:
      return { ...state, sort: payload };
    default:
      return state;
  }
}

export default function CatalogPage() {
  const [products, setProducts] = useState<ProductProjection[]>([]);
  const [facets, setFacets] = useState<FacetResults | null>(null);

  const initialQueryState: QueryState = {
    filters: [], // from url address
    sort: 'price desc', // from url address
    facet: [
      'variants.attributes.OS',
      'variants.attributes.CPU',
      'variants.attributes.RAM',
      'variants.attributes.HDD',
      'variants.attributes.Diagonal',
    ],
  };
  const [queryState, dispatchQuery] = useReducer(queryReducer, initialQueryState);

  function handleGetFilters() {
    async function getFilters() {
      const queryArgs = {
        queryArgs: {
          facet: queryState.facet,
          filter: queryState.filters,
          sort: [queryState.sort], //  ['price desc'], ['name.en-us asc']
        },
      };
      const searchRes = await apiRoots.CredentialsFlow.productProjections().search().get(queryArgs).execute();
      setFacets(searchRes.body.facets);
      setProducts(searchRes.body.results);
    }
    getFilters();
  }

  return (
    <Wrapper>
      <h2>Catalog</h2>
      {/* <button type="button" onClick={handleGetProducts}> */}
      {/*  Get Products */}
      {/* </button> */}
      <button type="button" onClick={handleGetFilters}>
        Get Filters
      </button>
      <div className={styles.catalog}>
        {facets &&
          Object.entries(facets).map((facetData) => {
            // eslint-disable-next-line react/jsx-no-undef
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
