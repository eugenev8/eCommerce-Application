import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './index.css';

import App from './App';
import MainPage from './pages/main/MainPage';
import LoginPage from './pages/login/LoginPage';
import RegisterPage from './pages/register/RegisterPage';
import ErrorPage from './pages/error/ErrorPage';

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
      },
      {
        path: routesPaths.register,
        element: <RegisterPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

export default routesPaths;
