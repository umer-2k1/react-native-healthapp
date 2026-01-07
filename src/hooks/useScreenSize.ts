import { Dimensions, Platform, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface ScreenSize {
  Height: number;
  Width: number;
  StatusBarHeight: number;
  combineHeight: number;
}

export const useScreenSize = (): ScreenSize => {
  const insets = useSafeAreaInsets();
  const { height, width } = Dimensions.get('window');

  const statusBarHeight: number =
    Platform.OS === 'android' ? StatusBar.currentHeight ?? 0 : insets.top;

  return {
    Height: height,
    Width: width,
    StatusBarHeight: statusBarHeight,
    combineHeight: height + statusBarHeight,
  };
};
