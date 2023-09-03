import { ProductProjection } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/product';
import { Link } from 'react-router-dom';
import styles from './productCard.module.scss';
import TempVariant from './TempVariant';

type TempProductProps = {
  productProjection: ProductProjection;
};

function ProductCard({ productProjection }: TempProductProps) {
  const { name, categories, variants, masterVariant } = productProjection;
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

      <Link to={`./${productProjection.id}`}>Go to page</Link>
    </div>
  );
}

export default ProductCard;
