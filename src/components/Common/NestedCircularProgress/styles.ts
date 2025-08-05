import {Colors} from '@constants';
import {StyleSheet} from 'react-native';

const createCircularProgressStyle = (size: number, centerSize: number) => {
  return StyleSheet.create({
    centerCircle: {
      alignItems: 'center',
      justifyContent: 'center',
      width: centerSize,
      height: centerSize,
      borderRadius: 999,
      backgroundColor: '#10213a',
      gap: 4,
    },

    verticalIconBar: {
      position: 'absolute',
      bottom: -3,
      alignItems: 'center',
      justifyContent: 'space-evenly',
      backgroundColor: Colors.primary.main,
      borderRadius: 999,
      paddingVertical: 2,
      transform: [{translateX: size / 2 - 10}],
      zIndex: 2,
    },
    iconContainer: {
      width: 25,
      height: 20,
      borderRadius: 999,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
};

export {createCircularProgressStyle};
