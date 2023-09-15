import { Link } from 'react-router-dom';
import React from 'react';
import FlexContainer from '../containers/FlexContainer';
import styles from './Breadcrumbs.module.scss';

interface CrumbProps {
  path: string;
  title: string;
}

export default function Crumb({ path, title }: CrumbProps) {
  return (
    <FlexContainer style={{ flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
      <div className={`${styles.breadcrumbText}`}>
        <Link to={path}>{title}</Link>
      </div>
    </FlexContainer>
  );
}
