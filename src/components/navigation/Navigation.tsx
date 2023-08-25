import React, { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { authSlice } from '../../reducers/AuthSlice';
import useLoginStatus from '../../hooks/useLoginStatus';
import Button from '../buttons/Buttons';
import Wrapper from '../wrapper/Wrapper';
import FlexContainer from '../containers/FlexContainer';
import styles from './Navigation.module.scss';
import { customerSlice } from '../../reducers/CustomerSlice';

function BurgerIcon({ onClick }: { onClick: () => void }) {
  return (
    <div className={`${styles.navbar__burgerButton}`} onClick={onClick} aria-hidden>
      <span />
      <span />
      <span />
    </div>
  );
}

export function checkActiveLink(isActive: boolean, isPending: boolean) {
  const activeClass = isActive ? styles.active : '';
  const pendingClass = isPending ? styles.pending : '';
  return `${activeClass} ${pendingClass}`;
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
          <div className={`${styles.navbar__menuLink}`}>
            <NavLink
              to="/login"
              onClick={closeMenu}
              className={({ isActive, isPending }) => checkActiveLink(isActive, isPending)}
            >
              Login
            </NavLink>
          </div>
          <div className={`${styles.navbar__menuLink}`}>
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
      <div className={`${styles.navbar__menuLink}`}>
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
    <div className={`${styles.navbar__menu} ${isMenuShown ? styles.navbar__menu_open : ''}`} ref={menuRef}>
      <BurgerIcon onClick={closeMenu} />
      <div className={`${styles.navbar__menuLink}`}>
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
  const { customer } = useAppSelector((state) => state.customerReducer);

  const handleLogout = () => {
    dispatch(authSlice.actions.logout());
    dispatch(customerSlice.actions.clearCustomerData());
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
          <div className={`${styles.navbar__link}`}>
            <NavLink to="/login" className={({ isActive, isPending }) => checkActiveLink(isActive, isPending)}>
              Login
            </NavLink>
          </div>
          <div className={`${styles.navbar__link}`}>
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
    <nav className={`${styles.navbar}`}>
      <Wrapper>
        <FlexContainer style={{ gap: '2rem', justifyContent: 'space-between' }}>
          <BurgerIcon onClick={handleOnClick} />
          <BurgerMenu
            isMenuShown={isMenuShown}
            closeMenu={closeMenu}
            handleLogout={handleLogout}
            isLoggedIn={isLoggedIn}
          />

          <div className={`${styles.navbar__block} ${styles.navbar__leftBlock}`}>
            <div className={`${styles.navbar__link}`}>
              <NavLink to="/" className={({ isActive, isPending }) => checkActiveLink(isActive, isPending)}>
                Shop
              </NavLink>
            </div>
          </div>

          <div className={`${styles.navbar__block} ${styles.navbar__rightBlock}`}>{renderLoginLinks()}</div>
        </FlexContainer>
      </Wrapper>
    </nav>
  );
}
