// StackProps.ts
import {ViewStyle} from 'react-native';

interface StackProps {
  children: React.ReactNode;
  spacing?: number;
  p?: number;
  px?: number;
  py?: number;
  pt?: number;
  pb?: number;
  pl?: number;
  pr?: number;
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
const getPaddingStyles = (p?: number, px?: number, py?: number, pt?: number, pb?: number, pr?: number, pl?: number ) => ({
  paddingTop: pt ?? py ?? p ?? 0,
  paddingBottom: pb ?? py ?? p ?? 0,
  paddingLeft: pl ?? px ?? p ?? 0,
  paddingRight: pr ?? px ?? p ?? 0,
});

export {getPaddingStyles};
export type {StackProps};
