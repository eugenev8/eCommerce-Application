import { FacetResult } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/product';
import React from 'react';

type FilterProps = {
  facet: [string, FacetResult];
};

export default function PriceFilter({ facet }: FilterProps) {
  return <p>{facet.length}</p>;
}
