import {Colors} from '@constants';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  popupContainer: {
    position: 'absolute',
    bottom: 110,
    left: 20,
    right: 20,
    zIndex: 10,
  },
  popup: {
    backgroundColor: '#E4C089',
    borderRadius: 12,
    padding: 16,
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
  message: {
    paddingLeft: 42,
  },

  chatButton: {
    marginTop: 12,
  },
  chatText: {
    textDecorationLine: 'underline',
  },
  triangle: {
    width: 0,
    height: 0,
    borderLeftWidth: 16,
    borderRightWidth: 16,
    borderTopWidth: 16,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: Colors.primary.main,
    alignSelf: 'center',
    marginTop: 0,
  },
});

export {styles};
