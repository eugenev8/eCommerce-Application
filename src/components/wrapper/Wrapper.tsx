import React from 'react';
import styles from './Wrapper.module.scss';

interface WrapperProps extends React.ComponentProps<'div'> {
  style?: React.CSSProperties;
  className?: string;
}

export default function Wrapper({ children, style, className }: WrapperProps) {
  return (
    <div className={`${styles.wrapper} ${className}`} style={style}>
      {children}
    </div>
  );
}

Wrapper.defaultProps = {
  style: undefined,
  className: '',
};
