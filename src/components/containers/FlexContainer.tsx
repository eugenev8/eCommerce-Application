import React from 'react';
import styles from './FlexContainer.module.scss';

interface ContainerProps extends React.ComponentProps<'div'> {
  style?: React.CSSProperties;
}

export default function FlexContainer({ children, style }: ContainerProps) {
  return (
    <div className={styles['d-flex']} style={style}>
      {children}
    </div>
  );
}

FlexContainer.defaultProps = {
  style: undefined,
};
