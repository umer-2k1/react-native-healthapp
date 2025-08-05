import {MMKV} from 'react-native-mmkv';
import {HealthDataSample} from './types';

/**
 * Cache Manager for handling health data caching operations
 */
class CacheManager {
  private storage: MMKV;
  private static instance: CacheManager;

  constructor() {
    this.storage = new MMKV({
      id: 'health-data-cache',
      encryptionKey: 'applehealth@123',
    });
  }
  public static getInstance(): CacheManager {
    if (!CacheManager.instance) {
      CacheManager.instance = new CacheManager();
    }
    return CacheManager.instance;
  }

  /**
   * Get cached latest data point for a specific health data type
   * @param dataType The type of health data
   * @returns Latest cached health data point or null if none exists
   */
  public getLatestCachedDataPoint(dataType: string): HealthDataSample | null {
    const cachedDataJson = this.storage.getString(`latest_${dataType}`);
    return cachedDataJson ? JSON.parse(cachedDataJson) : null;
  }

  /**
   * Update cache with the latest health data point
   * @param dataType The type of health data
   * @param dataPoints Array of health data points
   */
  public updateCache(dataType: string, dataPoints: HealthDataSample[]): void {
    if (dataPoints.length > 0) {
      // Only store the latest data point in cache
      const latestDataPoint = dataPoints[dataPoints.length - 1];
      this.storage.set(`latest_${dataType}`, JSON.stringify(latestDataPoint));
    }
  }

  /**
   * Check if new health data differs from cached data
   * @param dataType The type of health data
   * @param newData Newly fetched health data
   * @returns Boolean indicating if there's new data to update
   */
  public hasNewData(dataType: string, newData: HealthDataSample[]): boolean {
    if (newData.length === 0) {
      return false;
    }

    const latestCachedPoint = this.getLatestCachedDataPoint(dataType);

    // If no cached data exists, all fetched data is new
    if (!latestCachedPoint) {
      return true;
    }

    // Compare the last data point from new data with cached latest
    const latestNewPoint = newData[newData.length - 1];

    // Check if data has an ID; if yes, compare ID and value
    if (latestNewPoint?.id && latestCachedPoint?.id) {
      return !(
        latestCachedPoint.id === latestNewPoint.id &&
        latestCachedPoint.value === latestNewPoint.value
      );
    }

    // Check if the timestamp and value are the same
    return !(
      latestCachedPoint.endDate === latestNewPoint?.endDate &&
      latestCachedPoint.value === latestNewPoint.value
    );
  }

  /**
   * Get all new data since the last cached point
   * @param dataType The type of health data
   * @param newData Newly fetched health data
   * @returns Array of health data points that are newer than the cached point
   */
  public getNewDataSinceLastSync(
    dataType: string,
    newData: HealthDataSample[],
  ): HealthDataSample[] {
    const latestCachedPoint = this.getLatestCachedDataPoint(dataType);

    // If there's no cached data, all new data should be synced
    if (!latestCachedPoint) {
      return [...newData];
    }

    // Filter for data points newer than the latest cached point
    // We're using endDate for comparison, assuming that's the field representing when the data was recorded
    return newData.filter(point => {
      // Here we assume endDate is stored as an ISO string and needs to be parsed for comparison
      // Adjust based on your actual timestamp format

      // Prioritize ID comparison if available
      if (point.id && latestCachedPoint.id) {
        const cachedIndex = newData.findIndex(
          p => p.id === latestCachedPoint.id,
        );
        return newData.indexOf(point) > cachedIndex;
      }

      const pointEndDate =
        typeof point.endDate === 'string'
          ? new Date(point.endDate).getTime()
          : point.endDate;

      const cachedEndDate =
        typeof latestCachedPoint.endDate === 'string'
          ? new Date(latestCachedPoint.endDate).getTime()
          : latestCachedPoint.endDate;

      return pointEndDate > cachedEndDate;
    });
  }

  public clearAllCache(): void {
    this.storage.clearAll();
  }

  public getAllCacheItems(): Record<string, any> {
    const keys = this.storage.getAllKeys();
    const cache: Record<string, any> = {};

    keys.forEach(key => {
      const value = this.storage.getString(key);
      cache[key] = value ? JSON.parse(value) : null;
    });
    return cache;
  }
}

export {CacheManager};
