import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    lineHeight: 32,
  },
  image: {
    width: 100,
    height: 100,
  },
  loader: {
    justifyContent: 'center',
    width: 100,
    height: 100,
  },
  completeContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 24, // Ensure spacing from the bottom
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  successIconWrapper: {
    borderRadius: 9999,
    width: 96,
    height: 96,
    backgroundColor: '#effdf4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginVertical: 16,
  },
  buttonWrapper: {
    width: '100%',
    paddingBottom: 12,
  },
  failedIconWrapper: {
    borderRadius: 9999,
    width: 96,
    height: 96,
    backgroundColor: '#fdecec',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export {styles};
