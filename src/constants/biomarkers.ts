import {IconName} from '@icons';
import {AppNavigation} from '@screens/constants';
import {formatSleepTime, getAirQuality, getTotalSleepDuration} from '@utils';

type DailyActionProps = {
  id: string;
  title: string;
  primary: string;
  base: string;
  icon: IconName;
  highlights: string[];
};

const DAILY_ACTOIN_LIST: DailyActionProps[] = [
  {
    id: 'nutrition',
    title: 'Nutrition',
    primary: '#36CA5D',
    base: '#f2faf4',
    icon: 'kcal',
    highlights: ['Protein', 'Fats', 'Fiber', 'Vitamins'],
  },
  {
    id: 'fitness',
    title: 'Fitness',
    primary: '#E17800',
    base: '#fdf2e5',
    icon: 'fitness',
    highlights: ['Vo2Max', 'BMI', 'RHR', 'Avg.HR'],
  },
  {
    id: 'sleep',
    title: 'Sleep',
    primary: '#7b62e5',
    base: '#e5e0fa',
    icon: 'sleep-outline',
    highlights: ['Total', 'Deep', 'REM', 'Routine', 'Room Temp'],
  },

  {
    id: 'metabolic-health',
    title: 'Metabolic Health',
    primary: '#FFC107',
    base: '#fff9e6',
    icon: 'heart-beat-outline',
    highlights: ['Fasting', 'CGM', 'After Meal', 'Hemoglobin', 'Bed Time'],
  },
  {
    id: 'heart',
    title: 'Heart',
    primary: '#FF0000',
    base: '#ffe5e5',
    icon: 'heart-beat-outline',
    highlights: ['LDL', 'HDL', 'ApoB', 'Hs-CRP', 'Triglycerides'],
  },
  {
    id: 'toxion',
    title: 'Exposure to toxion',
    primary: '#D0B07B',
    base: '#faf7f2',
    icon: 'toxic',
    highlights: ['DTE', 'Exp. PM2.5', 'COCTW'],
  },
  {
    id: 'oral-care',
    title: 'Oral Care',
    primary: '#007AFF',
    base: '#e5f2ff',
    icon: 'oral-care',
    highlights: ['Brush', 'Floss'],
  },
  // {
  //   id: 'skin-care',
  //   title: 'Skin Care',
  //   primary: '#BA00D7',
  //   base: '#f8e5fb',
  //   icon: 'skin-care',
  //   highlights: ['Sunscreen', 'Moisturizer'],
  // },
  // {
  //   id: 'smell-care',
  //   title: 'Smell Care',
  //   primary: '#A2CA36',
  //   base: '#f6faec',
  //   icon: 'smell-care',
  //   highlights: ['SIT', 'UPSIT Test'],
  // },
  // {
  //   id: 'cognitive',
  //   title: 'Cognitive',
  //   primary: '#369DCA',
  //   base: '#ebf5fa',
  //   icon: 'fitness',
  //   highlights: ['MOCA', 'Xpresso Test', 'Temp Control'],
  // },
  // {
  //   id: 'stress',
  //   title: 'Stress',
  //   primary: '#36CACA',
  //   base: '#ebfafa',
  //   icon: 'fitness',
  //   highlights: ['HRV'],
  // },
  // {
  //   id: 'connectivity',
  //   title: 'Connectivity',
  //   primary: '#002F6DFA',
  //   base: '#e6ebf1',
  //   icon: 'fitness',
  //   highlights: ['Wearable', 'Apple Health'],
  // },
];

type LongevityListProps<T = any> = {
  id: string;
  title: string;
  icon: IconName;
  score: number;
  fetchFunction: (payload: T) => Promise<any>;
  default: boolean;
  screen: string;
};

const LONGEVITY_LIST: LongevityListProps<{startDate: Date; endDate: Date}>[] = [
  {
    id: 'AQI',
    title: 'AQI',
    score: 0,
    icon: 'aqi',
    fetchFunction: async () => {
      const aqi = await getAirQuality();
      return aqi?.aqi;
    },
    default: true,
    screen: '',
  },

  {
    id: 'Sleep',
    title: 'Sleep',
    score: 0,
    icon: 'sleep-outline',
    fetchFunction: async ({startDate, endDate}) => {
      const sleepDuration = await getTotalSleepDuration(startDate, endDate);
      return formatSleepTime(sleepDuration.total);
    },
    default: true,
    screen: AppNavigation.SLEEP_ANALYTICS,
  },
  {
    id: 'Fitness',
    title: 'Fitness',
    score: 0,
    icon: 'fitness',
    fetchFunction: async ({}) => {
      return '';
    },
    default: true,
    screen: '',
  },
  {
    id: 'Heart',
    title: 'Heart',
    score: 0,
    icon: 'heart-beat-outline',
    fetchFunction: async ({}) => {
      return '';
    },
    default: true,
    screen: '',
  },
  {
    id: 'Nutrition',
    title: 'Nutrition',
    score: 0,
    icon: 'kcal',
    fetchFunction: async ({}) => {
      return '';
    },
    default: true,
    screen: '',
  },
  {
    id: 'Metabolic Health',
    title: 'Metabolic Health',
    score: 0,
    icon: 'heart-beat-outline',
    fetchFunction: async ({}) => {
      return '';
    },
    default: true,
    screen: '',
  },

  {
    id: 'Stress',
    title: 'Stress',
    score: 0,
    icon: 'stress',
    fetchFunction: async ({}) => {
      return '';
    },
    default: true,
    screen: '',
  },

  {
    id: 'Oral Care',
    title: 'Oral Care',
    score: 0,
    icon: 'oral-care',
    fetchFunction: async ({}) => {
      return '';
    },
    default: true,
    screen: '',
  },

  {
    id: 'Skin Care',
    title: 'Skin Care',
    score: 0,
    icon: 'skin-care',
    fetchFunction: async ({}) => {
      return '';
    },
    default: true,
    screen: '',
  },

  {
    id: 'Smell Care',
    title: 'Smell Care',
    score: 0,
    icon: 'smell-care',
    fetchFunction: async ({}) => {
      return '';
    },
    default: true,
    screen: '',
  },

  {
    id: 'Connectivity',
    title: 'Connectivity',
    score: 0,
    icon: 'heart-beat-outline',
    fetchFunction: async ({}) => {
      return '';
    },
    default: false,
    screen: '',
  },
];

type KeyGoalsProps = {
  id: string;
  title: string;
  desc: string;
  score?: number;
  icon: IconName;
  hasQty: boolean;
};
const KEY_GOALS_LIST: KeyGoalsProps[] = [
  {
    id: 'vo2 Max',
    title: 'Vo2 Max',
    desc: '8 hours of sleep 8 hours of sleep',
    icon: 'o2',
    score: 40,
    hasQty: false,
  },
  {
    id: 'stay hydrated',
    title: 'Stay Hydrated',
    desc: 'Drink 8 glasses of water',
    icon: 'o2',
    score: 40,
    hasQty: true,
  },
  {
    id: 'vo2 Max',
    title: 'Vo2 Max',
    desc: '8 hours of sleep 8 hours of sleep',
    icon: 'o2',
    score: 40,
    hasQty: false,
  },
  {
    id: 'stay hydrated',
    title: 'Stay Hydrated',
    desc: 'Drink 8 glasses of water',
    icon: 'o2',
    score: 40,
    hasQty: true,
  },
];

type FallbackBiomarkerScoreProps = {
  id: string;
  name: string;
  cumulative_score_percentage: number;
};

const FallbackBiomarkerScore: FallbackBiomarkerScoreProps[] = [
  {id: 'Sleep', name: 'Sleep', cumulative_score_percentage: 0},
  {id: 'Fitness', name: 'Fitness', cumulative_score_percentage: 0},
  {id: 'Heart', name: 'Heart', cumulative_score_percentage: 0},
];

export {
  DAILY_ACTOIN_LIST,
  KEY_GOALS_LIST,
  LONGEVITY_LIST,
  FallbackBiomarkerScore,
};
export type {DailyActionProps, KeyGoalsProps, LongevityListProps};
