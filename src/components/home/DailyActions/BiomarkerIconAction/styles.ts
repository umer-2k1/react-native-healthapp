import {Colors} from '@constants';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    margin: 10,
    gap: 10,
  },

  circle: {
    width: 70,
    height: 70,
    borderRadius: 9999,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary[100],
  },
});
