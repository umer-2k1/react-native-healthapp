import {StyleSheet} from 'react-native';
import {Size, Variant, Rounded} from './types';
import {Colors, globalStyles} from '@constants';

const getVariantStyles = (variant: Variant, disabled: boolean) => {
  const variants = {
    primary: {
      backgroundColor: disabled ? Colors.neutral.grey400 : Colors.primary.main,
      borderWidth: 2,
      borderColor: 'transparent',
    },
    secondary: {
      backgroundColor: disabled
        ? Colors.neutral.grey300
        : Colors.secondary.main,
      borderWidth: 2,
      borderColor: 'transparent',
    },
    outline: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: disabled ? Colors.neutral.grey400 : Colors.primary.main,
    },
    ghost: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: 'transparent',
    },
  };

  return variants[variant];
};

const getSizeStyles = (size: Size) => {
  const sizes = {
    xs: {
      paddingVertical: 4,
      paddingHorizontal: 8,
    },
    small: {
      paddingVertical: 8,
      paddingHorizontal: 16,
    },
    medium: {
      paddingVertical: 12,
      paddingHorizontal: 24,
    },
    large: {
      paddingVertical: 16,
      paddingHorizontal: 32,
    },
  };

  return sizes[size];
};

const getRoundedStyles = (rounded: Rounded) => {
  const roundedStyles = {
    sm: {
      borderRadius: 8,
    },
    md: {
      borderRadius: 16,
    },
    lg: {
      borderRadius: 24,
    },
    xl: {
      borderRadius: 50,
    },
    full: {
      borderRadius: 999,
    },
  };

  return roundedStyles[rounded];
};

const createButtonStyles = (
  variant: Variant,
  size: Size,
  rounded: Rounded,
  disabled: boolean,
  fullWidth: boolean,
) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      width: fullWidth ? '100%' : 'auto',
      ...getVariantStyles(variant, disabled),
      ...getSizeStyles(size),
      ...getRoundedStyles(rounded),
    },
    text: {
      color:
        variant === 'outline' || variant === 'ghost'
          ? disabled
            ? Colors.text.disabled
            : Colors.primary.main
          : Colors.text.white,
      textAlign: 'center',
      fontSize: 18,
      ...globalStyles.montserratSemiBold,
    },
    icon: {
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 8,
    },
  });
export {createButtonStyles};
