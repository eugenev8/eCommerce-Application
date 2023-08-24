import { redirect } from 'react-router-dom';

export default function AuthGuardLoader() {
  const isLoggedIn = localStorage.getItem(import.meta.env.VITE_LOCALSTORAGE_KEY_CUSTOMER_TOKEN);

  if (isLoggedIn) {
    return redirect('/');
  }
  return null;
}
