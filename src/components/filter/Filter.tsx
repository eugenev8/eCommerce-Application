import { FacetResult } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/product';
import React from 'react';
import { facetsNames } from '../../pages/catalog/types';
import styles from './Filter.module.scss';
import { QueryAction, QueryActionKind } from '../../reducers/queryReducer';

type FilterProps = {
  facet: [string, FacetResult];
  dispatchQuery: React.Dispatch<QueryAction>;
};

export default function Filter({ facet, dispatchQuery }: FilterProps) {
  const [facetName, facetData] = facet;

  const attribute = facetName.slice(facetName.lastIndexOf('.') + 1);
  const filterTitle = facetsNames.find((item) => item.attribute === attribute)?.nameEn || 'No name';

  function handleAdd(value: string) {
    dispatchQuery({ type: QueryActionKind.AddFilterQuery, payload: { attribute, value } });
  }

  function handleRemove(value: string) {
    dispatchQuery({ type: QueryActionKind.RemoveFilterQuery, payload: { attribute, value } });
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
