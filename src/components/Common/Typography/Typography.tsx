import {Text, TextProps, TextStyle} from 'react-native';
import React from 'react';
import {createTypographyStyles} from './styles';
import {globalStyles} from '@constants';

type FontFamily =
  | 'montserratRegular'
  | 'montserratMedium'
  | 'montserratSemiBold'
  | 'montserratBold'
  | 'poppinsRegular'
  | 'poppinsMedium'
  | 'poppinsSemiBold'
  | 'poppinsBold';

interface TypographyProps extends TextProps {
  variant?:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'body1'
    | 'body2'
    | 'caption';
  color?: string;
  align?: 'left' | 'center' | 'right';
  fontFamily?: FontFamily;
  fontSize?: number;
  style?: TextStyle | TextStyle[];
  children: React.ReactNode;
  p?: number;
  px?: number;
  py?: number;
  props?: any;
}

const Typography = ({
  variant = 'body1',
  color,
  align = 'left',
  fontFamily = 'poppinsRegular',
  fontSize,
  p,
  px,
  py,
  style,
  children,
  ...props
}: TypographyProps) => {
  const styles = createTypographyStyles(color);

  const getPaddingStyles = (p?: number, px?: number, py?: number) => ({
    paddingHorizontal: px ?? p ?? 0,
    paddingVertical: py ?? p ?? 0,
  });

  return (
    <Text
      numberOfLines={props.numberOfLines}
      style={[
        styles[variant],
        globalStyles[fontFamily],
        {
          textAlign: align,
          fontSize: fontSize ?? styles[variant].fontSize,
          ...getPaddingStyles(p, px, py),
        },
        style || {},
      ]}
      {...props}>
      {children}
    </Text>
  );
};

export {Typography};
export type {FontFamily};
