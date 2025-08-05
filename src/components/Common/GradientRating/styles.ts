import {GradientType} from '@types';
import {StyleSheet} from 'react-native';
interface CreateGradientRatingStyleProp {
  height: number;
  segments: number;
  pointerPosition: number;
  type: GradientType;
}

const gradientColors = {
  poor: ['#f1c6c9', '#ffa5ab', '#fe7880', '#fd4c56'],
  excellent: ['#d7f4df', '#86df9e', '#5ed57e', '#36ca5d'],
  good: ['#fff3cd', '#ffda6b', '#ffcd3a', '#ffc106'],
  disable: ['gray', 'gray', 'gray', 'gray'],
};

const createGradientRatingStyle = (props: CreateGradientRatingStyleProp) => {
  const {height, pointerPosition, segments} = props;

  return StyleSheet.create({
    container: {
      width: '100%',
      position: 'relative',
    },
    barContainer: {
      flexDirection: 'row',
      overflow: 'hidden',
      height,
    },
    segment: {
      flex: 1 / segments,
      height,
    },
    pointer: {
      position: 'absolute',
      width: 0,
      height: 0,
      backgroundColor: 'transparent',
      borderStyle: 'solid',
      borderLeftWidth: 6,
      borderRightWidth: 6,
      borderTopWidth: 8,
      borderLeftColor: 'transparent',
      borderRightColor: 'transparent',
      borderTopColor: '#333',
      transform: [{translateX: -6}, {translateY: -16}],
      left: pointerPosition,
      top: -1,
    },
    labelsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 8,
    },
    label: {
      fontSize: 11,
      color: '#666',
    },
  });
};

export {createGradientRatingStyle, gradientColors};
export type {CreateGradientRatingStyleProp};
