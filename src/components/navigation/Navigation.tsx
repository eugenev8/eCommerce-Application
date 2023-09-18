import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import useLoginStatus from '../../hooks/useLoginStatus';
import Wrapper from '../wrapper/Wrapper';
import FlexContainer from '../containers/FlexContainer';
import styles from './Navigation.module.scss';
import useLoadingStateStatus from '../../hooks/useLoadingStateStatus';
import LoaderSpinner from '../loader/Loader';
import CartMenu from '../cartMenu/CartMenu';

function BurgerIcon({ onClick }: { onClick: () => void }) {
  return (
    <div className={`${styles.navbar__burgerButton}`} onClick={onClick} aria-hidden>
      <span />
      <span />
      <span />
    </div>
  );
}

function checkActiveLink(isActive: boolean, isPending: boolean) {
  const activeClass = isActive ? styles.navbar__link_active : '';
  const pendingClass = isPending ? styles.pending : '';
  return `${activeClass} ${pendingClass}`;
}

function NavLinkWithCheck({
  to,
  children,
  onClick,
  id,
}: {
  to: string;
  children: React.ReactNode;
  onClick: () => void;
  id?: string;
}) {
  return (
    <div className={`${styles.navbar__link}`}>
      <NavLink
        id={id}
        to={to}
        onClick={onClick}
        className={({ isActive, isPending }) => checkActiveLink(isActive, isPending)}
      >
        {children}
      </NavLink>
    </div>
  );
}

NavLinkWithCheck.defaultProps = {
  id: undefined,
};

function AuthLinks({ isLoggedIn, closeMenu }: { isLoggedIn: boolean; closeMenu: () => void }) {
  if (!isLoggedIn) {
    return (
      <>
        <NavLinkWithCheck to="/login" onClick={closeMenu}>
          Login
        </NavLinkWithCheck>
        <NavLinkWithCheck to="/register" onClick={closeMenu}>
          Sign up
        </NavLinkWithCheck>
      </>
    );
  }

  return (
    <NavLinkWithCheck to="/profile" onClick={closeMenu}>
      My profile
    </NavLinkWithCheck>
  );
}

interface BurgerMenuProps {
  isMenuShown: boolean;
  isLoggedIn: boolean;
  closeMenu: () => void;
}

function BurgerMenu({ isMenuShown, closeMenu, isLoggedIn }: BurgerMenuProps) {
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

  return (
    <div className={`${styles.navbar__menu} ${isMenuShown ? styles.navbar__menu_open : ''}`} ref={menuRef}>
      <BurgerIcon onClick={closeMenu} />
      <NavLinkWithCheck to="/" onClick={closeMenu}>
        Shop
      </NavLinkWithCheck>
      <NavLinkWithCheck to="/catalog" onClick={closeMenu}>
        Catalog
      </NavLinkWithCheck>
      <NavLinkWithCheck to="/about" onClick={closeMenu}>
        About us
      </NavLinkWithCheck>
      <NavLinkWithCheck id={styles.cartLink} to="/cart" onClick={closeMenu}>
        <CartMenu />
      </NavLinkWithCheck>
      <AuthLinks isLoggedIn={isLoggedIn} closeMenu={closeMenu} />
    </div>
  );
}

export default function Navigation() {
  const [isMenuShown, setIsMenuShown] = useState(false);
  const isLoggedIn = useLoginStatus();
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState<string>('');
  const isDataLoading = useLoadingStateStatus();

  const handleOnClick = () => {
    setIsMenuShown(!isMenuShown);
  };

  const closeMenu = () => {
    setIsMenuShown(false);
  };

  function handleSearch(event: React.KeyboardEvent) {
    if (!searchValue || event.key !== 'Enter') return;

    navigate(`/catalog?search=${searchValue.toLowerCase()}`);
    setSearchValue('');
  }

  return (
    <nav className={`${styles.navbar}`}>
      <Wrapper>
        <FlexContainer style={{ gap: '2rem', justifyContent: 'space-between', alignItems: 'center', height: '100%' }}>
          <BurgerIcon onClick={handleOnClick} />
          <BurgerMenu isMenuShown={isMenuShown} closeMenu={closeMenu} isLoggedIn={isLoggedIn} />
          <div className={`${styles.navbar__block}`}>
            <NavLinkWithCheck to="/" onClick={closeMenu}>
              Shop
            </NavLinkWithCheck>
            <NavLinkWithCheck to="/catalog" onClick={closeMenu}>
              Catalog
            </NavLinkWithCheck>
            <NavLinkWithCheck to="/about" onClick={closeMenu}>
              About us
            </NavLinkWithCheck>
          </div>
          <div className={`${styles.navbar__block}`}>
            <input
              className={`${styles.navbar__search}`}
              type="text"
              placeholder="Product search"
              onKeyDown={handleSearch}
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
            />
          </div>

          <div className={`${styles.navbar__block}`}>
            <NavLinkWithCheck id={styles.cartLink} to="/cart" onClick={closeMenu}>
              <CartMenu />
            </NavLinkWithCheck>
            {isDataLoading && <LoaderSpinner />}
            {!isDataLoading && <AuthLinks isLoggedIn={isLoggedIn} closeMenu={closeMenu} />}
          </div>
        </FlexContainer>
      </Wrapper>
    </nav>
  );
}
