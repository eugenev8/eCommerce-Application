import { NavLink } from 'react-router-dom';

import './Navigation.css';

function checkActiveLink(isActive: boolean, isPending: boolean) {
  if (isActive) {
    return 'active';
  }
  if (isPending) {
    return 'pending';
  }
  return '';
}

export default function Navigation() {
  return (
    <nav>
      <ul>
        <li className="navbar__home-link">
          <NavLink to="/" className={({ isActive, isPending }) => checkActiveLink(isActive, isPending)}>
            Home
          </NavLink>
        </li>
        <li className="navbar__login-link">
          <NavLink to="/login" className={({ isActive, isPending }) => checkActiveLink(isActive, isPending)}>
            Login
          </NavLink>
        </li>
        <li className="navbar__register-link">
          <NavLink to="/register" className={({ isActive, isPending }) => checkActiveLink(isActive, isPending)}>
            Register
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
