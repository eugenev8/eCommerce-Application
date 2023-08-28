import { Product } from '@commercetools/platform-sdk';
import styles from './TempProduct.module.scss';
import TempVariant from './TempVariant';

type TempProductProps = {
  product: Product;
};

function TempProduct({ product }: TempProductProps) {
  const { name, categories, variants, masterVariant } = product.masterData.current;
  // variants.unshift(masterVariant);
  const allVariants = [masterVariant, ...variants];
  const locale = 'en-US';

  return (
    <div className={styles.product}>
      <p>{name[locale]}</p>
      <p>Cat. :{categories[0].id.slice(0, 12)}...</p>

      <p>Variants {allVariants.length}</p>

      {allVariants.map((variant) => (
        <TempVariant className={styles.product__variant} variant={variant} key={variant.id} />
      ))}

      {/* <p>{vars.images ? vars.images.length : 'no images'}</p>
      {vars.images && vars.images.length && (
        <img className={styles.product__image} src={vars.images[0].url} alt={vars.images[0].label || name[locale]} />
      )} */}
    </div>
  );
}

export default TempProduct;
