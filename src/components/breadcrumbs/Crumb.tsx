import { Link } from 'react-router-dom';
import React from 'react';
import FlexContainer from '../containers/FlexContainer';
import styles from './Breadcrumbs.module.scss';

interface CrumbProps {
  path: string;
  title: string;
  isLast?: boolean;
}

export default function Crumb({ path, title, isLast }: CrumbProps) {
  return (
    <FlexContainer style={{ flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
      <div className={`${styles.breadcrumbText}`}>{isLast ? title : <Link to={path}>{title}</Link>}</div>
    </FlexContainer>
  );
}

Crumb.defaultProps = {
  isLast: false,
};
