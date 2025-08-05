import {AppView, VStack} from '@components/common';
import {
  DailyActions,
  DayScore,
  KeyGoals,
  LongevityList,
} from '@components/home';
import {Header} from '@components/layout';
import {useDashboardStore} from '@store/useDashboardStore';
import React from 'react';
import {RefreshControl, ScrollView, View} from 'react-native';

const Home = () => {
  const {refresh, setRefresh} = useDashboardStore();

  const onRefresh = () => {
    setRefresh(true);
    setTimeout(() => {
      setRefresh(false);
    }, 1000);
  };

  return (
    <AppView>
      <Header />

      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
        }>
        <VStack spacing={24}>
          {/* Daily Score */}
          <View style={[{marginTop: 22, marginHorizontal: 6}]}>
            <DayScore />
          </View>
          {/* BioMarkers  */}

          <View>
            <LongevityList />
          </View>

          {/* Daily Actions */}
          <DailyActions />

          {/* Key Goals */}
          <View style={{marginBottom: 20}}>
            <KeyGoals />
          </View>
        </VStack>
      </ScrollView>
    </AppView>
  );
};

export {Home};
