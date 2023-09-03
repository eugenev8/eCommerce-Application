import { useEffect, useState } from 'react';
import { Category } from '@commercetools/platform-sdk';
import { useAppSelector } from './redux';

export default function useCategoriesPath(categoryId: string) {
  const [categoriesPath, setCategoriesPath] = useState<Category[]>([]);
  const categories = useAppSelector((state) => state.categoriesReducer.categories);

  useEffect(() => {
    function getCategoriesPathFromState(catId: string | undefined): Category[] {
      if (!catId) return [];
      const curCategory = categories?.find((cat) => cat.id === catId);
      if (!curCategory) {
        return [];
      }
      const parentCategory = getCategoriesPathFromState(curCategory.parent?.id);

      return parentCategory.length ? [curCategory, ...parentCategory] : [curCategory];
    }

    const path = getCategoriesPathFromState(categoryId);

    setCategoriesPath(path.reverse());
  }, [categories, categoryId]);

  return categoriesPath;
}
