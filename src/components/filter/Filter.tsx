import { FacetResult } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/product';
import React from 'react';
import { FACETS_NAMES } from '../../pages/catalog/types';
import styles from './Filter.module.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { querySlice } from '../../reducers/QuerySlice';

type FilterProps = {
  facet: [string, FacetResult];
};

export default function Filter({ facet }: FilterProps) {
  const { filters } = useAppSelector((state) => state.queryReducer);
  const dispatch = useAppDispatch();

  const [facetName, facetData] = facet;

  const attribute = facetName.slice(facetName.lastIndexOf('.') + 1);
  const filterTitle = FACETS_NAMES.find((item) => item.attribute === attribute)?.nameEn || 'No name';
  const filter = filters.find((item) => item.attribute === attribute);

  function handleAdd(value: string) {
    dispatch(querySlice.actions.addFilterQuery({ attribute, value }));
  }

  function handleRemove(value: string) {
    dispatch(querySlice.actions.removeFilterQuery({ attribute, value }));
  }

  function handleClickCheckbox(value: boolean, attributeStr: string) {
    if (value) {
      handleAdd(attributeStr);
    } else {
      handleRemove(attributeStr);
    }
  }

  return (
    <div className={styles.filter}>
      <h4>{filterTitle}</h4>
      {facetData.type === 'terms' &&
        facetData.terms.map((term) => {
          return (
            <p key={term.term}>
              <input
                type="checkbox"
                checked={!!(filter && filter.values.includes(`"${term.term}"`))}
                onChange={(e) => handleClickCheckbox(e.target.checked, `"${term.term}"`)}
                id={term.term}
              />
              <label htmlFor={term.term}>{`${term.term}  (${term.count})`}</label>
            </p>
          );
        })}
    </div>
  );
}
