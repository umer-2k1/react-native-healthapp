import {Colors} from '@constants';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonWrapper: {
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  cardContainer: {
    marginTop: 20,
    backgroundColor: Colors.background.primary,
    width: '100%',
    borderRadius: 10,
    padding: 15,
    borderWidth: 1,
    marginBottom: 10,
    borderColor: '#E2E4E7',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 4, // Y: 4
    },
    shadowOpacity: 0.05, // 5% opacity
    shadowRadius: 4, // Blur: 4
    elevation: 4, // Android only
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  flexRowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export {styles};
