import React from 'react';
import styles from './AnimatedContainer.module.scss';

interface ContainerProps extends React.ComponentProps<'div'> {
  style?: React.CSSProperties;
}

export default function AnimatedContainer({ children, style }: ContainerProps) {
  return (
    <div className={`${styles.animatedContainer}`} style={style}>
      {children}
    </div>
  );
}

AnimatedContainer.defaultProps = {
  style: undefined,
};
