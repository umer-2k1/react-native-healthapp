import {Colors, globalStyles} from '@constants';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    marginVertical: 8,
    color: Colors.text.primary,
    fontSize: 16,
    ...globalStyles.montserratMedium,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.neutral.grey300,
    borderRadius: 10,
    backgroundColor: Colors.background.primary,
    paddingHorizontal: 12,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2, // Y: 4
    },
    shadowOpacity: 0.05, // 5% opacity
    shadowRadius: 2, // Blur: 4
    elevation: 2, // Android only
  },
  input: {
    flex: 1,
    height: 54,
    color: Colors.text.primary,
    paddingHorizontal: 6,
    fontSize: 16,
    ...globalStyles.poppinsRegular,
  },
  icon: {
    marginHorizontal: 4,
  },
  error: {
    color: Colors.status.error,
    fontSize: 12,
    marginTop: 4,
  },
  errorInput: {
    borderColor: Colors.status.error,
  },
});
