import {Colors} from '@constants';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  cardContainer: {
    marginBottom: 12,
  },
  card: {
    borderRadius: 12,
    padding: 12,
    borderWidth: 2,
    borderColor: '#BFBFBF33',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    backgroundColor: Colors.background.primary,
  },

  iconContainer: {
    backgroundColor: '#f2e7d7',
    width: 50,
    height: 50,
    borderRadius: 9999,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export {styles};
