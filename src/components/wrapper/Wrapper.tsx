import React from 'react';
import './Wrapper.scss';

interface WrapperProps extends React.ComponentProps<'div'> {
  style?: React.CSSProperties;
}

export default function Wrapper({ children, style }: WrapperProps) {
  return (
    <div className="wrapper" style={style}>
      {children}
    </div>
  );
}

Wrapper.defaultProps = {
  style: undefined,
};
