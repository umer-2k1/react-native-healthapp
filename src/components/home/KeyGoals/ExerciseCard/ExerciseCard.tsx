import {HStack, Typography, VStack} from '@components/common';
import {Icon} from '@icons';
import React from 'react';
import {styles} from './styles';

interface ExerciseCardProps {
  calorie: number;
  time: string;
  disable?: boolean;
}

const ExerciseCard = ({calorie, time, disable = false}: ExerciseCardProps) => {
  return (
    <VStack style={styles.card} py={16} px={10} spacing={10}>
      <Typography variant="h5" fontFamily="poppinsMedium">
        Exercise
      </Typography>

      <HStack spacing={10}>
        <Icon name="heat" size={26} />
        <Typography variant="h5" fontFamily="poppinsMedium">
          {disable ? 0 : calorie} Cal
        </Typography>
      </HStack>

      <HStack spacing={10}>
        <Icon name="time" size={26} />
        <Typography variant="h5" fontFamily="poppinsMedium">
          {disable ? '00:00 hr' : time}
        </Typography>
      </HStack>
    </VStack>
  );
};

export {ExerciseCard};
