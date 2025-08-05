import {Colors} from '@constants';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  popupContainer: {
    position: 'absolute',
    bottom: 110,
    left: 20,
    right: 20,
    zIndex: 10,
    backgroundColor: Colors.neutral.white,
  },
  popup: {
    backgroundColor: '#E4C089',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: 4},
    shadowRadius: 8,
    elevation: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },
  iconContainer: {backgroundColor: Colors.primary.main, borderRadius: 999},
  icon: {
    width: 35,
    height: 35,
    tintColor: Colors.neutral.white,
  },
  closeIcon: {
    marginLeft: 'auto',
  },
  message: {},

  triangle: {
    width: 0,
    height: 0,
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderTopWidth: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: Colors.primary.main,
    alignSelf: 'center',
    marginTop: 0,
  },
});

export {styles};
