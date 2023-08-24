import React from 'react';

import './FlexContainer.scss';

interface ContainerProps extends React.ComponentProps<'div'> {
  style?: React.CSSProperties;
}

export default function FlexContainer({ children, style }: ContainerProps) {
  return (
    <div className="d-flex" style={style}>
      {children}
    </div>
  );
}

FlexContainer.defaultProps = {
  style: undefined,
};
