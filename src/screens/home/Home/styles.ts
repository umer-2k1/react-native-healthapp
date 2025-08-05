import {Colors} from '@constants';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
    // backgroundColor: '#000',
  },
  mainContent: {
    flex: 1,
    marginVertical: 50,
    justifyContent: 'center',
  },
  button: {
    position: 'absolute',
    bottom: 10,
    left: 16,
  },
});

export {styles};
