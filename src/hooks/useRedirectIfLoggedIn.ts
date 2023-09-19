import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useLoginStatus from './useLoginStatus';
import ROUTES_PATHS from '../routesPaths';

export default function useRedirectIfLoggedIn() {
  const isLoggedIn = useLoginStatus();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate(ROUTES_PATHS.main);
    }
  }, [isLoggedIn, navigate]);
}
