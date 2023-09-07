import React from 'react';
import styles from './Wrapper.module.scss';

interface WrapperProps extends React.ComponentProps<'div'> {
  style?: React.CSSProperties;
}

export default function Wrapper({ children, style }: WrapperProps) {
  return (
    <div className={styles.wrapper} style={style}>
      {children}
    </div>
  );
}

Wrapper.defaultProps = {
  style: undefined,
};
