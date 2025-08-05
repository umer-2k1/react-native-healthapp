import {globalStyles} from '@constants';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  card: {
    ...globalStyles.card,
    flex: 1,
    gap: 12,
    paddingVertical: 20,
  },
  outerCircle: {
    width: 70,
    height: 70,
    borderRadius: 9999,
    borderWidth: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerCircle: {
    width: 50,
    height: 50,
    borderRadius: 9999,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export {styles};
