import { redirect } from 'react-router-dom';
import ROUTES_PATHS from '../routesPaths';

export default function AuthGuardLoader() {
  const isLoggedIn = localStorage.getItem(import.meta.env.VITE_LOCALSTORAGE_KEY_CUSTOMER_TOKENS);

  if (isLoggedIn) {
    return redirect(ROUTES_PATHS.main);
  }
  return null;
}
