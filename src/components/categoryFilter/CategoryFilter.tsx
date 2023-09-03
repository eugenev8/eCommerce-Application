import Tree from 'rc-tree';
import { Key } from 'rc-tree/es/interface';
import { Category } from '@commercetools/platform-sdk';
import 'rc-tree/assets/index.css';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { querySlice } from '../../reducers/QuerySlice';

interface CategoryNode {
  key: string;
  title: string;
  children?: CategoryNode[];
}

export default function CategoryFilter() {
  const categories = useAppSelector((state) => state.categoriesReducer.categories);
  const checkedCat = useAppSelector((state) => state.queryReducer.category);
  const dispatch = useAppDispatch();

  function createCategoriesTree(category: Category): CategoryNode {
    return {
      key: category.id,
      title: category.name['en-US'],
      children: categories?.filter((cat) => cat.parent?.id === category.id).map((cat) => createCategoriesTree(cat)),
    };
  }

  const categoriesTree: CategoryNode[] = [
    {
      key: 'root',
      title: 'All products',
      children: categories?.filter((cat) => !Object.hasOwn(cat, 'parent')).map((cat) => createCategoriesTree(cat)),
    },
  ];
  function handleSelect(selectedKeys: Key[]) {
    dispatch(querySlice.actions.changeCategory(selectedKeys[0].toString()));
  }

  return (
    <>
      <h4>Categories</h4>
      <Tree
        selectedKeys={[checkedCat]}
        showIcon={false}
        treeData={categoriesTree}
        defaultExpandAll
        onSelect={(selectedKeys) => handleSelect(selectedKeys)}
        height={300}
      />
    </>
  );
}
