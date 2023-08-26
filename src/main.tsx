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
import UserDashboard from './pages/user/dashboard/UserDashboard';
import UserAddresses from './pages/user/adresses/UserAddresses';
import UserAccount from './pages/user/account/UserAccount';

const store = setupStore();

const routesPaths = {
  main: '/',
  login: '/login',
  register: '/register',
  userProfile: '/profile',
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
            element: <UserDashboard />,
          },
          {
            path: 'address',
            element: <UserAddresses />,
          },
          {
            path: 'user',
            element: <UserAccount />,
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
