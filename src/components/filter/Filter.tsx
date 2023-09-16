import {
  FacetResult,
  FacetTerm,
  FilteredFacetResult,
  RangeFacetResult,
  TermFacetResult,
} from '@commercetools/platform-sdk/dist/declarations/src/generated/models/product';
import React from 'react';
import { FACETS_NAMES } from '../../sdk/types';
import styles from './Filter.module.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { queryActions } from '../../reducers/QuerySlice';

type FilterProps = {
  facet: [string, FacetResult];
};

function isTermType(value: FilteredFacetResult | RangeFacetResult | TermFacetResult): value is TermFacetResult {
  return value.type === 'terms';
}

function getSortedTerms(facetData: FacetResult): FacetTerm[] {
  if (isTermType(facetData)) {
    switch (facetData.dataType) {
      case 'number':
        return [...facetData.terms]
          .sort((a, b) => a.term - b.term)
          .map((item) => ({ ...item, term: parseFloat(item.term).toString() }));
      case 'text':
        return [...facetData.terms].sort((a, b) => a.term.localeCompare(b.term));
      default:
        return [...facetData.terms];
    }
  }
  return [];
}

export default function Filter({ facet }: FilterProps) {
  const { filters } = useAppSelector((state) => state.queryReducer);
  const dispatch = useAppDispatch();

  const [facetQuery, facetData] = facet;

  const facetInfo = FACETS_NAMES.find((item) => item.query === facetQuery);
  if (!facetInfo) {
    return null;
  }

  const sortedFacetData: FacetTerm[] = getSortedTerms(facetData);

  const filter = filters.find((item) => item.attribute === facetInfo.attribute);

  function handleClickCheckbox(isChecked: boolean, attributeValue: string) {
    if (isChecked) {
      dispatch(queryActions.addFilterQuery({ ...facetInfo!, value: attributeValue }));
    } else {
      dispatch(queryActions.removeFilterQuery({ ...facetInfo!, value: attributeValue }));
    }
  }

  return (
    <div className={styles.filter}>
      <h4>{facetInfo.nameEn}</h4>
      {sortedFacetData.map((term) => {
        return (
          <label
            key={term.term + term.count + term.productCount + facetInfo.prefix}
            className={`${styles.label} ${sortedFacetData.length === 1 && styles.disabled}`}
            htmlFor={term.term + term.count + term.productCount + facetInfo.prefix}
          >
            {`${term.term} `} {facetInfo.prefix}
            <input
              type="checkbox"
              checked={!!(filter && filter.values.includes(`"${term.term}"`))}
              onChange={(e) => handleClickCheckbox(e.target.checked, `"${term.term}"`)}
              id={term.term + term.count + term.productCount + facetInfo.prefix}
              disabled={sortedFacetData.length === 1}
            />
          </label>
        );
      })}
    </div>
  );
}
