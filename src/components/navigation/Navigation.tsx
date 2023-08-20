import React, { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';

import './Navigation.css';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { AuthStatus, authSlice } from '../../reducers/AuthSlice';

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
  closeMenu: () => void;
};

function BurgerMenu({ isMenuShown, closeMenu }: BurgerMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const { authStatus } = useAppSelector((store) => store.authReducer);
  const dispatch = useAppDispatch();

  function handleLogout() {
    dispatch(authSlice.actions.logout());
    localStorage.removeItem(import.meta.env.VITE_LOCALSTORAGE_KEY_CUSTOMER_TOKEN);
  }

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
    if (authStatus !== AuthStatus.TokenFlow) {
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
        <button type="button" onClick={handleLogout}>
          Logout
        </button>
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
  const { isLoading, customerToken, error, authStatus } = useAppSelector((store) => store.authReducer);
  const dispatch = useAppDispatch();

  function handleLogout() {
    dispatch(authSlice.actions.logout());
    localStorage.removeItem(import.meta.env.VITE_LOCALSTORAGE_KEY_CUSTOMER_TOKEN);
  }
  const [isMenuShown, setIsMenuShown] = useState(false);

  const handleOnClick = () => {
    setIsMenuShown(!isMenuShown);
  };

  const closeMenu = () => {
    setIsMenuShown(false);
  };

  const renderLoginLinks = () => {
    if (authStatus !== AuthStatus.TokenFlow) {
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
      <div className="navbar__link">
        <button type="button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    );
  };

  return (
    <nav>
      <BurgerIcon onClick={handleOnClick} />
      <BurgerMenu isMenuShown={isMenuShown} closeMenu={closeMenu} />

      <div className="navbar__block navbar__leftBlock">
        <div className="navbar__link">
          <NavLink to="/" className={({ isActive, isPending }) => checkActiveLink(isActive, isPending)}>
            Shop
          </NavLink>
        </div>
      </div>
      <div>
        <p>authStatus={authStatus}</p>
        <p>isLoading={isLoading.toString()}</p>
      </div>
      <div>
        <p>customerToken= {customerToken}</p>
        <p style={{ fontWeight: 700, color: 'red' }}>error= {error}</p>
      </div>

      <div className="navbar__block navbar__rightBlock">{renderLoginLinks()}</div>
    </nav>
  );
}
