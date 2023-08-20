import { toast } from 'react-toastify';

const toaster = {
  showError(errorMessage: string) {
    toast.error(errorMessage, {
      position: 'bottom-center',
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
  },
  showSuccess(successMessage: string) {
    toast.success(successMessage, {
      position: 'bottom-center',
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
  },
};

export default toaster;
