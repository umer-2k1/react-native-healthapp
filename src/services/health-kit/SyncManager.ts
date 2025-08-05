import {PostHealthDataRequest, PostHealthDataResponse} from '@types';
import {getUserTimeZoneOffset, http, setItem, STORAGE_ENUMS} from '@utils';
import {transformData} from './DataTransformer';

class SyncManager {
  private static instance: SyncManager;
  private constructor() {}
  public static getInstance(): SyncManager {
    if (!SyncManager.instance) {
      SyncManager.instance = new SyncManager();
    }
    return SyncManager.instance;
  }

  public async syncDataToServer(
    accumulatedData: Record<string, any[]>,
  ): Promise<boolean> {
    if (Object.keys(accumulatedData).length === 0) {
      return false;
    }
    const formattedData = transformData(accumulatedData);

    const payload: PostHealthDataRequest = {
      data: formattedData,
      user_timezone: Number(getUserTimeZoneOffset()),
    };
    console.log('🔄 Sending all biomarker data to server...', payload);
    try {
      const res = await http.post<PostHealthDataResponse>(
        '/health_data',
        payload,
      );

      console.log('✅ Data successfully sent to the server!', res);

      if ('success' in res && !res.success) {
        throw new Error(res.message);
      }
      setItem(STORAGE_ENUMS.LAST_SYNC, new Date());
      return true;
    } catch (error) {
      console.error('❌ Error syncing data:', error);
      return false;
    }
  }

  public async syncLastMonthDataToServer(
    accumulatedData: Record<string, any[]>,
  ): Promise<boolean> {
    if (Object.keys(accumulatedData).length === 0) {
      return false;
    }
    const formattedData = transformData(accumulatedData);

    const payload: PostHealthDataRequest = {
      data: formattedData,
      user_timezone: Number(getUserTimeZoneOffset()),
    };
    console.log('🔄 Sending all biomarker data to server...', payload);
    try {
      const res = await http.post<PostHealthDataResponse>(
        '/health_data',
        payload,
      );

      console.log('✅ Data successfully sent to the server!', res);

      if ('success' in res && !res.success) {
        throw new Error(res.message);
      }
      setItem(STORAGE_ENUMS.LAST_SYNC, new Date());
      return true;
    } catch (error) {
      console.error('❌ Error syncing data:', error);
      return false;
    }
  }
}

export {SyncManager};
