import {StyleSheet} from 'react-native';
import {ProgressLevelType} from './LevelProgressBar';

const progressbarColors = {
  active: {
    backgroundColor: '#a69376',
    progressColor: ['#10213a', '#10213a'],
    bubbleActiveText: '#000',
    bubbleActiveColor: '#E5C58E',
    bubbleActiveBorder: '#E5C58E',
    bubbleDisableText: '#88909c',
    bubbleDisableColor: '#5c5a58',
  },
  complete: {
    backgroundColor: '',
    progressColor: ['', ''],
    //   bubble
    bubbleText: '',
    bubbleActiveColor: '',
    bubbleActiveText: '',
    bubbleActiveBorder: '',
    bubbleDisableText: '',
    bubbleDisableColor: '',
  },
  lock: {
    backgroundColor: '',
    progressColor: ['', ''],
    //   bubble
    bubbleText: '',
    bubbleActiveText: '',
    bubbleActiveColor: '',
    bubbleActiveBorder: '',
    bubbleDisableText: '',
    bubbleDisableColor: '',
  },
};

const createLevelProgressStyle = (
  progress: number,
  type: ProgressLevelType,
  height: number,
  disable: boolean,
) => {
  const bubbleSize = height * 0.9;
  return StyleSheet.create({
    progressBarContainer: {
      backgroundColor: progressbarColors[type].backgroundColor,
      paddingVertical: 4,
      paddingHorizontal: 4,
      borderRadius: 999,
    },
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
    },
    bubble: {
      position: 'absolute',
      borderRadius: 999,
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 1},
      shadowOpacity: 0.2,
      shadowRadius: 1,
      zIndex: 99,
    },
    leftBubble: {
      width: bubbleSize,
      height: bubbleSize,
      backgroundColor: disable
        ? progressbarColors[type].bubbleDisableColor
        : progressbarColors[type].bubbleActiveColor,
      left: 5,
      borderWidth: disable ? 0 : 1.3,
      borderColor: progressbarColors[type].bubbleActiveBorder,
    },
    rightBubble: {
      width: bubbleSize,
      height: bubbleSize,
      backgroundColor: progressbarColors[type].bubbleDisableColor,
      right: 5,
    },
    progressBar: {
      width: disable ? 0 : `${progress * 100}%`,
      height: height + 4,
      borderRadius: 999,
      maxWidth: '100%',
    },
    linearGradient: {
      width: '100%',
      height: '100%',
    },
    ratingTextContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
};

export {createLevelProgressStyle, progressbarColors};
