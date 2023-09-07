import { useParams } from 'react-router-dom';
import React from 'react';
import useCategoriesPath from '../../hooks/useCategoriesPath';
import { NAME_LOCALE } from '../../pages/catalog/types';
import Crumb from './Crumb';

interface DynamicCatalogCrumbProps {
  catalogPath: string;
}

export default function DynamicCrumb({ catalogPath }: DynamicCatalogCrumbProps) {
  const { categoryName } = useParams();
  const categoriesList = useCategoriesPath(categoryName || '');

  return categoriesList.map((category) => {
    return (
      <Crumb
        path={`${catalogPath}/${category.name[NAME_LOCALE]}`}
        title={category.name[NAME_LOCALE]}
        key={category.name[NAME_LOCALE]}
      />
    );
  });
}
