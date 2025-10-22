import {View} from 'react-native';
import {getPaddingStyles, StackProps} from '../StackProps';
import {styles} from '../styles';
import React from 'react';

const HStack = ({
  children,
  spacing = 0,
  p,
  px,
  py,
  pt,
  pb,
  pl,
  pr,
  align = 'center',
  justify = 'flex-start',
  style,
}: StackProps) => {
  return (
    <View
      style={[
        styles.stack,
        {
          flexDirection: 'row',
          alignItems: align,
          justifyContent: justify,
          ...getPaddingStyles(p, px, py, pt, pb, pl, pr),
        },
        style,
      ]}>
      {React.Children.map(children, (child, index) => (
        <View style={index !== 0 ? {marginLeft: spacing} : undefined}>
          {child}
        </View>
      ))}
    </View>
  );
};

export {HStack};
