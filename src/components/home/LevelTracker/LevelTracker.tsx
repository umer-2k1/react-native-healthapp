import {
  Flex,
  LevelIndicator,
  LevelProgressBar,
  Typography,
} from '@components/common';
import React from 'react';
import {View} from 'react-native';
import {styles} from './styles';

interface LevelTrackerProps {
  level: number;
  progress: number;
  completedGoals: number;
  totalGoals: number;
  disable?: boolean;
}

const LevelTracker = ({
  level,
  progress,
  completedGoals,
  totalGoals,
  disable = false,
}: LevelTrackerProps) => {
  return (
    <View style={styles.container}>
      <LevelIndicator level={level} />

      <LevelProgressBar
        currentScore={progress}
        disable={disable}
        type="active"
      />

      <Flex justify="space-between" style={styles.footer}>
        <Typography variant="body2" fontFamily="poppinsMedium">
          {disable ? 'None' : `Unlock level ${level + 1}`}
        </Typography>

        <Typography variant="body2" fontFamily="poppinsMedium">
          {disable ? 'None' : `${completedGoals}/${totalGoals} Goals`}
        </Typography>
      </Flex>
    </View>
  );
};

export {LevelTracker};
