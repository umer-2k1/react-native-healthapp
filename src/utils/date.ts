import {format, isToday, isYesterday} from 'date-fns';
import {formatInTimeZone} from 'date-fns-tz';

const getUserTimeZone = () => {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
};

const getUserTimeZoneOffset = (): string => {
  const offsetMinutes = new Date().getTimezoneOffset();
  const offsetHours = -offsetMinutes / 60; // Convert minutes to hours and invert the sign
  return offsetHours.toString();
};

const formatDateLabel = (date: string) => {
  if (isToday(date)) {
    return 'Today';
  }
  if (isYesterday(date)) {
    return 'Yesterday';
  }

  return format(date, 'EEEE, MMMM d');
};

const formatDateString = (date?: string) => {
  return format(date || new Date(), 'EEE, dd-MMM-yyyy');
};

const extractTime = (timestamp: string) => {
  const date = new Date(timestamp);
  return format(date, 'h:mm a');
};

const getTimezoneOffset = (dateString: string) => {
  return format(new Date(dateString), 'XXX');
};

const getOffsetFromISO = (isoDate: string): string | null => {
  const match = isoDate.match(/([+-]\d{2}:\d{2}|[+-]\d{4}|Z)$/);
  return match ? match[0].replace(/(\d{2})(\d{2})$/, '$1:$2') : null;
};

const userRegion = () => {
  const city = getUserTimeZone().split('/')[1]?.toLowerCase() || '';
  return city;
};

const formatDateToUserTimeZone = (dateString: string) => {
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const date = new Date(dateString);
  return formatInTimeZone(date, userTimeZone, 'yyyy-MM-dd');
};

export {
  extractTime,
  formatDateLabel,
  formatDateString,
  formatDateToUserTimeZone,
  getOffsetFromISO,
  getTimezoneOffset,
  getUserTimeZone,
  getUserTimeZoneOffset,
  userRegion,
};
