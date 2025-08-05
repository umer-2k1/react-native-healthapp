import {Colors} from '@constants';
import {StyleSheet} from 'react-native';

const createWeeklyySelectorStyle = (isSelected: boolean) => {
  return StyleSheet.create({
    item: {
      alignItems: 'center',
      marginHorizontal: 8,
    },
    selectedItem: {
      transform: [{scale: 1}],
    },
    circle: {
      width: 40,
      height: 40,
      borderRadius: 9999,
      backgroundColor: '#E3D3B5',
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 3,
    },
    indicator: {
      opacity: isSelected ? 1 : 0,
      backgroundColor: '#eee2d0',
      width: 12,
      height: 12,
      borderRadius: 9999,
      justifyContent: 'center',
      alignItems: 'center',
    },
    innerIndicatorCircle: {
      width: 4,
      height: 4,
      backgroundColor: Colors.primary.main,
      borderRadius: 9999,
    },

    selectedCircle: {
      backgroundColor: Colors.primary.main,
      shadowColor: Colors.primary.main,
      shadowOffset: {width: 0, height: 4},
      shadowOpacity: 0.9,
      shadowRadius: 8,
      borderRadius: 9999,
    },
    disabledCircle: {
      backgroundColor: '#F0F0F0',
    },
    dayNumber: {
      fontSize: 18,
      color: '#FFF',
      fontWeight: '600',
    },
    selectedText: {
      color: '#FFF',
      fontWeight: 'bold',
    },
    disabledText: {
      color: '#A7A7A7',
    },
    dayLabel: {
      marginTop: 5,
      fontSize: 16,
      color: '#000',
    },
    boldText: {
      fontWeight: 'bold',
    },
  });
};

const containerStyle = StyleSheet.create({
  container: {
    paddingVertical: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export {createWeeklyySelectorStyle, containerStyle};
