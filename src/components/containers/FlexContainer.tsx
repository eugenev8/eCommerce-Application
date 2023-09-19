import React from 'react';
import styles from './FlexContainer.module.scss';

interface ContainerProps extends React.ComponentProps<'div'> {
  style?: React.CSSProperties;
  className?: string;
}

export default function FlexContainer({ children, style, className }: ContainerProps) {
  return (
    <div className={`${styles['d-flex']} ${className || ''}`} style={style}>
      {children}
    </div>
  );
}

FlexContainer.defaultProps = {
  style: undefined,
  className: undefined,
};
