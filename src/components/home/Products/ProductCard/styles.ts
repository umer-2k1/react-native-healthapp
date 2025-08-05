import {Colors, globalStyles} from '@constants';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  card: {
    ...globalStyles.card,
    width: 250,
    marginHorizontal: 6,
  },
  imageContainer: {
    position: 'relative',
    marginBottom: 12,
  },
  image: {
    width: '100%',
    height: 180,
    borderRadius: 8,
    resizeMode: 'contain',
  },
  favoriteButton: {
    position: 'absolute',
    top: 10,
    right: 8,
    backgroundColor: Colors.background.primary,
    borderRadius: 8,
    padding: 6,
    elevation: 3,
  },
});

export {styles};
