import { useEffect, useState } from 'react';
import { Category } from '@commercetools/platform-sdk';
import { useAppSelector } from './redux';

export default function useCategoriesPath(categoryName: string) {
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

    const categoryId = categories?.find((cat) => cat.name['en-US'] === categoryName)?.id;
    if (categoryId) {
      const path = getCategoriesPathFromState(categoryId);
      setCategoriesPath(path.reverse());
    } else setCategoriesPath([]);
  }, [categories, categoryName]);

  return categoriesPath;
}
