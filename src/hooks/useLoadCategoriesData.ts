import { useEffect } from 'react';
import { useAppDispatch } from './redux';
import { getCategories } from '../reducers/ActionCreators/Categories';

export default function useLoadCategoriesData() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);
}
