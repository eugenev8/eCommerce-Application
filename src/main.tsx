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
// import DynamicCrumb from './components/breadcrumbs/DynamicCrumb';
import Crumb from './components/breadcrumbs/Crumb';

const store = setupStore();

const routesPaths = {
  main: '/',
  login: '/login',
  register: '/register',
  userProfile: '/profile',
  catalog: '/catalog',
  product: '/product',
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
            loader: ({ params }) => {
              return params;
            },
            handle: {
              crumb: (params: Params<string>) => (
                <Crumb
                  key="Category"
                  title={params.categoryName || 'Category'}
                  path={`${routesPaths.catalog}/${params.categoryName}`}
                />
              ),
            },
            children: [
              {
                path: `${routesPaths.catalog}/:categoryName/:subcategoryName`,
                element: <CatalogPage />,
                loader: ({ params }) => {
                  return params;
                },
                handle: {
                  crumb: (params: Params<string>) => (
                    <Crumb
                      key="Subcategory"
                      title={params.subcategoryName || 'Subcategory'}
                      path={`${routesPaths.catalog}/${params.categoryName}/${params.subcategoryName}`}
                    />
                  ),
                },
              },
            ],
          },
        ],
      },
      {
        path: `${routesPaths.product}`,
        element: <ProductPage />,
        handle: {
          crumb: () => <Crumb key="Catalog" title="Catalog" path={routesPaths.catalog} />,
        },
        children: [
          {
            path: `${routesPaths.product}/:categoryName`,
            element: <ProductPage />,
            loader: ({ params }) => {
              return params;
            },
            handle: {
              crumb: (params: Params<string>) => (
                <Crumb
                  key="Subcategory"
                  title={params.categoryName || 'Category'}
                  path={`${routesPaths.catalog}/${params.categoryName}`}
                />
              ),
            },
            children: [
              {
                path: `${routesPaths.product}/:categoryName/:subcategoryName`,
                element: <ProductPage />,
                loader: ({ params }) => {
                  return params;
                },
                handle: {
                  crumb: (params: Params<string>) => (
                    <Crumb
                      key="Subcategory"
                      title={params.subcategoryName || 'Subcategory'}
                      path={`${routesPaths.catalog}/${params.categoryName}/${params.subcategoryName}`}
                    />
                  ),
                },
                children: [
                  {
                    path: `${routesPaths.product}/:categoryName/:subcategoryName/:productKey`,
                    element: <ProductPage />,
                    loader: ({ params }) => {
                      return params;
                    },
                    handle: {
                      crumb: (params: Params<string>) => (
                        <Crumb
                          key="productKey"
                          title={params.productKey || 'productKey'}
                          path={`${routesPaths.product}/${params.categoryName}/${params.subcategoryName}/${params.productKey}`}
                        />
                      ),
                    },
                  },
                ],
              },
            ],
          },
        ],
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
