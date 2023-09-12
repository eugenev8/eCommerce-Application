import { useEffect } from 'react';
import { useAppDispatch } from './redux';
import { getCategories } from '../reducers/ActionCreators/CategoriesActions';

export default function useLoadShopData() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function loadShopData() {
      dispatch(getCategories());
    }

    loadShopData();
  }, [dispatch]);
}
