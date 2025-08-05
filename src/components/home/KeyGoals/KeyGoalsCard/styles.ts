import {globalStyles} from '@constants';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  card: {
    ...globalStyles.card,
    borderRadius: 15,
    flex: 0.5,
  },
  qtyButtons: {
    padding: 7,
    backgroundColor: '#E8E8E8',
    borderRadius: 999,
  },
});

export {styles};
