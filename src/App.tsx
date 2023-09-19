import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navigation from './components/navigation/Navigation';
import useToasterErrorMessage from './hooks/useToasterErrorMessage';
import useLoadAuthState from './hooks/useLoadAuthState';
import Breadcrumbs from './components/breadcrumbs/Breadcrumbs';
import useLoadCategoriesData from './hooks/useLoadCategoriesData';
import FlexContainer from './components/containers/FlexContainer';
import LoaderSpinner from './components/loader/Loader';

export default function App() {
  useToasterErrorMessage();
  const isAuthLoaded = useLoadAuthState();
  useLoadCategoriesData();

  return (
    <>
      {!isAuthLoaded && (
        <FlexContainer style={{ justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <LoaderSpinner />
        </FlexContainer>
      )}
      {isAuthLoaded && (
        <>
          <Navigation />
          <Breadcrumbs />
          <Outlet />
          <ToastContainer />
        </>
      )}
    </>
  );
}
