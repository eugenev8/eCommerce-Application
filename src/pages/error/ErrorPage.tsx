import { NavLink, isRouteErrorResponse, useRouteError } from 'react-router-dom';
import styles from './ErrorPage.module.scss';

function generateErrorContent(error: unknown) {
  return (
    <div id="ErrorPage" className={styles.ErrorPage}>
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
      <NavLink to="/">Return to main page</NavLink>
    </div>
  );
}

export default function ErrorPage() {
  const error = useRouteError();

  return <>{generateErrorContent(error)}</>;
}
