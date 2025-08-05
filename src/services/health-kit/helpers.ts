import {BackgroundTaskManager} from '@src/services';
import {PostHealthDataResponse} from '@src/types';
import {getUserTimeZoneOffset, http, setItem, STORAGE_ENUMS} from '@src/utils';
import {endOfDay, startOfDay, subDays} from 'date-fns';

type HealthData = Record<string, any>;
async function fetchHealthDataForPastDays(): Promise<boolean> {
  const today = new Date();
  const healthData: HealthData = {};

  for (let i = 29; i > 0; i--) {
    const startDate = startOfDay(subDays(today, i));
    const endDate = endOfDay(startDate);

    const result =
      await BackgroundTaskManager.getInstance().syncBiomarkersForLastMonth(
        startDate,
        endDate,
      );

    if (result) {
      const endDateString = result.endDate.split('T')[0] + 'T23:59:59';
      healthData[endDateString] = {
        ...result.data,
      };
    }
  }

  const payload = {
    data: healthData,
    user_timezone: Number(getUserTimeZoneOffset()),
  };
  console.log('healthData...', JSON.stringify(payload, null, 2));

  // try {
  //   const payload = {
  //     data: healthData,
  //     user_timezone: Number(getUserTimeZoneOffset()),
  //   };
  //   const res = await http.post<PostHealthDataResponse>(
  //     '/health_data',
  //     payload,
  //   );
  //   if ('success' in res && !res.success) {
  //     throw new Error(res.message);
  //   }
  //   setItem(STORAGE_ENUMS.LAST_SYNC, new Date());
  //   return true;
  // } catch (error) {
  //   console.error('Error fetching health data:', error);
  //   return false;
  // }

  return true;
}

export {fetchHealthDataForPastDays};
