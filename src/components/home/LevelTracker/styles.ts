import {Colors} from '@constants';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background.primary,
    padding: 16,
    borderWidth: 2,
    borderColor: '#BFBFBF33',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    gap: 20,
  },
  outerLevelBadge: {
    backgroundColor: '#555a5c',
    borderRadius: 9999,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  levelBadge: {
    width: 30,
    height: 30,
    borderRadius: 9999,
    backgroundColor: '#1a0f24',
    justifyContent: 'center',
    alignItems: 'center',
  },
  levelText: {
    textAlign: 'center',
  },
  progressBarContainer: {
    backgroundColor: '#fef2dd',
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 999,
  },
  footer: {
    paddingHorizontal: 8,
  },
});

export {styles};
