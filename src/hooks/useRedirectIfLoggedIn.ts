import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useLoginStatus from './useLoginStatus';

export default function useRedirectIfLoggedIn() {
  const isLoggedIn = useLoginStatus();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);
}
