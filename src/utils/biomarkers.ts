import {IconName} from '@src/components/Icon';
import {GradientType} from '@src/types';

const SCORE_THRESHOLDS = {
  EXCELLENT: 66.67,
  GOOD: 33.34,
  POOR: 0,
};

const determineScoreType = (score: number): GradientType => {
  if (score >= SCORE_THRESHOLDS.EXCELLENT) {
    return 'excellent';
  } else if (score >= SCORE_THRESHOLDS.GOOD) {
    return 'good';
  } else {
    return 'poor';
  }
};
const determineIconName = (name: string): IconName => {
  switch (name) {
    case 'Sleep':
      return 'sleep-outline';
    case 'Fitness':
      return 'fitness';
    case 'Heart':
      return 'heart-beat-outline';
    case 'Nutrition':
      return 'kcal';
    default:
      return 'trending-up';
  }
};

export {determineScoreType, SCORE_THRESHOLDS, determineIconName};
