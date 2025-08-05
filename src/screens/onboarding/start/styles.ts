import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  topCenterView: {
    marginTop: 10,
    alignItems: 'center',
  },

  topView: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'center',
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    lineHeight: 32,
  },
  buttonWrapper: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 15,
    bottom: 16,
  },
});

export {styles};
