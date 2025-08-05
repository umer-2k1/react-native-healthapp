import {Platform} from 'react-native';

const truncateText = (text: string, maxLength: number) => {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + '...';
  }
  return text;
};

const capitalizeFirstChar = (text: string): string => {
  if (!text) {
    return text;
  }
  return text.replace(/^./, char => char.toUpperCase());
};

const isIOS = Platform.OS === 'ios';

const formatSleepTime = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  let result = '';
  if (hours > 0) {
    result += `${hours}h`;
  }
  if (mins > 0) {
    result += (hours > 0 ? ' ' : '') + `${mins}m`;
  }

  return result || '0 m';
};

const formatNumber = (progress: number) => {
  return progress % 1 === 0 ? progress : progress.toFixed(1);
};

const calculateSleepScore = (sleepMinutes: number, sleepTargetHours = 8) => {
  const sleepHours = sleepMinutes / 60;
  let score;

  if (sleepHours <= 8) {
    // Normal case: Scale sleep hours linearly to 100
    score = (sleepHours / sleepTargetHours) * 100;
  } else if (sleepHours <= 9) {
    // Between 8-9 hours: Perfect score
    score = 100;
  } else {
    // Above 9 hours: Apply penalty
    const penalty = (sleepHours - sleepTargetHours) / sleepTargetHours;
    score = 100 * (1 - penalty);
  }
  return Math.max(0, parseFloat(score.toFixed(2)));
};

const extractMinutes = (formattedTime: string) => {
  const hourMatch = formattedTime?.match(/(\d+)h/)?.[1];
  const minuteMatch = formattedTime?.match(/(\d+)m/)?.[1];
  const hours = hourMatch ? parseInt(hourMatch, 10) : 0;
  const minutes = minuteMatch ? parseInt(minuteMatch, 10) : 0;
  return hours * 60 + minutes;
};

const standardSleepScore = (sleepTime: string) => {
  const minutes = extractMinutes(sleepTime);
  return calculateSleepScore(minutes);
};

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export {
  truncateText,
  capitalizeFirstChar,
  isIOS,
  formatSleepTime,
  formatNumber,
  extractMinutes,
  calculateSleepScore,
  standardSleepScore,
  delay,
};
