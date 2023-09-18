import React from 'react';
import styles from './AnimatedContainer.module.scss';

interface ContainerProps extends React.ComponentProps<'div'> {
  style?: React.CSSProperties;
  className?: string;
}

export default function AnimatedContainer({ children, style, className }: ContainerProps) {
  return (
    <div className={`${styles.animatedContainer} ${className || ''}`} style={style}>
      {children}
    </div>
  );
}

AnimatedContainer.defaultProps = {
  style: undefined,
  className: undefined,
};
