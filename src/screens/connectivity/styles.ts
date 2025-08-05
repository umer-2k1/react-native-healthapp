import {Colors, globalStyles} from '@constants';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.primary.main,
    paddingBottom: 12,
  },
  titleView: {
    flex: 1,
  },
  progressContainer: {
    ...globalStyles.alignCenter,
    marginVertical: 16,
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
    gap: 20,
  },
  statusBox: {
    ...globalStyles.card,
    flex: 1,
    padding: 16,
    backgroundColor: Colors.background.primary,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  redDot: {
    backgroundColor: Colors.connectivity.red,
  },
  greenDot: {
    backgroundColor: Colors.connectivity.green,
  },

  applehealthContainer: {
    marginVertical: 12,
  },
  connectionBtn: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 9999,
  },
  // Modal
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)', // Semi-transparent background
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 18,
    alignItems: 'center',
    height: 450,
  },
});

export {styles};
