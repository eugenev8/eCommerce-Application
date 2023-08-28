import { Product } from '@commercetools/platform-sdk';
import { FacetResults } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/product';
import { useState } from 'react';
import Wrapper from '../../components/wrapper/Wrapper';
import apiRoots from '../../sdk/apiRoots';
import TempProduct from './TempProduct';
import styles from './CatalogPage.module.scss';
import Filter from './Filter';

export default function CatalogPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [facets, setFacets] = useState<FacetResults | null>(null);
  function handleGetProducts() {
    async function getProducts() {
      const productsRes = await apiRoots.CredentialsFlow.products().get().execute();
      setProducts(productsRes.body.results);
    }
    getProducts();
  }

  function handleGetFilters() {
    async function getFilters() {
      const queryArgs = {
        queryArgs: {
          facet: [
            'variants.attributes.OS',
            'variants.attributes.CPU',
            'variants.attributes.RAM',
            'variants.attributes.HDD',
            'variants.attributes.Diagonal',
          ],
        },
      }; // 'categories.id',
      const searchRes = await apiRoots.CredentialsFlow.productProjections().search().get(queryArgs).execute();
      setFacets(searchRes.body.facets);
    }
    getFilters();
  }

  return (
    <Wrapper>
      <h2>Catalog</h2>
      <button type="button" onClick={handleGetProducts}>
        Get Products
      </button>
      <button type="button" onClick={handleGetFilters}>
        Get Filters
      </button>
      <div className={styles.catalog}>
        {facets &&
          Object.entries(facets).map((facetData) => {
            return <Filter facet={facetData} key={facetData[0]} />;
          })}
      </div>

      {products.length && (
        <div className={styles.catalog}>
          {products.map((product) => {
            return <TempProduct product={product} key={product.id} />;
          })}
        </div>
      )}
    </Wrapper>
  );
}
