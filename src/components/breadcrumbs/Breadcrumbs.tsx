/* eslint-disable react/no-array-index-key */
import { Params, useMatches } from 'react-router-dom';
import React from 'react';
import FlexContainer from '../containers/FlexContainer';
import Wrapper from '../wrapper/Wrapper';

interface Match {
  id: string;
  pathname: string;
  params: Params<string>;
  data: { crumb: (data: unknown) => React.ReactNode };
  handle: { crumb: (data: unknown) => React.ReactNode };
}

export default function Breadcrumbs() {
  const matches = useMatches() as Match[];

  const crumbs = matches.filter((match) => Boolean(match.handle?.crumb)).map((match) => match.handle.crumb(match.data));

  if (crumbs.length === 1) {
    return null;
  }

  return (
    <Wrapper style={{ height: '40px', margin: '20px auto' }}>
      <FlexContainer style={{ gap: '20px', alignItems: 'center', height: '100%' }}>{crumbs}</FlexContainer>
    </Wrapper>
  );
}
