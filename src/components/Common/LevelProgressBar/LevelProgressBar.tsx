import {View} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {Typography} from '@components/common';
import {createLevelProgressStyle, progressbarColors} from './styles';
import {Colors} from '@constants';

type ProgressLevelType = 'active' | 'complete' | 'lock';

interface LevelProgressBarProps {
  currentScore: number;
  height?: number;
  disable?: boolean;
  type: ProgressLevelType;
  fontSize?: number;
}

const LevelProgressBar = ({
  currentScore,
  height = 35,
  disable = false,
  type,
  fontSize = 18,
}: LevelProgressBarProps) => {
  const currentLevel = Math.floor(currentScore);
  const progress = currentScore - currentLevel;
  const styles = createLevelProgressStyle(progress, type, height, disable);

  return (
    <View style={styles.progressBarContainer}>
      <View style={styles.container}>
        <View style={[styles.bubble, styles.leftBubble]}>
          <Typography
            fontFamily="montserratSemiBold"
            fontSize={fontSize}
            color={
              disable
                ? Colors.neutral.white
                : progressbarColors[type].bubbleActiveText
            }>
            {disable ? '-' : currentLevel}
          </Typography>
        </View>
        <View style={styles.progressBar}>
          <LinearGradient
            colors={progressbarColors[type].progressColor}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={[styles.linearGradient, {borderRadius: 999}]}
          />
        </View>
        <View style={styles.ratingTextContainer}>
          <Typography
            fontFamily="poppinsSemiBold"
            fontSize={fontSize}
            color={'white'}>
            Level
          </Typography>
        </View>

        {/* Right Rating Bubble */}
        <View style={[styles.bubble, styles.rightBubble]}>
          <Typography
            color={
              disable
                ? Colors.neutral.white
                : progressbarColors[type].bubbleDisableText
            }
            fontFamily="montserratSemiBold"
            fontSize={fontSize}>
            {disable ? '-' : currentLevel + 1}
          </Typography>
        </View>
      </View>
    </View>
  );
};

export {LevelProgressBar};

export type {ProgressLevelType};
