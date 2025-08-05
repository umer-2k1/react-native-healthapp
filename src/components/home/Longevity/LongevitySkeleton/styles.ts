import {Colors, globalStyles} from '@constants';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: Colors.neutral.white,
    height: 190,
    flex: 1,
  },
  header: {
    marginBottom: 16,
  },
  cardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    ...globalStyles.card,
    height: 190,
    flex: 1,
  },
});
export {styles};
