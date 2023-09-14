import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
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
import DynamicCrumb from './components/breadcrumbs/DynamicCrumb';
import Crumb from './components/breadcrumbs/Crumb';
import BasketPage from './pages/basket/Basket';

const store = setupStore();

const routesPaths = {
  main: '/',
  login: '/login',
  register: '/register',
  userProfile: '/profile',
  catalog: '/catalog',
  basket: '/basket',
};

const router = createBrowserRouter([
  {
    path: routesPaths.main,
    element: <App />,
    errorElement: <ErrorPage />,
    handle: {
      crumb: () => <Crumb key="Home" title="Home" path="/" />,
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
          crumb: () => <Crumb key="Catalog" title="Catalog" path={routesPaths.catalog} />,
        },
        children: [
          {
            path: `${routesPaths.catalog}/:categoryName`,
            element: <CatalogPage />,
            handle: {
              crumb: () => <DynamicCrumb key="DynamicCrumb" catalogPath={routesPaths.catalog} />,
            },
          },
        ],
      },
      {
        path: `${routesPaths.catalog}/:categoryName/:productKey`,
        element: <ProductPage />,
        handle: {
          crumb: () => {
            return <DynamicCrumb key="DynamicCrumb" catalogPath={routesPaths.catalog} />;
          },
        },
      },
      {
        path: routesPaths.login,
        element: <LoginPage />,
        loader: AuthGuardLoader,
        handle: {
          crumb: () => <Crumb key="Login" title="Login" path={routesPaths.login} />,
        },
      },
      {
        path: routesPaths.register,
        element: <RegisterPage />,
        loader: AuthGuardLoader,
        handle: {
          crumb: () => <Crumb key="Register" title="Register" path={routesPaths.register} />,
        },
      },
      {
        path: routesPaths.userProfile,
        element: <UserProfile />,
        handle: {
          crumb: () => <Crumb key="Profile" title="Profile" path={routesPaths.userProfile} />,
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
      {
        path: routesPaths.basket,
        element: <BasketPage />,
        handle: {
          crumb: () => <Crumb key="Basket" title="Basket" path={routesPaths.basket} />,
        },
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
