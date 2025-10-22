import {View} from 'react-native';
import {getPaddingStyles, StackProps} from '../StackProps';
import {styles} from '../styles';
import React from 'react';

// VStack: Vertical Stack Layout
const VStack = ({
  children,
  spacing = 0,
  p,
  px,
  py,
  pt,
  pb,
  pl,
  pr,
  align = 'stretch',
  justify = 'flex-start',
  style,
}: StackProps) => {
  return (
    <View
      style={[
        styles.stack,
        {
          flexDirection: 'column',
          alignItems: align,
          justifyContent: justify,
          ...getPaddingStyles(p, px, py, pt, pb, pl, pr),
        },
        style,
      ]}>
      {React.Children.map(children, (child, index) => (
        <View style={index !== 0 ? {marginTop: spacing} : undefined}>
          {child}
        </View>
      ))}
    </View>
  );
};

export {VStack};
