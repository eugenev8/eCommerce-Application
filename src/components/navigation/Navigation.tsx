import { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';

import './Navigation.css';
import { useAppDispatch } from '../../hooks/redux';
import { authSlice } from '../../reducers/AuthSlice';
import useLoginStatus from '../../hooks/useLoginStatus';
import Button from '../../ui/buttons/Buttons';

function BurgerIcon({ onClick }: { onClick: () => void }) {
  return (
    <div className="burgerButton" onClick={onClick} aria-hidden>
      <span />
      <span />
      <span />
    </div>
  );
}

export function checkActiveLink(isActive: boolean, isPending: boolean) {
  if (isActive) {
    return 'active';
  }
  if (isPending) {
    return 'pending';
  }
  return '';
}

type BurgerMenuProps = {
  isMenuShown: boolean;
  isLoggedIn: boolean;
  closeMenu: () => void;
  handleLogout: () => void;
};

function BurgerMenu({ isMenuShown, closeMenu, handleLogout, isLoggedIn }: BurgerMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function useClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        closeMenu();
      }
    }

    document.addEventListener('mousedown', useClickOutside);
    return () => {
      document.removeEventListener('mousedown', useClickOutside);
    };
  }, [closeMenu, isMenuShown]);

  const renderLoginLinks = () => {
    if (!isLoggedIn) {
      return (
        <>
          <div className="navbar__menuLink">
            <NavLink
              to="/login"
              onClick={closeMenu}
              className={({ isActive, isPending }) => checkActiveLink(isActive, isPending)}
            >
              Login
            </NavLink>
          </div>
          <div className="navbar__menuLink">
            <NavLink
              to="/register"
              onClick={closeMenu}
              className={({ isActive, isPending }) => checkActiveLink(isActive, isPending)}
            >
              Sign up
            </NavLink>
          </div>
        </>
      );
    }

    return (
      <div className="navbar__menuLink">
        <Button
          addedClass=""
          innerText="Logout"
          styling="secondary"
          type="button"
          variant="default"
          onClick={handleLogout}
        />
      </div>
    );
  };

  return (
    <div className={`navbar__menu ${isMenuShown ? 'navbar__menu_open' : ''}`} ref={menuRef}>
      <BurgerIcon onClick={closeMenu} />
      <div className="navbar__menuLink">
        <NavLink
          to="/"
          onClick={closeMenu}
          className={({ isActive, isPending }) => checkActiveLink(isActive, isPending)}
        >
          Shop
        </NavLink>
      </div>

      {renderLoginLinks()}
    </div>
  );
}

export default function Navigation() {
  const [isMenuShown, setIsMenuShown] = useState(false);
  const isLoggedIn = useLoginStatus();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(authSlice.actions.logout());
    localStorage.removeItem(import.meta.env.VITE_LOCALSTORAGE_KEY_CUSTOMER_TOKEN);
  };

  const handleOnClick = () => {
    setIsMenuShown(!isMenuShown);
  };

  const closeMenu = () => {
    setIsMenuShown(false);
  };

  const renderLoginLinks = () => {
    if (!isLoggedIn) {
      return (
        <>
          <div className="navbar__link">
            <NavLink to="/login" className={({ isActive, isPending }) => checkActiveLink(isActive, isPending)}>
              Login
            </NavLink>
          </div>
          <div className="navbar__link">
            <NavLink to="/register" className={({ isActive, isPending }) => checkActiveLink(isActive, isPending)}>
              Sign up
            </NavLink>
          </div>
        </>
      );
    }

    return (
      <Button
        addedClass=""
        innerText="Logout"
        styling="secondary"
        type="button"
        variant="default"
        onClick={handleLogout}
      />
    );
  };

  return (
    <nav>
      <BurgerIcon onClick={handleOnClick} />
      <BurgerMenu isMenuShown={isMenuShown} closeMenu={closeMenu} handleLogout={handleLogout} isLoggedIn={isLoggedIn} />

      <div className="navbar__block navbar__leftBlock">
        <div className="navbar__link">
          <NavLink to="/" className={({ isActive, isPending }) => checkActiveLink(isActive, isPending)}>
            Shop
          </NavLink>
        </div>
      </div>

      <div className="navbar__block navbar__rightBlock">{renderLoginLinks()}</div>
    </nav>
  );
}
