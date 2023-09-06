import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, NavLink, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';

import './index.scss';
import { setupStore } from './store';
import App from './App';
import MainPage from './pages/main/MainPage';
import LoginPage from './pages/login/LoginPage';
import RegisterPage from './pages/register/RegisterPage';
import ErrorPage from './pages/error/ErrorPage';
import AuthGuardLoader from './pages/AuthGuardLoader';
import UserProfile from './pages/user/UserProfile';
import UserAddresses from './pages/user/adresses/UserAddresses';
import UserAccount from './pages/user/account/UserAccount';
import CatalogPage from './pages/catalog/CatalogPage';
import ProductPage from './pages/product/ProductPage';
import DynamicCatalogCrumb from './components/breadcrumbs/DynamicCatalogCrumb';

const store = setupStore();

const routesPaths = {
  main: '/',
  login: '/login',
  register: '/register',
  userProfile: '/profile',
  catalog: '/catalog',
};

const router = createBrowserRouter([
  {
    path: routesPaths.main,
    element: <App />,
    errorElement: <ErrorPage />,
    handle: {
      crumb: () => <NavLink to="/">Home</NavLink>,
    },
    children: [
      {
        index: true,
        element: <MainPage />,
      },

      {
        path: routesPaths.catalog,
        element: <CatalogPage />,
        handle: {
          crumb: () => <NavLink to={routesPaths.catalog}>Catalog</NavLink>,
        },
        children: [
          {
            path: `${routesPaths.catalog}/:categoryName`,
            element: <CatalogPage />,
            handle: {
              crumb: () => <DynamicCatalogCrumb catalogPath={routesPaths.catalog} />,
            },
          },
        ],
      },
      {
        path: `product/:productKey`,
        element: <ProductPage />,
        handle: {
          crumb: () => <NavLink to={routesPaths.catalog}>Catalog</NavLink>,
        },
      },
      {
        path: routesPaths.login,
        element: <LoginPage />,
        loader: AuthGuardLoader,
        handle: {
          crumb: () => <NavLink to={routesPaths.login}>Login</NavLink>,
        },
      },
      {
        path: routesPaths.register,
        element: <RegisterPage />,
        loader: AuthGuardLoader,
        handle: {
          crumb: () => <NavLink to={routesPaths.register}>Register</NavLink>,
        },
      },
      {
        path: routesPaths.userProfile,
        element: <UserProfile />,
        handle: {
          crumb: () => <NavLink to={routesPaths.userProfile}>Profile</NavLink>,
        },
        children: [
          {
            index: true,
            element: <UserAccount />,
          },
          {
            path: 'address',
            element: <UserAddresses />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
