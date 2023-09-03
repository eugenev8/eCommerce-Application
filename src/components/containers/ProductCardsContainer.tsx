import { ReactNode } from 'react';
import styles from './ProductCardsContainer.module.scss';

type ProductCardsContainerProps = {
  children: ReactNode;
};
export default function ProductCardsContainer({ children }: ProductCardsContainerProps) {
  return <div className={`${styles.productCardsContainer}`}>{children}</div>;
}
