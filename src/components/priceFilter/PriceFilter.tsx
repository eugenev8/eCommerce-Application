import {
  FacetResult,
  FilteredFacetResult,
  RangeFacetResult,
  TermFacetResult,
} from '@commercetools/platform-sdk/dist/declarations/src/generated/models/product';
import React, { useState } from 'react';
import styles from './PriceFilter.module.scss';
import { PRICE_FACET } from '../../pages/catalog/types';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { queryActions } from '../../reducers/QuerySlice';

type FilterProps = {
  facet: [string, FacetResult];
};

function isTermType(value: FilteredFacetResult | RangeFacetResult | TermFacetResult): value is TermFacetResult {
  return value.type === 'terms';
}

function getCentPriceStr(price: string | number) {
  if (!price || price === '0') return '';
  return (Number(price) * 100).toString();
}

function getRealPriceStr(price: string | number) {
  if (!price || price === '0') return '';
  return Math.floor(Number(price) / 100).toString();
}

export default function PriceFilter({ facet }: FilterProps) {
  const dispatch = useAppDispatch();
  const priceState = useAppSelector((state) => state.queryReducer.priceFilter);
  const [isError, setIsError] = useState<boolean>(false);

  let globalMin: number = 0;
  let globalMax: number = 0;

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
    setIsError(false);
    const maxValue = getMaxValue();

    if (!value) {
      if (!maxValue) {
        dispatch(queryActions.deletePriceFilter());
      } else {
        dispatch(queryActions.changePriceFilter(['*', maxValue]));
      }
    } else if (!maxValue) {
      dispatch(queryActions.addPriceFilter({ ...PRICE_FACET, values: [value, '*'] }));
    } else {
      dispatch(queryActions.changePriceFilter([value, maxValue]));
      if (Number(value) >= Number(maxValue)) setIsError(true);
    }
  }

  function handleChangeMaxValue(value: string) {
    setIsError(false);
    const minValue = getMinValue();
    if (!value) {
      if (!minValue) {
        dispatch(queryActions.deletePriceFilter());
      } else {
        dispatch(queryActions.changePriceFilter([minValue, '*']));
      }
    } else if (!minValue) {
      dispatch(queryActions.addPriceFilter({ ...PRICE_FACET, values: ['*', value] }));
    } else {
      dispatch(queryActions.changePriceFilter([minValue, value]));
      if (Number(minValue) >= Number(value)) setIsError(true);
    }
  }

  return (
    <div className={styles.filter}>
      <h4>{PRICE_FACET.nameEn}</h4>
      <div className={styles.input_wrapper}>
        <input
          className={`${styles.input} ${isError ? styles.input_error : ''}`}
          type="number"
          min={0}
          placeholder={`From ${getRealPriceStr(globalMin)}`}
          value={getRealPriceStr(getMinValue())}
          onChange={(e) => handleChangeMinValue(getCentPriceStr(e.target.value))}
        />
        <input
          className={`${styles.input} ${isError ? styles.input_error : ''}`}
          type="number"
          min={0}
          size={7}
          placeholder={`to ${getRealPriceStr(globalMax)}`}
          value={getRealPriceStr(getMaxValue())}
          onChange={(e) => handleChangeMaxValue(getCentPriceStr(e.target.value))}
        />
      </div>
    </div>
  );
}
