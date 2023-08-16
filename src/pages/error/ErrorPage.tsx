import './ErrorPage.css';

import { isRouteErrorResponse, useRouteError } from 'react-router-dom';
import Navigation from '../../components/navigation/Navigation';

export default function ErrorPage() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return (
        <>
          <Navigation />
          <div id="ErrorPage">
            <h1>Oops!</h1>
            <p>{error.status}: Page not found!</p>
          </div>
        </>
      );
    }

    return (
      <>
        <Navigation />
        <div id="ErrorPage">
          <h1>Oops!</h1>
          <p>
            {error.status}: {error.statusText}
          </p>
          {error.data?.message && (
            <p>
              <i>{error.data.message}</i>
            </p>
          )}
        </div>
      </>
    );
  }
  if (error instanceof Error) {
    return (
      <>
        <Navigation />
        <div id="ErrorPage">
          <h1>Oops! Unexpected Error</h1>
          <p>Something went wrong.</p>
          <p>
            <i>{error.message}</i>
          </p>
        </div>
      </>
    );
  }
  return (
    <>
      <Navigation />
      <h1>Unknown Error!</h1>
    </>
  );
}