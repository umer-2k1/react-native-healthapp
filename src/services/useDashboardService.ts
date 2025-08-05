import {
  formatSleepTime,
  getTotalSleepDuration,
  getUserTimeZoneOffset,
  http,
  standardSleepScore,
} from '@utils';
import {useQuery} from '@tanstack/react-query';
import {GetLongevityScoreResponse} from '@types';
import {endOfDay, format, parseISO, startOfDay} from 'date-fns';

interface SleepAnalyticsData {
  sleepScorePercentage: number;
  core: number;
  deep: number;
  awake: number;
  rem: number;
  total: number;
}

const sleepCalculation = async (selectedDate: string) => {
  const selected = parseISO(selectedDate);
  const startDate = startOfDay(selected);
  const endDate = endOfDay(selected);
  const sleepDuration = await getTotalSleepDuration(startDate, endDate);
  const sleep = formatSleepTime(sleepDuration.total);
  const score = standardSleepScore(sleep);
  return score;
};

const useDaiyScores = (date: string) => {
  const {data, ...rest} = useQuery({
    queryFn: async () => {
      const formattedDate = format(new Date(date), 'yyyy-MM-dd');
      const sleepScore = await sleepCalculation(formattedDate);

      const res = await http.get<GetLongevityScoreResponse>(
        `/dashboard?date=${formattedDate}&tz_offset=${getUserTimeZoneOffset()}`,
      );

      if ('success' in res) {
        return null;
      }
      const updatedScores = res.data.scores.map(score => {
        if (score.name === 'Sleep') {
          return {...score, cumulative_score_percentage: sleepScore};
        }
        return score;
      });
      const updatedResponse = {
        ...res.data,
        scores: updatedScores,
      };
      return updatedResponse;
    },
    queryKey: ['daily-score', date],
    refetchOnWindowFocus: true,
    staleTime: 0,
    retry: 3,
  });
  return {data, ...rest};
};

const useLongevityScores = (date: string) => {
  const {data, ...rest} = useQuery({
    queryFn: async () => {
      const formattedDate = format(new Date(date), 'yyyy-MM-dd');

      const res = await http.get<GetLongevityScoreResponse>(
        `/dashboard?date=${formattedDate}&tz_offset=${getUserTimeZoneOffset()}`,
      );

      if ('success' in res) {
        return null;
      }
      return res.data;
    },
    queryKey: ['longevity-score', date],
    refetchOnWindowFocus: true,
    staleTime: 0,
    retry: 3,
  });
  return {data, ...rest};
};

const useSleepAnalytics = (date: string) => {
  return useQuery<SleepAnalyticsData | null>({
    queryKey: ['sleep-analytics', date],
    queryFn: async () => {
      try {
        const formattedDate = format(new Date(date), 'yyyy-MM-dd'); // Format as YYYY-MM-DD
        const res = await http.get<GetLongevityScoreResponse>(
          `/dashboard?date=${formattedDate}&tz_offset=${getUserTimeZoneOffset()}`,
        );
        if (!res || 'success' in res) {
          return null;
        }

        const sleepScorePercentage =
          res.data.scores.find(f => f.name === 'Sleep')
            ?.cumulative_score_percentage || 0;

        if (sleepScorePercentage <= 0) {
          return {
            sleepScorePercentage: 0,
            core: 0,
            deep: 0,
            awake: 0,
            rem: 0,
            total: 0,
          };
        }

        const selectedDate = parseISO(formattedDate);
        const sleepDuration = await getTotalSleepDuration(
          startOfDay(selectedDate),
          endOfDay(selectedDate),
        );

        return {
          sleepScorePercentage,
          core: sleepDuration.core || 0,
          deep: sleepDuration.deep || 0,
          awake: sleepDuration.awake || 0,
          rem: sleepDuration.rem || 0,
          total: sleepDuration.total || 0,
        };
      } catch (error) {
        console.error('Error fetching sleep analytics:', error);
        return null;
      }
    },
    refetchOnWindowFocus: true,
    staleTime: 0,
    retry: 3,
  });
};

export {useLongevityScores, useSleepAnalytics, useDaiyScores};
