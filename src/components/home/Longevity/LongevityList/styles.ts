import {globalStyles} from '@constants';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    ...globalStyles.flexRow,
    ...globalStyles.justifyBetween,
    marginVertical: 12,
    gap: 12,
  },
});

export {styles};
