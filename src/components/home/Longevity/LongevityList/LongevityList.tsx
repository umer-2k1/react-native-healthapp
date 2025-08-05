import {HStack, Typography} from '@components/common';
import {Colors, LONGEVITY_LIST, LongevityListProps} from '@constants';
import {Icon} from '@icons';
import {useDashboardStore} from '@store/useDashboardStore';
import {
  capitalizeFirstChar,
  categorizeAQI,
  determineScoreType,
  standardSleepScore,
  userRegion,
} from '@utils';
import React, {useEffect, useState} from 'react';
import {Dimensions, FlatList, TouchableOpacity, View} from 'react-native';
import {LongevityCard} from '../LongevityCard';
import {LongevitySkeleton} from '../LongevitySkeleton';
import {styles} from './styles';
import {parseISO, startOfDay, endOfDay} from 'date-fns';
import {useLongevityScores} from '@services';
import {useConnectivityStore} from '@store/useConnectivityStore';

const LongevityList = () => {
  const screenWidth = Dimensions.get('window').width;
  const cardWidth = screenWidth * 0.47;
  const {setLongevityData, longevityData, selectedDate, refresh} =
    useDashboardStore();
  const {isConnectedHealthKit} = useConnectivityStore();
  const {data, isFetching} = useLongevityScores(selectedDate);
  const [loading, setLoading] = useState(false);
  const [longevityList, setLongevityList] = useState<LongevityListProps[]>([]);

  const viewAllHandler = () => {};

  const fetchLongevityData = async () => {
    setLoading(true);
    const selected = parseISO(selectedDate);
    const today = startOfDay(selected);
    const now = endOfDay(selected);

    const matchedItems = LONGEVITY_LIST.filter(
      item =>
        item.default || data?.scores.some(score => score.name === item.id),
    )
      .map(item => {
        const matchedScore = data?.scores.find(score => score.name === item.id);
        return {
          ...item,
          score: matchedScore?.cumulative_score_percentage || 0,
        };
      })
      .sort((a, b) => b.score - a.score);
    if (!matchedItems.length) {
      setLongevityData('RESET', '');
    }

    await Promise.all(
      matchedItems.map(async marker => {
        try {
          const value = await marker.fetchFunction({
            startDate: today,
            endDate: now,
          });
          setLongevityData(marker.id, value);
        } catch (error) {
          console.error(`Error fetching ${marker.title}:`, error);
        }
      }),
    );
    setLongevityList(matchedItems);
    setLoading(false);
  };

  useEffect(() => {
    if (!isFetching && data?.scores?.length) {
      fetchLongevityData();
    }
  }, [isFetching, data]);

  useEffect(() => {
    if (refresh || selectedDate) {
      fetchLongevityData();
    }
  }, [selectedDate, refresh]);

  return (
    <>
      <HStack justify="space-between" px={12}>
        <Typography variant="h4" fontFamily="montserratSemiBold">
          Longevity Keys
        </Typography>
        <TouchableOpacity onPress={viewAllHandler}>
          <Typography
            variant="h5"
            fontFamily="montserratSemiBold"
            color={Colors.text.main}>
            View all
          </Typography>
        </TouchableOpacity>
      </HStack>
      <View style={styles.container}>
        {isFetching || loading ? (
          <FlatList
            data={[1, 2, 3]}
            horizontal
            keyExtractor={(_, index) => index.toString()}
            renderItem={() => (
              <View style={{width: cardWidth, marginHorizontal: 5}}>
                <LongevitySkeleton />
              </View>
            )}
            showsHorizontalScrollIndicator={false}
          />
        ) : (
          <FlatList
            data={longevityList.length ? longevityList : LONGEVITY_LIST}
            horizontal
            keyExtractor={(_, index) => index.toString()}
            renderItem={({item}: {item: LongevityListProps}) => (
              <View style={{width: cardWidth, marginHorizontal: 5}}>
                <LongevityCard
                  title={item.title}
                  route={item.screen}
                  icon={
                    <Icon
                      name={item.icon}
                      size={24}
                      color={Colors.primary.main}
                    />
                  }
                  score={
                    item.id === 'AQI'
                      ? Number(longevityData[item.id])!
                      : item.id === 'Sleep'
                      ? standardSleepScore(longevityData[item.id]!)
                      : item.score
                  }
                  value={
                    item.id === 'AQI'
                      ? capitalizeFirstChar(userRegion())
                      : longevityData[item.id]!
                  }
                  type={
                    item.id === 'AQI'
                      ? categorizeAQI(Number(longevityData[item.id]))!
                      : item.id === 'Sleep'
                      ? determineScoreType(
                          standardSleepScore(longevityData[item.id]!),
                        )
                      : determineScoreType(item.score)
                  }
                  disable={!isConnectedHealthKit}
                  reversePointer={item.id === 'AQI'}
                />
              </View>
            )}
            showsHorizontalScrollIndicator={false}
          />
        )}
      </View>
    </>
  );
};

export {LongevityList};
