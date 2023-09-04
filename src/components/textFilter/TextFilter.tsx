import styles from './TextFilter.module.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { querySlice } from '../../reducers/QuerySlice';

export default function TextFilter() {
  const dispatch = useAppDispatch();

  const searchState = useAppSelector((state) => state.queryReducer.search);

  function handleChangeSearchText(searchText: string) {
    dispatch(querySlice.actions.changeSearchText(searchText));
  }

  return (
    <div className={styles.filter}>
      <h4>Key search</h4>
      <input
        className={styles.input}
        type="text"
        placeholder="Enter key search"
        value={searchState}
        onChange={(e) => handleChangeSearchText(e.target.value)}
      />
    </div>
  );
}
