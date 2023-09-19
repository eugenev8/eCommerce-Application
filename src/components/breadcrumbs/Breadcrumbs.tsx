import { Params, useMatches } from 'react-router-dom';
import React from 'react';
import FlexContainer from '../containers/FlexContainer';
import Wrapper from '../wrapper/Wrapper';
import IconChevronRight from '../icons/IconChevronRight';
import styles from './Breadcrumbs.module.scss';
import Crumb from './Crumb';

interface Match {
  id: string;
  pathname: string;
  params: Params<string>;
  data: { crumb: (data: unknown) => CrumbData };
  handle: { crumb: (data: unknown) => CrumbData };
}

type CrumbData = {
  title: string;
  path: string;
};

export default function Breadcrumbs() {
  const matches = useMatches() as Match[];

  const crumbs = matches.filter((match) => Boolean(match.handle?.crumb)).map((match) => match.handle.crumb(match.data));

  if (crumbs.length === 1) {
    return null;
  }

  return (
    <Wrapper style={{ margin: '20px auto' }}>
      <FlexContainer style={{ gap: '20px', alignItems: 'center', height: '100%', flexWrap: 'wrap' }}>
        {crumbs.map((crumb, index) => (
          <FlexContainer key={crumb.path + crumb.title} style={{ gap: '20px', alignItems: 'center' }}>
            {index !== 0 && (
              <FlexContainer style={{ height: '100%', width: '20px' }}>
                <IconChevronRight />
              </FlexContainer>
            )}
            <div className={`${styles.breadcrumbText}`}>
              <Crumb path={crumb.path} title={crumb.title} isLast={index === crumbs.length - 1} />
            </div>
          </FlexContainer>
        ))}
      </FlexContainer>
    </Wrapper>
  );
}
