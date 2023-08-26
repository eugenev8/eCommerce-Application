import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navigation from './components/navigation/Navigation';
import useToasterErrorMessage from './hooks/useToasterErrorMessage';
import useLoadStateValues from './hooks/useLoadStateValues';
import Breadcrumbs from './components/breadcrumbs/Breadcrumbs';

export default function App() {
  useToasterErrorMessage();
  useLoadStateValues();

  return (
    <>
      <Navigation />
      <Breadcrumbs />
      <Outlet />
      <ToastContainer />
    </>
  );
}
