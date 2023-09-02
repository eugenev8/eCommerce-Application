import {
  FacetResult,
  FilteredFacetResult,
  RangeFacetResult,
  TermFacetResult,
} from '@commercetools/platform-sdk/dist/declarations/src/generated/models/product';
import React from 'react';
import { FACETS_NAMES } from '../../pages/catalog/types';
import styles from './Filter.module.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { querySlice } from '../../reducers/QuerySlice';

type FilterProps = {
  facet: [string, FacetResult];
};

function isTermType(value: FilteredFacetResult | RangeFacetResult | TermFacetResult): value is TermFacetResult {
  return value.type === 'terms';
}

export default function Filter({ facet }: FilterProps) {
  const { filters } = useAppSelector((state) => state.queryReducer);
  const dispatch = useAppDispatch();

  const [facetQuery, facetData] = facet;

  const facetInfo = FACETS_NAMES.find((item) => item.query === facetQuery);
  if (!facetInfo) {
    return null;
  }

  const filter = filters.find((item) => item.attribute === facetInfo.attribute);

  function handleClickCheckbox(isChecked: boolean, attributeValue: string) {
    if (isChecked) {
      dispatch(querySlice.actions.addFilterQuery({ ...facetInfo!, value: attributeValue }));
    } else {
      dispatch(querySlice.actions.removeFilterQuery({ ...facetInfo!, value: attributeValue }));
    }
  }

  return (
    <div className={styles.filter}>
      <h4>{facetInfo.nameEn}</h4>
      {isTermType(facetData) &&
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
