import {StyleSheet, ViewStyle} from 'react-native';

const getAlignment = (align: 'left' | 'center' | 'right'): ViewStyle => ({
  alignSelf:
    align === 'left' ? 'flex-start' : align === 'right' ? 'flex-end' : 'center',
});

const AppLogoStyles = StyleSheet.create({
  container: {
    marginVertical: 4,
  },
});

export {AppLogoStyles, getAlignment};
