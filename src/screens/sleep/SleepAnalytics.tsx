import {
  AppView,
  CalendarBottomSheet,
  HStack,
  RNBottomSheetRef,
  Typography,
  VStack,
} from '@components/common';
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  determineScoreType,
  formatDateString,
  formatSleepTime,
  SKELETON_SPEED,
  standardSleepScore,
} from '@utils';
import {LongevityCard, LongevitySkeleton} from '@components/home/Longevity';
import {Colors, globalStyles} from '@constants';
import {Icon} from '@icons';
import {CoachRecommendation, Header} from '@components/layout';
import {useSleepAnalytics} from '@services';
import {useConnectivityStore} from '@store/useConnectivityStore';
import React, {useEffect, useRef, useState} from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const SleepAnalytics = () => {
  const {isConnectedHealthKit} = useConnectivityStore();
  const bottomSheetRef = useRef<RNBottomSheetRef>(null);
  const [selectedDate, setSelectedDate] = useState(new Date().toDateString());
  const {
    data,
    isFetching: isLoading,
    refetch,
  } = useSleepAnalytics(selectedDate);
  const [refresh, setRefresh] = useState(false);
  const onCalendarPress = () => {
    bottomSheetRef.current?.open();
  };

  const onCalendarConfirm = () => {
    bottomSheetRef.current?.close();
  };
  const onRefresh = () => {
    setRefresh(true);
    setTimeout(() => {
      setRefresh(false);
    }, 1000);
  };

  useEffect(() => {
    if (refresh) {
      refetch();
    }
  }, [refresh]);

  return (
    <>
      <AppView>
        <Header />

        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
          }>
          <VStack spacing={10}>
            <Typography
              px={12}
              style={{paddingTop: 16}}
              variant="h4"
              align="center"
              fontFamily="montserratSemiBold">
              Sleep Analytics
            </Typography>
            <HStack spacing={6} px={12} align="center">
              <TouchableOpacity
                style={[
                  globalStyles.flexRow,
                  globalStyles.alignCenter,
                  globalStyles.paddingTop16,
                ]}
                onPress={onCalendarPress}>
                <Icon name="calendar" size={20} />
                <Typography
                  fontFamily="poppinsMedium"
                  variant="body2"
                  style={{marginLeft: 8}}>
                  {' '}
                  {/* Adjust spacing */}
                  {formatDateString(selectedDate.toString())}
                </Typography>
              </TouchableOpacity>
            </HStack>

            <View
              style={{paddingHorizontal: 12, paddingVertical: 4, height: 220}}>
              {isLoading ? (
                <LongevitySkeleton />
              ) : (
                <LongevityCard
                  title={'Sleep'}
                  icon={
                    <Icon
                      name={'sleep-outline'}
                      size={24}
                      color={Colors.primary.main}
                    />
                  }
                  score={standardSleepScore(formatSleepTime(data?.total ?? 0))}
                  value={formatSleepTime(data?.total ?? 0)}
                  type={determineScoreType(
                    standardSleepScore(formatSleepTime(data?.total ?? 0)),
                  )}
                  disable={!isConnectedHealthKit}
                  showArrow={false}
                />
              )}
            </View>

            <CoachRecommendation
              name="John Doe"
              userName="Stuart"
              message="Time to rise and shine—today is a new opportunity to crush your goals! Your deep sleep was on point, giving your body a chance to repair..."
              avatar="https://randomuser.me/api/portraits/men/1.jpg"
            />

            <View style={[styles.card]}>
              <StageRow
                color={'#FFADAD'}
                name="Awake"
                time={data?.awake ?? 0}
                loading={isLoading}
              />
              <StageRow
                color={'#70AFFF'}
                name="REM"
                time={data?.rem ?? 0}
                loading={isLoading}
              />
              <StageRow
                color={'#007BFF'}
                name="Core"
                time={data?.core ?? 0}
                loading={isLoading}
              />
              <StageRow
                color={'#3D2BFF'}
                name="Deep"
                time={data?.deep ?? 0}
                loading={isLoading}
              />
            </View>
          </VStack>
        </ScrollView>
      </AppView>

      <CalendarBottomSheet
        ref={bottomSheetRef}
        selectedDate={selectedDate}
        onConfirm={onCalendarConfirm}
        setSelectedDate={setSelectedDate}
      />
    </>
  );
};

interface StageRowProps {
  color: string;
  name: string;
  time: number;
  loading: boolean;
}
const StageRow = ({color, name, time, loading}: StageRowProps) => {
  return (
    <View style={styles.stageRow}>
      <View style={[styles.dot, {backgroundColor: color}]} />
      <Text style={styles.label}>{name}</Text>
      {loading ? (
        <SkeletonPlaceholder speed={SKELETON_SPEED}>
          <SkeletonPlaceholder.Item width={40} height={12} borderRadius={4} />
        </SkeletonPlaceholder>
      ) : (
        <Text style={styles.percentage}>{formatSleepTime(time)} </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    ...globalStyles.card,
    paddingHorizontal: 12,
    marginHorizontal: 12,
    marginBottom: 40,
  },
  stageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  label: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
  },
  percentage: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export {SleepAnalytics};
