import { useEffect, useState } from 'react';
import {
  FacetResults,
  ProductProjection,
} from '@commercetools/platform-sdk/dist/declarations/src/generated/models/product';
import { useSearchParams } from 'react-router-dom';
import { querySlice, QueryState } from '../reducers/QuerySlice';
import { FACETS_NAMES } from '../pages/catalog/types';
import apiRoots from '../sdk/apiRoots';
import { useAppDispatch } from './redux';

export default function useUrlParams() {
  const [products, setProducts] = useState<ProductProjection[]>([]);
  const [facets, setFacets] = useState<FacetResults | null>(null);
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();

  function getQueryStateFromSearchParams(params: URLSearchParams) {
    const urlQueryState: QueryState = {
      sort: '',
      filters: [],
    };

    [...params.entries()].forEach((param) => {
      const [attribute, values] = param;
      switch (attribute) {
        case 'sort':
          urlQueryState.sort = values;
          break;
        case 'price':
          urlQueryState.sort = values;
          break;
        default:
          // eslint-disable-next-line no-case-declarations
          const facetInfo = FACETS_NAMES.find((facet) => facet.attribute === attribute);
          if (facetInfo) {
            urlQueryState.filters.push({ ...facetInfo, values: values.split(',') });
          }
      }
    });

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
          sort: [urlQueryState.sort],
          filter: urlQueryState.filters.map((filter) => `${filter.query}:${filter.values.join(',')}`),
        },
      };
      const searchRes = await apiRoots.CredentialsFlow.productProjections().search().get(queryArgs).execute();
      setFacets(searchRes.body.facets);
      setProducts(searchRes.body.results);
    }
    getProducts();
  }, [dispatch, searchParams]);

  return { products, facets };
}
