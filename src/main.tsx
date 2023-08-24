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

const store = setupStore();

const routesPaths = {
  main: '/',
  login: '/login',
  register: '/register',
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
