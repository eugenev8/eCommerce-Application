import React from 'react';
import ReactDOM from 'react-dom/client';
<<<<<<< HEAD
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

=======
import { Provider } from 'react-redux';
import App from './App';
>>>>>>> 929c549 (feat: add Anonymous/Password/Token auth flows - 2)
import './index.css';
import { setupStore } from './store';

const store = setupStore();

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
<<<<<<< HEAD
    <RouterProvider router={router} />
=======
    <Provider store={store}>
      <App />
    </Provider>
>>>>>>> 929c549 (feat: add Anonymous/Password/Token auth flows - 2)
  </React.StrictMode>
);

export default routesPaths;
