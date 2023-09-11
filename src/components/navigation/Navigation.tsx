import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import useLoginStatus from '../../hooks/useLoginStatus';
import Wrapper from '../wrapper/Wrapper';
import FlexContainer from '../containers/FlexContainer';
import styles from './Navigation.module.scss';
import useLoadingStateStatus from '../../hooks/useLoadingStateStatus';
import LoaderSpinner from '../loader/Loader';

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

function NavLinkWithCheck({ to, children, onClick }: { to: string; children: React.ReactNode; onClick: () => void }) {
  return (
    <div className={`${styles.navbar__link}`}>
      <NavLink to={to} onClick={onClick} className={({ isActive, isPending }) => checkActiveLink(isActive, isPending)}>
        {children}
      </NavLink>
    </div>
  );
}

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
    <>
      <NavLinkWithCheck to="/profile" onClick={closeMenu}>
        My profile
      </NavLinkWithCheck>
      <NavLinkWithCheck to="/basket" onClick={closeMenu}>
        <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M14.5834 20.8334C15.1359 20.8334 15.6658 20.6139 16.0565 20.2232C16.4472 19.8325 16.6667 19.3026 16.6667 18.75C16.6667 18.1975 16.4472 17.6676 16.0565 17.2769C15.6658 16.8862 15.1359 16.6667 14.5834 16.6667C14.0308 16.6667 13.5009 16.8862 13.1102 17.2769C12.7195 17.6676 12.5 18.1975 12.5 18.75C12.5 19.3026 12.7195 19.8325 13.1102 20.2232C13.5009 20.6139 14.0308 20.8334 14.5834 20.8334ZM7.29168 20.8334C7.84422 20.8334 8.37412 20.6139 8.76482 20.2232C9.15552 19.8325 9.37502 19.3026 9.37502 18.75C9.37502 18.1975 9.15552 17.6676 8.76482 17.2769C8.37412 16.8862 7.84422 16.6667 7.29168 16.6667C6.73915 16.6667 6.20925 16.8862 5.81854 17.2769C5.42784 17.6676 5.20835 18.1975 5.20835 18.75C5.20835 19.3026 5.42784 19.8325 5.81854 20.2232C6.20925 20.6139 6.73915 20.8334 7.29168 20.8334ZM20.8729 6.16981C21.133 6.16142 21.3796 6.05223 21.5605 5.86531C21.7415 5.6784 21.8427 5.42842 21.8427 5.16825C21.8427 4.90807 21.7415 4.6581 21.5605 4.47118C21.3796 4.28427 21.133 4.17507 20.8729 4.16669H19.674C18.7344 4.16669 17.9219 4.81877 17.7177 5.73544L16.4125 11.6125C16.2083 12.5292 15.3959 13.1813 14.4563 13.1813H6.63127L5.12918 7.17085H14.8636C15.1212 7.1591 15.3643 7.0485 15.5424 6.86205C15.7206 6.67561 15.82 6.42767 15.82 6.16981C15.82 5.91195 15.7206 5.66401 15.5424 5.47757C15.3643 5.29113 15.1212 5.18052 14.8636 5.16877H5.12918C4.82467 5.16868 4.52414 5.23802 4.25045 5.37151C3.97676 5.50501 3.7371 5.69915 3.5497 5.93917C3.3623 6.17919 3.23209 6.45878 3.16897 6.75668C3.10585 7.05458 3.11148 7.36295 3.18543 7.65835L4.68752 13.6667C4.7958 14.1002 5.04594 14.4851 5.39815 14.7601C5.75036 15.0351 6.18441 15.1845 6.63127 15.1844H14.4563C15.3679 15.1845 16.2524 14.8737 16.9635 14.3032C17.6747 13.7328 18.17 12.9369 18.3677 12.0469L19.674 6.16981H20.8729Z"
            fill="black"
          />
        </svg>
      </NavLinkWithCheck>
    </>
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
            {isDataLoading && <LoaderSpinner />}
            {!isDataLoading && <AuthLinks isLoggedIn={isLoggedIn} closeMenu={closeMenu} />}
          </div>
        </FlexContainer>
      </Wrapper>
    </nav>
  );
}
