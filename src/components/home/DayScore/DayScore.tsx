import {
  CalendarBottomSheet,
  HStack,
  NestedCircularProgress,
  RNBottomSheetRef,
  Typography,
  VStack,
} from '@components/common';
import {Colors, FallbackBiomarkerScore, globalStyles} from '@constants';
import {Icon} from '@icons';
import {useDaiyScores} from '@services';
import {useConnectivityStore} from '@store/useConnectivityStore';
import {useDashboardStore} from '@store/useDashboardStore';
import {determineIconName, formatDateString, SKELETON_SPEED} from '@utils';
import React, {useEffect, useRef} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {BiomarkerScore} from './BiomarkerScore';
import {BiomarkerSkeleton} from './BiomarkerSkeleton';

const DayScore = () => {
  const {selectedDate, setSelectedDate, refresh, setLevel} =
    useDashboardStore();
  const {isConnectedHealthKit} = useConnectivityStore();
  const bottomSheetRef = useRef<RNBottomSheetRef>(null);
  const {data, isFetching: loading, refetch} = useDaiyScores(selectedDate);

  const onCalendarPress = () => {
    bottomSheetRef.current?.open();
  };

  const onCalendarConfirm = () => {
    bottomSheetRef.current?.close();
  };

  useEffect(() => {
    refetch();
  }, [selectedDate, refresh]);

  useEffect(() => {
    if (data) {
      setLevel(data?.level ?? 0);
    }
  }, [data]);

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity
          style={[globalStyles.flexRow, styles.calendar]}
          onPress={onCalendarPress}>
          <Icon name="calendar" size={20} />
          <Typography fontFamily="poppinsMedium" variant="body2">
            {formatDateString(selectedDate)}
          </Typography>
        </TouchableOpacity>

        <View style={styles.rowContainer}>
          <View>
            <NestedCircularProgress
              dailyScore={data?.daily_score || 0}
              size={220}
              loading={loading}
              disable={!isConnectedHealthKit}
              scores={data?.scores || []}
            />
            {loading ? (
              <View style={styles.analyticsTextSkeleton}>
                <SkeletonPlaceholder speed={SKELETON_SPEED}>
                  <SkeletonPlaceholder.Item height={12} borderRadius={6} />
                </SkeletonPlaceholder>
              </View>
            ) : (
              false && (
                <HStack justify="center" spacing={2}>
                  <Icon
                    name="trending-up"
                    size={18}
                    color={Colors.status.success}
                  />
                  <Typography variant="body1" color={Colors.status.success}>
                    +2
                  </Typography>
                  <Typography
                    align="center"
                    variant="body1"
                    color={Colors.neutral.grey600}>
                    from yesterday
                  </Typography>
                </HStack>
              )
            )}
          </View>

          <VStack spacing={20}>
            {loading
              ? [1, 2, 3].map((_, index) => <BiomarkerSkeleton key={index} />)
              : (data?.scores?.length ? data.scores : FallbackBiomarkerScore)
                  ?.sort(
                    (a, b) =>
                      b.cumulative_score_percentage -
                      a.cumulative_score_percentage,
                  )
                  ?.slice(0, 3)
                  .map((value, index) => (
                    <BiomarkerScore
                      key={index}
                      label={value.name}
                      progress={value.cumulative_score_percentage}
                      disable={!isConnectedHealthKit}
                      icon={
                        <Icon
                          name={determineIconName(value.name)}
                          color={Colors.primary.main}
                          size={22}
                        />
                      }
                    />
                  ))}
          </VStack>
        </View>
      </View>

      <CalendarBottomSheet
        ref={bottomSheetRef}
        selectedDate={selectedDate}
        onConfirm={onCalendarConfirm}
        setSelectedDate={setSelectedDate}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    ...globalStyles.card,
    gap: 12,
  },
  circularProgress: {
    paddingTop: 14,
    borderWidth: 4,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  analyticsTextSkeleton: {
    alignSelf: 'center',
    width: '65%',
  },
  calendar: {
    gap: 8,
  },
});

export {DayScore};
