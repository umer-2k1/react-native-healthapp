import {View, FlexStyle, ViewStyle, DimensionValue} from 'react-native';
import React from 'react';
import {createFlexStyles} from './styles';

interface FlexProps {
  children: React.ReactNode;
  direction?: 'row' | 'column';
  align?: FlexStyle['alignItems'];
  justify?: FlexStyle['justifyContent'];
  wrap?: FlexStyle['flexWrap'];
  flex?: number;
  gap?: number;
  padding?: DimensionValue;
  margin?: DimensionValue;
  width?: DimensionValue;
  height?: DimensionValue;
  backgroundColor?: string;
  style?: ViewStyle;
}

const Flex = ({
  children,
  direction = 'row',
  align = 'center',
  justify = 'flex-start',
  wrap,
  flex,
  gap = 0,
  padding,
  margin,
  width,
  height,
  backgroundColor,
  style,
}: FlexProps) => {
  const styles = createFlexStyles({
    direction,
    align,
    justify,
    wrap,
    flex,
    gap,
    padding,
    margin,
    width,
    height,
    backgroundColor,
  });

  const childrenWithGap = React.Children.map(children, (child, index) => {
    if (index === React.Children.count(children) - 1) {
      return child;
    }

    return (
      <View
        style={{
          marginRight: direction === 'row' ? gap : 0,
          marginBottom: direction === 'column' ? gap : 0,
        }}>
        {child}
      </View>
    );
  });

  return <View style={[styles.container, style]}>{childrenWithGap}</View>;
};

export {Flex};

export type {FlexProps};
