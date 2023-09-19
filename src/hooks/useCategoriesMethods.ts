import { Category } from '@commercetools/platform-sdk';
import { useAppSelector } from './redux';
import { NAME_LOCALE } from '../sdk/types';
import { ROOT_CATEGORY } from '../reducers/QuerySlice';

interface CategoryNode {
  key: string;
  title: string;
  children?: CategoryNode[];
}

export default function useCategoriesMethods() {
  const categories = useAppSelector((state) => state.categoriesReducer.categories);

  function createCategoriesTree(category: Category): CategoryNode {
    return {
      key: category.id,
      title: category.name[NAME_LOCALE],
      children: categories?.filter((cat) => cat.parent?.id === category.id).map((cat) => createCategoriesTree(cat)),
    };
  }

  function getCategoriesTree(): CategoryNode[] {
    return [
      {
        key: ROOT_CATEGORY,
        title: 'All products',
        children: categories?.filter((cat) => !Object.hasOwn(cat, 'parent')).map((cat) => createCategoriesTree(cat)),
      },
    ];
  }

  function getCategoriesPathFromState(catId: string | undefined): Category[] {
    if (!catId) return [];
    const curCategory = categories?.find((cat) => cat.id === catId);
    if (!curCategory) {
      return [];
    }
    const parentCategory = getCategoriesPathFromState(curCategory.parent?.id);
    return parentCategory.length ? [curCategory, ...parentCategory] : [curCategory];
  }

  function getCategoryIdByName(categoryName: string) {
    return categories?.find((cat) => cat.name[NAME_LOCALE] === categoryName)?.id;
  }

  function getCategoriesPathByCategoryId(categoryId: string) {
    if (!categoryId) return '';
    return getCategoriesPathFromState(categoryId)
      .reverse()
      .map((cat) => cat.name[NAME_LOCALE])
      .join('/');
  }

  return { getCategoriesPathByCategoryId, getCategoryIdByName, getCategoriesTree };
}
