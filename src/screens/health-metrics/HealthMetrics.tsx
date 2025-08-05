import {AppView, RNBottomSheetRef, RNBottomSheet} from '@components/common';
import {Colors} from '@constants';
import {LevelTracker} from '@src/components/home';
import React, {useRef} from 'react';
import {Button, Text} from 'react-native';

const HealthMetrics = () => {
  const bottomSheetRef = useRef<RNBottomSheetRef>(null);

  return (
    <AppView backgroundColor={Colors.background.primary}>
      <Text>HealthMetrics</Text>

      <Button
        title="Open Bottom Sheet"
        onPress={() => bottomSheetRef.current?.open()}
      />

      <RNBottomSheet
        ref={bottomSheetRef}
        snapPoints={['40%']}
        backdropOpacity={0.5}>
        <LevelTracker
          level={2}
          progress={2.5}
          completedGoals={3}
          totalGoals={6}
          disable={false}
        />
      </RNBottomSheet>
    </AppView>
  );
};

export {HealthMetrics};
