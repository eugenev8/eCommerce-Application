import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navigation from './components/navigation/Navigation';

export default function App() {
  return (
    <>
      <Navigation />
      <Outlet />
      <ToastContainer />
    </>
  );
}
