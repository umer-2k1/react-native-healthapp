import {AppState} from 'react-native';
import {CacheManager} from './CacheManager';
import {SyncManager} from './SyncManager';
import {fetchHealthData, syncPriorities, SyncPriority} from './config';
import BackgroundService from 'react-native-background-actions';
import {transformData} from './DataTransformer';

type SyncResult = {
  status: 'success' | 'error' | 'not_found';
  message: string;
};

class BackgroundTaskManager {
  private static instance: BackgroundTaskManager;
  private cacheManager: CacheManager;
  private syncManager: SyncManager;
  private isBackgroundServiceRunning = false;
  private lastSyncTimes: Record<SyncPriority, number> = {
    HIGH: 0,
    MEDIUM: 0,
    LOW: 0,
  };

  // Track intervals for each priority
  private syncIntervals: Record<SyncPriority, NodeJS.Timeout | null> = {
    HIGH: null,
    MEDIUM: null,
    LOW: null,
  };

  private constructor() {
    this.cacheManager = CacheManager.getInstance();
    this.syncManager = SyncManager.getInstance();
  }

  public static getInstance(): BackgroundTaskManager {
    if (!BackgroundTaskManager.instance) {
      BackgroundTaskManager.instance = new BackgroundTaskManager();
      BackgroundTaskManager.instance.initDependencies();
    }
    return BackgroundTaskManager.instance;
  }

  private initDependencies() {
    this.cacheManager = CacheManager.getInstance();
    this.syncManager = SyncManager.getInstance();
  }

  private getBackgroundOptions() {
    return {
      taskName: 'HealthDataSync',
      taskTitle: 'Syncing Health Data',
      taskDesc: 'Synchronizing health data in background',
      taskIcon: {
        name: 'ic_launcher',
        type: 'mipmap',
      },
      color: '#FF5733',
      linkingURI: 'yourapp://background',
      parameters: {
        delay: 1000,
      },
      foregroundService: {
        notificationTitle: 'Health Data Sync',
        notificationBody: 'Running in background',
        notificationColor: '#4CAF50',
      },
    };
  }

  private backgroundTask = async () => {
    console.log('[Background] Service started');

    // Get smallest interval (15 minutes in your case)
    const minInterval = Math.min(
      ...Object.values(syncPriorities).map(p => p.syncInterval),
    );

    while (BackgroundService.isRunning()) {
      try {
        // Only run when in background
        if (AppState.currentState !== 'background') {
          await new Promise(resolve => setTimeout(resolve, minInterval));
          continue;
        }

        const now = Date.now();
        console.log('[Background] Checking sync needs...');

        // Check each priority
        for (const priority of Object.keys(syncPriorities) as SyncPriority[]) {
          const {syncInterval} = syncPriorities[priority];

          if (now - this.lastSyncTimes[priority] >= syncInterval) {
            console.log(`[Background] Running ${priority} priority sync`);
            await this.runPrioritySync(priority);
            this.lastSyncTimes[priority] = now;
          }
        }

        await new Promise(resolve => setTimeout(resolve, minInterval));
      } catch (error) {
        console.error('[Background] Task error:', error);
        await new Promise(resolve => setTimeout(resolve, 5000));
      }
    }
    console.log('[Background] Service stopped');
  };

  public async startBackgroundService() {
    if (this.isBackgroundServiceRunning) {
      return;
    }

    try {
      console.log('[Background] Starting service...');
      await BackgroundService.start(
        this.backgroundTask,
        this.getBackgroundOptions(),
      );
      this.isBackgroundServiceRunning = true;

      // Initialize sync times
      const now = Date.now();
      this.lastSyncTimes.HIGH = now;
      this.lastSyncTimes.MEDIUM = now;
      this.lastSyncTimes.LOW = now;

      console.log('[Background] Service started successfully');
    } catch (error) {
      console.error('[Background] Failed to start:', error);
    }
  }

  public async stopBackgroundService() {
    if (!this.isBackgroundServiceRunning) {
      return;
    }

    try {
      this.clearAllIntervals();
      await BackgroundService.stop();
      this.isBackgroundServiceRunning = false;
      console.log('[Background] Service stopped');
    } catch (error) {
      console.error('[Background] Failed to stop:', error);
    }
  }

  /**
   * Initializes independent background sync intervals for each priority
   */
  public initBackgroundSyncInterval() {
    // Setup independent intervals for each priority
    for (const priority of Object.keys(syncPriorities) as SyncPriority[]) {
      const {syncInterval} = syncPriorities[priority];

      // Run the sync for this priority immediately
      this.runPrioritySync(priority);

      // Set up interval for this priority
      this.syncIntervals[priority] = setInterval(() => {
        // console.log(`⏳ Running scheduled ${priority} priority sync...`);
        this.runPrioritySync(priority);
      }, syncInterval);
    }
  }

  /**
   * Clears all running sync intervals
   */
  private clearAllIntervals() {
    for (const priority of Object.keys(this.syncIntervals) as SyncPriority[]) {
      if (this.syncIntervals[priority]) {
        clearInterval(this.syncIntervals[priority]!);
        this.syncIntervals[priority] = null;
      }
    }
  }

  /**
   * Runs sync for a specific priority
   */
  private async runPrioritySync(priority: SyncPriority) {
    console.log(`⏳123Running ="${priority}"= priority health data sync...`);
    const {dataTypes} = syncPriorities[priority];
    const accumulatedData: Record<string, any[]> = {};
    let hasUpdates = false;

    for (const dataType of dataTypes) {
      const formattedData = await fetchHealthData(dataType);

      if (
        !formattedData.length ||
        (formattedData.length === 1 && formattedData[0].value === 0)
      ) {
        continue;
      }

      // Check if there's new data using cache manager
      const hasNewData = this.cacheManager.hasNewData(dataType, formattedData);
      // console.log('Has new data:', hasNewData);

      if (hasNewData) {
        // Get only the new data points since last sync
        const newDataPoints = this.cacheManager.getNewDataSinceLastSync(
          dataType,
          formattedData,
        );

        // Only accumulate new data points for server sync
        if (newDataPoints.length > 0) {
          accumulatedData[dataType] = newDataPoints;
          hasUpdates = true;
        }
      }
    }

    // Send accumulated data to the server if needed for this priority
    if (hasUpdates) {
      console.log(
        `🔄 Sending updated ${priority} priority data to server...`,
        accumulatedData,
      );
      const success = await this.syncManager.syncDataToServer(accumulatedData);
      if (success) {
        for (const dataType in accumulatedData) {
          const data = accumulatedData[dataType];
          if (data && data.length > 0) {
            this.cacheManager.updateCache(dataType, data);
          }
        }
      }
    } else {
      console.log(`✅ No new =${priority}= priority data to sync.`);
    }
  }

  /**
   * Runs sync for all biomarkers at once (ignores priority & intervals)
   */
  public async runAllBiomarkersSync(): Promise<SyncResult> {
    console.log('🚀 Running full sync for all biomarkers...');

    const accumulatedData: Record<string, any[]> = {};
    let hasUpdates = false;
    for (const priority of Object.keys(syncPriorities) as SyncPriority[]) {
      const {dataTypes} = syncPriorities[priority];

      for (const dataType of dataTypes) {
        const formattedData = await fetchHealthData(dataType);

        if (
          !formattedData.length ||
          (formattedData.length === 1 && formattedData[0].value === 0)
        ) {
          continue;
        }
        console.log('FormaatedData...', formattedData);

        // Check if there's new data using cache manager
        const hasNewData = this.cacheManager.hasNewData(
          dataType,
          formattedData,
        );

        if (hasNewData) {
          // Get only the new data points since last sync
          const newDataPoints = this.cacheManager.getNewDataSinceLastSync(
            dataType,
            formattedData,
          );

          // Only accumulate new data points for server sync
          if (newDataPoints.length > 0) {
            accumulatedData[dataType] = newDataPoints;
            hasUpdates = true;
          }
        }
      }
    }

    // Send all accumulated data to the server
    if (hasUpdates) {
      const success = await this.syncManager.syncDataToServer(accumulatedData);
      if (success) {
        for (const dataType in accumulatedData) {
          const data = accumulatedData[dataType];
          if (data && data.length > 0) {
            this.cacheManager.updateCache(dataType, data);
          }
        }
        return {status: 'success', message: 'Sync completed successfully.'};
      } else {
        return {status: 'error', message: 'An error occurred during sync.'};
      }
    }

    return {status: 'not_found', message: 'No data found from Apple Health.'};
  }

  /**
   * Runs sync for all biomarkers for last month (ignores priority & intervals)
   */
  public async syncBiomarkersForLastMonth(
    startDate: Date,
    endDate: Date,
  ): Promise<{endDate: string; data: any} | null> {
    const accumulatedData: Record<string, any[]> = {};
    for (const priority of Object.keys(syncPriorities) as SyncPriority[]) {
      const {dataTypes} = syncPriorities[priority];

      for (const dataType of dataTypes) {
        const formattedData = await fetchHealthData(
          dataType,
          startDate,
          endDate,
        );

        if (
          !formattedData.length ||
          (formattedData.length === 1 && formattedData[0].value === 0)
        ) {
          continue;
        }

        accumulatedData[dataType] = formattedData;
      }
    }

    // Send all accumulated data to the server
    if (Object.keys(accumulatedData).length > 0) {
      const formattedData = transformData(accumulatedData);

      // console.log('Monthly Data.....', {
      //   endDate: endDate.toISOString(),
      //   accumulatedData,
      // });

      return {
        endDate: endDate.toISOString(),
        data: formattedData,
      };
    }
    return null;
  }
}

export {BackgroundTaskManager};
