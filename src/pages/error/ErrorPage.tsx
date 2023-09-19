import { NavLink, isRouteErrorResponse, useRouteError } from 'react-router-dom';
import styles from './ErrorPage.module.scss';
import Navigation from '../../components/navigation/Navigation';
import useLoadAuthState from '../../hooks/useLoadAuthState';
import FlexContainer from '../../components/containers/FlexContainer';
import ROUTES_PATHS from '../../routesPaths';

function generateErrorContent(error: unknown) {
  return (
    <div id="ErrorPage" className={styles.ErrorPage}>
      <Navigation />
      <FlexContainer
        style={{
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '2rem',
          minHeight: '70vh',
        }}
      >
        <h1>Oops!</h1>
        {isRouteErrorResponse(error) && (
          <>
            <p>
              {error.status}: {error.status === 404 ? 'Page not found!' : error.statusText}
            </p>
            {error.data?.message && (
              <p>
                <i>{error.data.message}</i>
              </p>
            )}
          </>
        )}
        {error instanceof Error && (
          <p>
            <i>{error.message}</i>
          </p>
        )}
        <NavLink to={ROUTES_PATHS.main}>Return to main page</NavLink>
      </FlexContainer>
    </div>
  );
}

export default function ErrorPage() {
  useLoadAuthState();
  const error = useRouteError();

  return <>{generateErrorContent(error)}</>;
}
