import { NavLink, useParams } from 'react-router-dom';
import React from 'react';
import useCategoriesPath from '../../hooks/useCategoriesPath';
import { NAME_LOCALE } from '../../pages/catalog/types';

interface DynamicCatalogCrumbProps {
  catalogPath: string;
}

export default function DynamicCatalogCrumb({ catalogPath }: DynamicCatalogCrumbProps) {
  const { categoryName } = useParams();
  const categoriesList = useCategoriesPath(categoryName || '');

  return categoriesList.map((category) => {
    return (
      <NavLink key={category.id} to={`${catalogPath}/${category.name[NAME_LOCALE]}`}>
        {category.name[NAME_LOCALE]}
      </NavLink>
    );
  });
}
