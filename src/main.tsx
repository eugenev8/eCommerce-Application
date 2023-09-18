import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, Params, RouterProvider } from 'react-router-dom';
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
import ROUTES_PATHS from './routesPaths';
import BasketPage from './pages/basket/Basket';

const store = setupStore();

const router = createBrowserRouter([
  {
    path: ROUTES_PATHS.main,
    element: <App />,
    errorElement: <ErrorPage />,
    handle: {
      crumb: () => {
        return { title: 'Main', path: ROUTES_PATHS.main };
      },
    },
    children: [
      {
        index: true,
        element: <MainPage />,
      },
      {
        path: ROUTES_PATHS.catalog,
        element: <CatalogPage />,
        handle: {
          crumb: () => {
            return { title: 'Catalog', path: ROUTES_PATHS.catalog };
          },
        },
        children: [
          {
            path: `${ROUTES_PATHS.catalog}/:categoryName`,
            element: <CatalogPage />,
            loader: ({ params }) => {
              return params;
            },
            handle: {
              crumb: (params: Params<string>) => {
                return {
                  title: params.categoryName || 'Category',
                  path: `${ROUTES_PATHS.catalog}/${params.categoryName}`,
                };
              },
            },
            children: [
              {
                path: `${ROUTES_PATHS.catalog}/:categoryName/:subcategoryName`,
                element: <CatalogPage />,
                loader: ({ params }) => {
                  return params;
                },
                handle: {
                  crumb: (params: Params<string>) => {
                    return {
                      title: params.subcategoryName || 'Subcategory',
                      path: `${ROUTES_PATHS.catalog}/${params.categoryName}/${params.subcategoryName}`,
                    };
                  },
                },
              },
            ],
          },
        ],
      },
      {
        path: `${ROUTES_PATHS.product}`,
        element: <ProductPage />,
        handle: {
          crumb: () => {
            return { title: 'Catalog', path: `${ROUTES_PATHS.catalog}` };
          },
        },
        children: [
          {
            path: `${ROUTES_PATHS.product}/:categoryName`,
            element: <ProductPage />,
            loader: ({ params }) => {
              return params;
            },
            handle: {
              crumb: (params: Params<string>) => {
                return {
                  title: params.categoryName || 'Category',
                  path: `${ROUTES_PATHS.catalog}/${params.categoryName}`,
                };
              },
            },
            children: [
              {
                path: `${ROUTES_PATHS.product}/:categoryName/:subcategoryName`,
                element: <ProductPage />,
                loader: ({ params }) => {
                  return params;
                },
                handle: {
                  crumb: (params: Params<string>) => {
                    return {
                      title: params.subcategoryName || 'Subcategory',
                      path: `${ROUTES_PATHS.catalog}/${params.categoryName}/${params.subcategoryName}`,
                    };
                  },
                },
                children: [
                  {
                    path: `${ROUTES_PATHS.product}/:categoryName/:subcategoryName/:productKey`,
                    element: <ProductPage />,
                    loader: ({ params }) => {
                      return params;
                    },
                    handle: {
                      crumb: (params: Params<string>) => {
                        return {
                          title: params.productKey || 'Product',
                          path: `${ROUTES_PATHS.catalog}/${params.categoryName}/${params.subcategoryName}/${params.productKey}`,
                        };
                      },
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        path: ROUTES_PATHS.login,
        element: <LoginPage />,
        loader: AuthGuardLoader,
        handle: {
          crumb: () => {
            return { title: 'Login', path: ROUTES_PATHS.login };
          },
        },
      },
      {
        path: ROUTES_PATHS.register,
        element: <RegisterPage />,
        loader: AuthGuardLoader,
        handle: {
          crumb: () => {
            return { title: 'Register', path: ROUTES_PATHS.register };
          },
        },
      },
      {
        path: ROUTES_PATHS.userProfile,
        element: <UserProfile />,
        handle: {
          crumb: () => {
            return { title: 'Profile', path: ROUTES_PATHS.userProfile };
          },
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
        path: ROUTES_PATHS.basket,
        element: <BasketPage />,
        handle: {
          crumb: () => {
            return { title: 'Basket', path: ROUTES_PATHS.basket };
          },
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
