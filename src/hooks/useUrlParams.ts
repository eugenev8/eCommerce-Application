import { useEffect, useState } from 'react';
import {
  FacetResults,
  ProductProjection,
} from '@commercetools/platform-sdk/dist/declarations/src/generated/models/product';
import { useParams, useSearchParams } from 'react-router-dom';
import { queryActions, QueryState } from '../reducers/QuerySlice';
import { FACETS_NAMES, INITIAL_SORTING_TYPE, PRICE_FACET, SEARCH_FACET } from '../pages/catalog/types';
import apiRoots from '../sdk/apiRoots';
import { useAppDispatch, useAppSelector } from './redux';
import useCategoriesMethods from './useCategoriesMethods';
import { PaginationType } from '../components/pagination/Pagination';

type QueryType = {
  queryArgs: {
    markMatchingVariants?: boolean;
    filter: string[];
    'filter.facets'?: string | string[];
    'filter.query'?: string | string[];
    facet?: string[];
    sort?: string | string[];
    limit?: number;
    offset?: number;
    'text.EN-US'?: string;
    fuzzy?: boolean;
  };
};

function getPriceParamsFromString(stringValues: string) {
  const values = stringValues.slice(1, -1).split(' ');
  return [values[0], values[2]];
}

export default function useUrlParams() {
  const [products, setProducts] = useState<ProductProjection[] | null>(null);
  const [facets, setFacets] = useState<FacetResults | null>(null);
  const [pagination, setPagination] = useState<PaginationType>();
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const { categoryName, subcategoryName } = useParams();
  const { categories, isLoading: isLoadingCategories } = useAppSelector((state) => state.categoriesReducer);

  const { getCategoryIdByName } = useCategoriesMethods();
  function getQueryStateFromSearchParams(params: URLSearchParams) {
    function getCategoryIdFromParams() {
      const catName = subcategoryName || categoryName || '';
      return getCategoryIdByName(catName);
    }

    const urlQueryState: QueryState = {
      sort: INITIAL_SORTING_TYPE.queryString,
      filters: [],
      search: '',
      priceFilter: null,
      category: getCategoryIdFromParams(),
      limit: 10,
      offset: 0,
    };

    [...params.entries()].forEach((param) => {
      const [attribute, values] = param;

      switch (attribute) {
        case 'sort':
          urlQueryState.sort = values;
          break;
        case PRICE_FACET.attribute:
          urlQueryState.priceFilter = { ...PRICE_FACET, values: getPriceParamsFromString(values) };
          break;
        case SEARCH_FACET.attribute:
          urlQueryState.search = values;
          break;
        case 'limit':
          urlQueryState.limit = +values;
          break;
        case 'offset':
          urlQueryState.offset = +values;
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
      if (isLoadingCategories || !categories) return Promise.reject(Error('No categories'));
      const facetQueries = FACETS_NAMES.map((facet) => facet.query);
      facetQueries.push(PRICE_FACET.query);

      const urlQueryState = getQueryStateFromSearchParams(searchParams);
      dispatch(queryActions.loadQueriesFromParams(urlQueryState));

      const query: QueryType = {
        queryArgs: {
          facet: facetQueries,
          sort: [urlQueryState.sort],
          markMatchingVariants: true,
          filter: urlQueryState.filters.map((filter) => `${filter.query}:${filter.values.join(',')}`),
          'text.EN-US': '',
          fuzzy: true,
          limit: urlQueryState.limit,
          offset: urlQueryState.offset,
        },
      };
      if (urlQueryState.priceFilter)
        query.queryArgs.filter.push(
          `${PRICE_FACET.query}:range (${urlQueryState.priceFilter.values[0]} to ${urlQueryState.priceFilter.values[1]})`
        );

      if (urlQueryState.search) query.queryArgs['text.EN-US'] = urlQueryState.search;

      if (urlQueryState.category) {
        query.queryArgs.filter.push(`categories.id: subtree("${urlQueryState.category}")`);
        query.queryArgs['filter.facets'] = `categories.id: subtree("${urlQueryState.category}")`;
      }
      if (urlQueryState.limit) query.queryArgs.limit = urlQueryState.limit;

      if (urlQueryState.offset) query.queryArgs.offset = urlQueryState.offset;

      const searchRes = await apiRoots.CredentialsFlow.productProjections().search().get(query).execute();
      return { data: searchRes.body, urlState: urlQueryState };
    }

    getProducts()
      .then(({ data, urlState }) => {
        setFacets(data.facets);
        setProducts(data.results);

        if (data.total) {
          setPagination({
            limit: urlState.limit,
            offset: urlState.offset,
            total: data.total,
          });
        }
      })
      .catch((error) => error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, searchParams, categoryName, subcategoryName, isLoadingCategories]);

  return { products, facets, pagination };
}
