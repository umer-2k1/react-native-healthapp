import Toast from 'react-native-toast-message';

type ToastType = 'success' | 'info' | 'error' | 'warning';

interface ToastOptions {
  type: ToastType;
  message: string;
  title?: string;
}

/**
 * Show a toast message
 * @param options - Object containing type, message, and optional title
 */
const showToast = ({type, message, title}: ToastOptions) => {
  Toast.show({
    type,
    text1: title,
    text2: message,
    position: 'top',
    visibilityTime: 2000,
    autoHide: true,
    topOffset: 50,
  });
};

// Convenience functions for specific toast types
const showSuccess = (message: string, title: string = 'Success') =>
  showToast({type: 'success', message, title});

const showInfo = (message: string, title: string = 'Info') =>
  showToast({type: 'info', message, title});

const showWarning = (message: string, title: string = 'Warning') =>
  showToast({type: 'warning', message, title});

const showError = (message: string, title: string = 'Error') =>
  showToast({type: 'error', message, title});

export {showToast, showSuccess, showInfo, showWarning, showError};
