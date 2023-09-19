import React from 'react';
import styles from './ColoredContainer.module.scss';

interface ContainerProps extends React.ComponentProps<'div'> {
  style?: React.CSSProperties;
  className?: string;
}

export default function ColoredContainer({ children, style, className }: ContainerProps) {
  return (
    <div className={`${styles['bg-colored']} ${className || ''}`} style={style}>
      {children}
    </div>
  );
}

ColoredContainer.defaultProps = {
  style: undefined,
  className: undefined,
};
