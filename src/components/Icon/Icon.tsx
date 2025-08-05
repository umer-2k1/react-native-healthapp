import React from 'react';
import {View, ViewStyle} from 'react-native';
import {SvgProps} from 'react-native-svg';
import {svgImports} from './svgs-imports';

type IconName = keyof typeof svgImports;

interface IconProps extends SvgProps {
  name: IconName;
  size?: number;
  color?: string;
  style?: ViewStyle;
}

const Icon = ({name, size = 24, color, style, ...props}: IconProps) => {
  const SvgIcon = svgImports[name];
  return (
    <View style={style}>
      <SvgIcon width={size} height={size} color={color} {...props} />
    </View>
  );
};

export {Icon};
export type {IconName};
