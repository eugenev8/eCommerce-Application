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
import { querySlice, QueryState } from '../../reducers/QuerySlice';
import toaster from '../../services/toaster';
import ProductCard, {
  getDiscountedPriceForCountry,
  getPriceForCountry,
} from '../../components/productCard/ProductCard';
import ProductCardsContainer from '../../components/containers/ProductCardsContainer';
import CategoryFilter from '../../components/categoryFilter/CategoryFilter';
import TextFilter from '../../components/textFilter/TextFilter';

type VariantToRender = ProductProjection & {
  variantToRender: number;
};

type ValidVariants = ProductProjection & {
  validIds: number[];
};

const filterVariantsByQuery = (productProjections: ProductProjection[], query: QueryState) => {
  const { filters, priceFilter } = query;

  return productProjections.map((product) => {
    const allVariants = [product.masterVariant, ...product.variants];
    const filtered = allVariants.filter((variant) => {
      return filters.every((filter) => {
        const attribute = variant.attributes?.find((attr) => attr.name === filter.attribute);

        if (!attribute) {
          return false;
        }

        if (priceFilter && variant.prices) {
          const discPrice = variant.prices[0].discounted?.value.centAmount;
          const price = variant.prices[0].value.centAmount;
          const minPrice = Number(priceFilter.values[0]);
          const maxPrice = Number(priceFilter.values[1]);

          if (!maxPrice) {
            if (discPrice) return discPrice >= minPrice;
            return price >= minPrice;
          }

          if (!minPrice) {
            if (discPrice) return discPrice <= maxPrice;
            return price <= maxPrice;
          }

          if (discPrice) return discPrice >= minPrice && discPrice <= maxPrice;
          return price >= minPrice && price <= maxPrice;
        }

        if (filter.values.length > 1) {
          return filter.values.some((value) => {
            if (typeof attribute.value === 'number') {
              return Number(value.toString().replace(/"/g, '')) === attribute.value;
            }

            return value.toString().replace(/"/g, '') === attribute.value;
          });
        }

        if (typeof attribute.value === 'number') {
          return Number(filter.values[0].toString().replace(/"/g, '')) === attribute.value;
        }

        return filter.values[0].toString().replace(/"/g, '') === attribute.value;
      });
    });

    return { ...product, validIds: filtered.map((variant) => variant.id) };
  });
};

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
  const [filteredProducts, setFilteredProducts] = useState<ValidVariants[]>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    setFilteredProducts(filterVariantsByQuery(products, queryState));
  }, [products, queryState]);

  function handleFilter() {
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
    if (queryState.category) {
      queryUrl.set('categories.id', queryState.category);
    }

    if (queryState.search) queryUrl.set('search', queryState.search.toLowerCase());

    if (queryState.sort) queryUrl.set('sort', queryState.sort);
    navigate(`./?${queryUrl.toString()}`);
  }

  function handleChangeSortType(newSortType: string) {
    dispatch(querySlice.actions.setSortType(newSortType));
  }

  const generateAllItemsOnPage = () => {
    const items: VariantToRender[] = [];

    if (!filteredProducts) {
      return null;
    }

    filteredProducts.forEach((product) => {
      product.validIds.forEach((id) => {
        items.push({ ...product, variantToRender: id });
      });
    });

    return items;
  };
  const sortAllItemsOnPage = (items: VariantToRender[]) => {
    items.sort((a, b) => {
      const variantA =
        a.variantToRender === 1 ? a.masterVariant : a.variants.find((variant) => variant.id === a.variantToRender);
      const variantB =
        b.variantToRender === 1 ? b.masterVariant : b.variants.find((variant) => variant.id === b.variantToRender);

      if (!variantA || !variantB) {
        return 0;
      }

      const discPriceA = getDiscountedPriceForCountry(variantA);
      const discPriceB = getDiscountedPriceForCountry(variantB);
      const priceA = getPriceForCountry(variantA);
      const priceB = getPriceForCountry(variantB);

      if (!priceA || !priceB) {
        return 0;
      }

      if (queryState.sort === 'price asc') {
        return (discPriceA || priceA) - (discPriceB || priceB);
      }

      if (queryState.sort === 'price desc') {
        return (discPriceB || priceB) - (discPriceA || priceA);
      }

      const nameA = a.name['en-US'] || '';
      const nameB = b.name['en-US'] || '';

      if (queryState.sort === 'name.en-us asc') {
        return nameA.localeCompare(nameB);
      }

      if (queryState.sort === 'name.en-us desc') {
        return nameB.localeCompare(nameA);
      }

      return 0;
    });
  };

  const allItemsOnPage = generateAllItemsOnPage();

  if (allItemsOnPage) {
    sortAllItemsOnPage(allItemsOnPage);
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
      <CategoryFilter />

      <TextFilter />
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

      {allItemsOnPage && allItemsOnPage.length ? (
        <ProductCardsContainer>
          {allItemsOnPage &&
            allItemsOnPage.map((productToRender) => {
              return (
                <ProductCard
                  key={productToRender.id + productToRender.variantToRender}
                  productProjection={productToRender}
                  variantID={productToRender.variantToRender}
                  type="small"
                />
              );
            })}
        </ProductCardsContainer>
      ) : (
        <p>Items not found, disable some filters!</p>
      )}
    </Wrapper>
  );
}
