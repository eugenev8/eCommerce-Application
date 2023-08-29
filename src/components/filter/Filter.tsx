import { FacetResult } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/product';
import React from 'react';
import { facetsNames, QueryAction, QueryActionKind } from '../../pages/catalog/types';

type FilterProps = {
  facet: [string, FacetResult];
  dispatchQuery: React.Dispatch<QueryAction>;
};

export default function Filter({ facet, dispatchQuery }: FilterProps) {
  const [facetName, facetData] = facet;

  const attribute = facetName.slice(facetName.lastIndexOf('.') + 1);
  const filterTitle = facetsNames.find((item) => item.attribute === attribute)?.nameEn || 'No name';

  function handleAdd(val: string) {
    dispatchQuery({ type: QueryActionKind.AddFilterQuery, payload: `${facetName}:"${val}"` });
  }

  function handleRemove(val: string) {
    dispatchQuery({ type: QueryActionKind.RemoveFilterQuery, payload: `${facetName}:"${val}"` });
  }

  return (
    <div>
      <h4>{filterTitle}</h4>
      {facetData.type === 'terms' &&
        facetData.terms.map((term) => {
          return (
            <div key={term.term}>
              <span>{term.term}</span>=<span>{term.count}</span>
              <button type="button" onClick={() => handleAdd(term.term)}>
                A
              </button>
              <button type="button" onClick={() => handleRemove(term.term)}>
                R
              </button>
            </div>
          );
        })}
    </div>
  );
}
