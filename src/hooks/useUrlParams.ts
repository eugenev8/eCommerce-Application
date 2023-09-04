import { useEffect, useState } from 'react';
import {
  FacetResults,
  ProductProjection,
} from '@commercetools/platform-sdk/dist/declarations/src/generated/models/product';
import { useSearchParams } from 'react-router-dom';
import { querySlice, QueryState } from '../reducers/QuerySlice';
import { FACETS_NAMES, PRICE_FACET, SEARCH_FACET, SORTING_TYPES } from '../pages/catalog/types';
import apiRoots from '../sdk/apiRoots';
import { useAppDispatch } from './redux';

function getPriceParamsFromString(stringValues: string) {
  const values = stringValues.slice(1, -1).split(' ');
  return [values[0], values[2]];
}

export default function useUrlParams() {
  const [products, setProducts] = useState<ProductProjection[]>([]);
  const [facets, setFacets] = useState<FacetResults | null>(null);
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();

  function getQueryStateFromSearchParams(params: URLSearchParams) {
    const urlQueryState: QueryState = {
      sort: SORTING_TYPES[0].queryString,
      filters: [],
      search: '',
      category: '',
      priceFilter: null,
    };

    [...params.entries()].forEach((param) => {
      const [attribute, values] = param;
      switch (attribute) {
        case 'sort':
          urlQueryState.sort = values;
          break;
        case 'categories.id':
          urlQueryState.category = values;
          break;
        case PRICE_FACET.attribute:
          urlQueryState.priceFilter = { ...PRICE_FACET, values: getPriceParamsFromString(values) };
          break;
        case SEARCH_FACET.attribute:
          urlQueryState.search = values;
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
      const facetQueries = FACETS_NAMES.map((facet) => facet.query);
      facetQueries.push(PRICE_FACET.query);

      const urlQueryState = getQueryStateFromSearchParams(searchParams);

      dispatch(querySlice.actions.loadQueriesFromParams(urlQueryState));

      const queryArgs = {
        queryArgs: {
          facet: facetQueries,
          sort: [urlQueryState.sort],
          markMatchingVariants: true,
          filter: urlQueryState.filters.map((filter) => `${filter.query}:${filter.values.join(',')}`),
        },
      };
      if (urlQueryState.priceFilter)
        queryArgs.queryArgs.filter.push(
          `${PRICE_FACET.query}:range (${urlQueryState.priceFilter.values[0]} to ${urlQueryState.priceFilter.values[1]})`
        );

      if (urlQueryState.search) queryArgs.queryArgs.filter.push(`${SEARCH_FACET.query}:"${urlQueryState.search}"`);

      if (urlQueryState.category)
        queryArgs.queryArgs.filter.push(`categories.id: subtree("${urlQueryState.category}")`);
      const searchRes = await apiRoots.CredentialsFlow.productProjections().search().get(queryArgs).execute();
      setFacets(searchRes.body.facets);
      setProducts(searchRes.body.results);
    }
    getProducts();
  }, [dispatch, searchParams]);

  return { products, facets };
}
