import {StyleSheet} from 'react-native';
import {SeparatorStyleProps} from './Separator';

const createSeparatorStyles = ({
  orientation = 'horizontal',
  color = '#E2E8F0',
  thickness = 1,
  length = '100%',
  opacity = 1,
  margin = 16,
  dashed = false,
}: SeparatorStyleProps) => {
  return StyleSheet.create({
    container: {
      ...(orientation === 'horizontal'
        ? {
            width: typeof length === 'number' ? length : '100%',
            height: thickness,
            marginVertical: margin,
          }
        : {
            width: thickness,
            height: typeof length === 'number' ? length : '100%',
            marginHorizontal: margin,
          }),
      backgroundColor: color,
      opacity,
      borderStyle: dashed ? 'dashed' : 'solid',
    },
  });
};

export {createSeparatorStyles};
