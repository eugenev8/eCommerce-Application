import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navigation from './components/navigation/Navigation';
import useToasterErrorMessage from './hooks/useToasterErrorMessage';

export default function App() {
  useToasterErrorMessage();

  return (
    <>
      <Navigation />
      <Outlet />
      <ToastContainer />
    </>
  );
}
