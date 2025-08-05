import {View} from 'react-native';
import {createSeparatorStyles} from './styles';
import React from 'react';

interface SeparatorStyleProps {
  orientation?: 'horizontal' | 'vertical';
  color?: string;
  thickness?: number;
  length?: number | string;
  opacity?: number;
  margin?: number;
  dashed?: boolean;
}

const Separator = ({
  orientation = 'horizontal',
  color = '#E2E8F0',
  thickness = 1,
  length = '100%',
  opacity = 1,
  margin = 16,
  dashed = false,
}: SeparatorStyleProps) => {
  const styles = createSeparatorStyles({
    orientation,
    color,
    thickness,
    length,
    opacity,
    margin,
    dashed,
  });
  return <View style={styles.container} />;
};

export {Separator};
export type {SeparatorStyleProps};
