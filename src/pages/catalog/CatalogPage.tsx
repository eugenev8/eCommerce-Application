/* eslint-disable no-case-declarations */
import {
  FacetResults,
  ProductProjection,
} from '@commercetools/platform-sdk/dist/declarations/src/generated/models/product';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import ProductCard from '../../components/productCard/productCard';
import styles from './CatalogPage.module.scss';

import Filter from '../../components/filter/Filter';

import Wrapper from '../../components/wrapper/Wrapper';
import apiRoots from '../../sdk/apiRoots';
import { FACETS_NAMES, SORTING_TYPES } from './types';
import { querySlice, QueryState } from '../../reducers/QuerySlice';

export default function CatalogPage() {
  const [products, setProducts] = useState<ProductProjection[]>([]);
  const [facets, setFacets] = useState<FacetResults | null>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const queryState = useAppSelector((state) => state.queryReducer);

  function getQueryStateFromSearchParams(params: URLSearchParams) {
    const urlQueryState: QueryState = {
      sort: params.get('sort') || 'price desc',
      filters: [...params.entries()]
        .filter((param) => param[0] !== 'sort')
        .map((param) => ({ attribute: param[0], values: param[1].split(',') })),
    };
    return urlQueryState;
  }

  useEffect(() => {
    async function getProducts() {
      const facetQueries = FACETS_NAMES.map((facet) => `variants.attributes.${facet.attribute}`);
      const urlQueryState = getQueryStateFromSearchParams(searchParams);
      dispatch(querySlice.actions.loadQueriesFromParams(urlQueryState));

      const queryArgs = {
        queryArgs: {
          facet: facetQueries,
          sort: [urlQueryState.sort], //  ['price desc'], ['name.en-us asc']
          filter: urlQueryState.filters.map(
            (filter) => `variants.attributes.${filter.attribute}:${filter.values.join(',')}`
          ),
        },
      };
      const searchRes = await apiRoots.CredentialsFlow.productProjections().search().get(queryArgs).execute().then();
      setFacets(searchRes.body.facets);
      setProducts(searchRes.body.results);
    }
    getProducts();
  }, [dispatch, searchParams]);

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
