import Tree from 'rc-tree';
import { Key } from 'rc-tree/es/interface';

import { useNavigate, useSearchParams } from 'react-router-dom';
import 'rc-tree/assets/index.css';
import { useAppSelector } from '../../hooks/redux';

import './CategoryFilter.scss';
import useCategoriesMethods from '../../hooks/useCategoriesMethods';
// eslint-disable-next-line import/no-cycle
import { ROUTES_PATHS } from '../../main';

export default function CategoryFilter() {
  const checkedCat = useAppSelector((state) => state.queryReducer.category);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { getCategoriesTree, getCategoriesPathByCategoryId } = useCategoriesMethods();

  function handleSelect(selectedKeys: Key[]) {
    if (!selectedKeys) return;
    if (selectedKeys[0] === 'root') navigate(`${ROUTES_PATHS.catalog}?${searchParams.toString()}`);
    const categoriesPath = getCategoriesPathByCategoryId(selectedKeys[0].toString());
    navigate(`${ROUTES_PATHS.catalog}/${categoriesPath}?${searchParams.toString()}`);
  }

  return (
    <>
      <h4>Categories</h4>
      <Tree
        selectedKeys={[checkedCat || 'root']}
        showIcon={false}
        treeData={getCategoriesTree()}
        defaultExpandAll
        onSelect={(selectedKeys) => handleSelect(selectedKeys)}
        height={300}
      />
    </>
  );
}
