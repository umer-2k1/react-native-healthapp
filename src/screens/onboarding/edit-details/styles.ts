import {Colors, globalStyles} from '@src/constants';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
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
    marginVertical: 10,
  },
  title: {
    lineHeight: 32,
  },
  inputContainer: {
    width: '100%',
    marginTop: 12,
  },
  buttonWrapper: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    bottom: 16,
  },
});

const selectInputStyles = StyleSheet.create({
  label: {
    marginVertical: 8,
    color: Colors.text.secondary,
    fontSize: 16,
    ...globalStyles.montserratMedium,
  },
  error: {
    color: Colors.status.error,
    fontSize: 12,
    marginTop: 4,
  },
  inputIOSContainer: {
    borderWidth: 1,
    borderColor: Colors.input.border,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 10,
    backgroundColor: Colors.neutral.white,
    height: 54,
    paddingLeft: 40,
  },
  inputIOS: {
    fontSize: 16,
    ...globalStyles.poppinsRegular,
  },
});

export {styles, selectInputStyles};
