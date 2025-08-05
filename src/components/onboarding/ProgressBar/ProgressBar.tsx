import React from 'react';
import * as Progress from 'react-native-progress';
import {Colors} from '@constants';
import {useOnboardingStore} from '@store/useOnboardingStore';

const ProgressBar = () => {
  const {progress} = useOnboardingStore();
  return (
    <Progress.Bar
      progress={progress / 100}
      width={200}
      color={Colors.primary.main}
      unfilledColor={'#E2E4E7'}
      borderWidth={0}
      height={8}
    />
  );
};

export {ProgressBar};
