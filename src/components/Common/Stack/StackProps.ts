// StackProps.ts
import {ViewStyle} from 'react-native';

interface StackProps {
  children: React.ReactNode;
  spacing?: number;
  p?: number;
  px?: number;
  py?: number;
  align?: 'flex-start' | 'center' | 'flex-end' | 'stretch';
  justify?:
    | 'flex-start'
    | 'center'
    | 'flex-end'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  style?: ViewStyle;
}

// Helper function for padding styles
const getPaddingStyles = (p?: number, px?: number, py?: number) => ({
  paddingHorizontal: px ?? p ?? 0,
  paddingVertical: py ?? p ?? 0,
});

export {getPaddingStyles};
export type {StackProps};
