import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  card: {
    flex: 0.5,
    marginHorizontal: 6,
  },
  videoContainer: {
    position: 'relative',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 12,
  },
  thumbnail: {
    width: '100%',
    height: 180,
    borderRadius: 12,
  },
  playButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{translateX: -24}, {translateY: -24}],
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 999,
    width: 60,
    height: 60,
  },
  sourceLogo: {
    width: 30,
    height: 30,
    marginRight: 6,
  },
});

export {styles};
