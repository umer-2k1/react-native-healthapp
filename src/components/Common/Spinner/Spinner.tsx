import {ViewStyle, ActivityIndicator} from 'react-native';
import React from 'react';
import {Colors} from '@constants';
import {createSpinnerStyles, mapSizeToRN} from './styles';

type LoaderSize = 'sm' | 'md' | 'lg';

interface SpinnerProps {
  size?: LoaderSize;
  color?: string;
  style?: ViewStyle;
}

const Spinner = ({
  size = 'md',
  color = Colors.primary.main,
  style,
}: SpinnerProps) => {
  const styles = createSpinnerStyles(size);
  return (
    <ActivityIndicator
      size={mapSizeToRN(size)}
      color={color}
      style={[styles.container, style]}
    />
  );
};

export {Spinner};
export type {SpinnerProps, LoaderSize};
