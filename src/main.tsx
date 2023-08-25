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
import UserProfile from './pages/user/UserPage';
import UserDashboard from './pages/user/dashboard/UserDashboard';
import UserAddresses from './pages/user/adresses/UserAddresses';

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
    children: [
      {
        index: true,
        element: <MainPage />,
      },
      {
        path: routesPaths.login,
        element: <LoginPage />,
        loader: AuthGuardLoader,
      },
      {
        path: routesPaths.register,
        element: <RegisterPage />,
        loader: AuthGuardLoader,
      },
      {
        path: routesPaths.userProfile,
        element: <UserProfile />,
        children: [
          {
            index: true,
            element: <UserDashboard />,
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
