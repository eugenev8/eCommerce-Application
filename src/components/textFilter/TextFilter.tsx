import React from 'react';
import styles from './TextFilter.module.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { querySlice } from '../../reducers/QuerySlice';

interface TextFilterProps {
  onEnterKeyPress: () => void; // Callback function to handle Enter key press
}

export default function TextFilter({ onEnterKeyPress }: TextFilterProps) {
  const dispatch = useAppDispatch();

  const searchState = useAppSelector((state) => state.queryReducer.search);

  function handleChangeSearchText(searchText: string) {
    dispatch(querySlice.actions.changeSearchText(searchText));
  }

  function handleKeyPress(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      onEnterKeyPress();
    }
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
        onKeyDown={handleKeyPress}
      />
    </div>
  );
}
