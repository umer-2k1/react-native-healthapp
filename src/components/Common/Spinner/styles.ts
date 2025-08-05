import {StyleSheet} from 'react-native';
import {LoaderSize} from './Spinner';

const mapSizeToRN = (size: LoaderSize): 'small' | 'large' => {
  return size === 'sm' ? 'small' : 'large';
};

const getSizeStyles = (size: LoaderSize) => {
  const sizes = {
    sm: {
      width: 16,
      height: 16,
    },
    md: {
      width: 24,
      height: 24,
    },
    lg: {
      width: 32,
      height: 32,
    },
  };

  return sizes[size];
};

const createSpinnerStyles = (size: LoaderSize) =>
  StyleSheet.create({
    container: {
      ...getSizeStyles(size),
    },
  });
export {createSpinnerStyles, mapSizeToRN};
