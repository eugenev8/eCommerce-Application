import React from 'react';
import styles from './ColoredContainer.module.scss';

interface ContainerProps extends React.ComponentProps<'div'> {
  style?: React.CSSProperties;
}

export default function ColoredContainer({ children, style }: ContainerProps) {
  return (
    <div className={styles['bg-colored']} style={style}>
      {children}
    </div>
  );
}

ColoredContainer.defaultProps = {
  style: undefined,
};
