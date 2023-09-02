import {
  FacetResult,
  FilteredFacetResult,
  RangeFacetResult,
  TermFacetResult,
} from '@commercetools/platform-sdk/dist/declarations/src/generated/models/product';
import React from 'react';
import styles from './PriceFilter.module.scss';
import { PRICE_FACET } from '../../pages/catalog/types';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { querySlice } from '../../reducers/QuerySlice';

type FilterProps = {
  facet: [string, FacetResult];
};

function isTermType(value: FilteredFacetResult | RangeFacetResult | TermFacetResult): value is TermFacetResult {
  return value.type === 'terms';
}

export default function PriceFilter({ facet }: FilterProps) {
  const dispatch = useAppDispatch();
  const priceState = useAppSelector((state) => state.queryReducer.priceFilter);

  let globalMin = 0;
  let globalMax = 1000;

  const [, facetData] = facet;

  if (isTermType(facetData)) {
    globalMin = Math.min(...facetData.terms.map((term) => term.term));
    globalMax = Math.max(...facetData.terms.map((term) => term.term));
  }

  function getMinValue() {
    if (priceState && priceState.values[0] && priceState.values[0] !== '*') {
      return priceState.values[0];
    }
    return '';
  }
  function getMaxValue() {
    if (priceState && priceState.values[1] && priceState.values[1] !== '*') {
      return priceState.values[1];
    }
    return '';
  }

  function handleChangeMinValue(value: string) {
    const maxValue = getMaxValue();

    if (!value) {
      if (!maxValue) {
        dispatch(querySlice.actions.deletePriceFilter());
      } else {
        dispatch(querySlice.actions.changePriceFilter(['*', maxValue]));
      }
    } else if (!maxValue) {
      dispatch(querySlice.actions.addPriceFilter({ ...PRICE_FACET, values: [value, '*'] }));
    } else {
      dispatch(querySlice.actions.changePriceFilter([value, maxValue]));
    }
  }

  function handleChangeMaxValue(value: string) {
    const minValue = getMinValue();
    if (!value) {
      if (!minValue) {
        dispatch(querySlice.actions.deletePriceFilter());
      } else {
        dispatch(querySlice.actions.changePriceFilter([minValue, '*']));
      }
    } else if (!minValue) {
      dispatch(querySlice.actions.addPriceFilter({ ...PRICE_FACET, values: ['*', value] }));
    } else {
      dispatch(querySlice.actions.changePriceFilter([minValue, value]));
    }
  }

  return (
    <div className={styles.filter}>
      <h4>{PRICE_FACET.nameEn}</h4>
      <input
        type="number"
        min={0}
        placeholder={`From ${globalMin}`}
        value={getMinValue()}
        onChange={(e) => handleChangeMinValue(e.target.value)}
      />
      <input
        type="number"
        min={0}
        placeholder={`to ${globalMax}`}
        value={getMaxValue()}
        onChange={(e) => handleChangeMaxValue(e.target.value)}
      />
    </div>
  );
}
