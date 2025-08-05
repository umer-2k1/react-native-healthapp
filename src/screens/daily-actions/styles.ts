import {Colors} from '@constants';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.primary.main,
    paddingBottom: 12,
  },
  list: {
    paddingBottom: 10,
  },
  itemsSpace: {
    justifyContent: 'space-between',
    marginBottom: 16,
    gap: 12,
    paddingHorizontal: 12,
  },
});

export {styles};
