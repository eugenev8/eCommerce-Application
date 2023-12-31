import { Navigate, Outlet } from 'react-router-dom';
import { ReactNode } from 'react';
import ColoredContainer from '../../components/containers/ColoredContainer';
import FlexContainer from '../../components/containers/FlexContainer';
import Wrapper from '../../components/wrapper/Wrapper';
import { useAppSelector } from '../../hooks/redux';
import useLoadingStateStatus from '../../hooks/useLoadingStateStatus';
import LoaderSpinner from '../../components/loader/Loader';
import AnimatedContainer from '../../components/containers/AnimatedContainer';
import ROUTES_PATHS from '../../routesPaths';

function UserPageLayout({ children }: { children: ReactNode }) {
  const { customer } = useAppSelector((state) => state.customerReducer);

  const isLoadingData = useLoadingStateStatus();

  if (isLoadingData) {
    return (
      <AnimatedContainer>
        <Wrapper>
          <FlexContainer style={{ justifyContent: 'center', alignItems: 'center', minHeight: '40vh' }}>
            <LoaderSpinner />
          </FlexContainer>
        </Wrapper>
      </AnimatedContainer>
    );
  }

  if (!customer) {
    return <Navigate to={ROUTES_PATHS.login} />;
  }

  return (
    <AnimatedContainer>
      <Wrapper>
        <h2>Hello, {customer.firstName}</h2>
        <FlexContainer style={{ gap: '10%', flexWrap: 'wrap' }}>
          <ColoredContainer style={{ flexGrow: '1' }}>{children}</ColoredContainer>
          <Outlet />
        </FlexContainer>
      </Wrapper>
    </AnimatedContainer>
  );
}

export default UserPageLayout;
