import AppleHealthKit, {
  HealthValue,
  HealthKitPermissions,
  HealthInputOptions,
  HealthDateOfBirth,
  HealthStatusCode,
} from 'react-native-health';
import {showError, showSuccess} from './toast';
import {differenceInMinutes, parseISO} from 'date-fns';

type HealthKitGender = 'unknown' | 'male' | 'female' | 'other';

/* Define the permission options */
const allPermissions = Object.values(AppleHealthKit.Constants.Permissions);

const permissions = {
  permissions: {
    read: allPermissions,
    write: allPermissions,
  },
} as HealthKitPermissions;

const requestHealthPermissions = (): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    AppleHealthKit.initHealthKit(permissions, error => {
      if (error) {
        showError('Error', 'Cannot grant Apple Health permissions.');
        console.error('[ERROR] Cannot grant permissions!', error);
        reject(false);
        return;
      }

      checkHealthKitAvailability()
        .then(isAvailable => {
          if (isAvailable) {
            showSuccess('Success', 'Apple Health permissions granted!');
            resolve(true);
          } else {
            resolve(false);
          }
        })
        .catch(err => {
          console.error('[ERROR] Checking HealthKit availability failed!', err);
          reject(false);
        });
    });
  });
};

// check Apple HealthKit availability on the device
const isHealthKitAvailable = async (): Promise<boolean> => {
  return new Promise(resolve => {
    AppleHealthKit.isAvailable((err: Object, available: boolean) => {
      if (err) {
        console.error('Error initializing HealthKit:', err);
        resolve(false);
      } else {
        resolve(available);
      }
    });
  });
};

const checkHealthKitAvailability = async (): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    AppleHealthKit.getAuthStatus(permissions, (err, results) => {
      if (err) {
        console.error('Error fetching auth status:', err);
        reject(false);
        return;
      }
      resolve(results.permissions.read.includes(2));
    });
  });
};

const getHealthKitDateOfBirth = async (): Promise<HealthDateOfBirth | null> => {
  return new Promise(resolve => {
    AppleHealthKit.getDateOfBirth(
      {},
      (err: Object, results: HealthDateOfBirth) => {
        if (err) {
          console.error('Error fetching date of birth:', err);
          resolve(null);
        } else {
          resolve(results);
        }
      },
    );
  });
};

const getHealthKitGender = async (): Promise<HealthKitGender> => {
  return new Promise(resolve => {
    AppleHealthKit.getBiologicalSex(
      // @ts-ignore
      null,
      (err: Object, results: {value: HealthKitGender}) => {
        if (err) {
          resolve('unknown');
        } else {
          resolve(results.value);
        }
      },
    );
  });
};

const getHealthAuthStatus = async (
  dataTypes: string[],
): Promise<Record<string, HealthStatusCode>> => {
  return new Promise(resolve => {
    AppleHealthKit.getAuthStatus(
      {permissions: {read: [], write: dataTypes}} as HealthKitPermissions,
      (err, results) => {
        if (err) {
          console.error('Error fetching HealthKit permissions:', err);
          return resolve({});
        }

        resolve(
          Object.fromEntries(
            dataTypes.map((type, i) => [
              type,
              results.permissions.write[i] || HealthStatusCode.NotDetermined,
            ]),
          ),
        );
      },
    );
  });
};

// Get One Day sleep
const getTotalSleepDuration = async (
  startDate: Date,
  endDate: Date,
): Promise<{
  core: number;
  deep: number;
  rem: number;
  inbed: number;
  total: number;
  awake: number;
}> => {
  return new Promise((resolve, reject) => {
    const options: HealthInputOptions = {
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      limit: 100,
      ascending: true,
    };

    AppleHealthKit.getSleepSamples(options, (err, results: HealthValue[]) => {
      if (err) {
        reject(err);
        return;
      }

      let coreSleep = 0;
      let deepSleep = 0;
      let remSleep = 0;
      let inBed = 0;
      let awake = 0;

      results.forEach(sample => {
        if (sample.startDate && sample.endDate) {
          const start = parseISO(sample.startDate);
          const end = parseISO(sample.endDate);
          const durationMinutes = differenceInMinutes(end, start);
          const value = sample.value as unknown as string;
          if (value === 'CORE') {
            coreSleep += durationMinutes;
          } else if (value === 'DEEP') {
            deepSleep += durationMinutes;
          } else if (value === 'INBED') {
            inBed += durationMinutes;
          } else if (value === 'REM') {
            remSleep += durationMinutes;
          } else if (value === 'AWAKE') {
            awake += durationMinutes;
          }
        }
      });

      const totalSleep = coreSleep + deepSleep + remSleep;

      resolve({
        core: coreSleep,
        deep: deepSleep,
        rem: remSleep,
        inbed: inBed,
        awake: awake,
        total: totalSleep,
      });
    });
  });
};

// Get one Day vo2Max
const getVo2MaxAvg = async (
  startDate: Date,
  endDate: Date,
): Promise<{
  value: number;
}> => {
  return new Promise((resolve, reject) => {
    const options: HealthInputOptions = {
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      limit: 100,
      ascending: true,
    };

    AppleHealthKit.getVo2MaxSamples(options, (err, results: HealthValue[]) => {
      if (err) {
        reject(err);
        return;
      }
      let total = 0;
      let count = 0;

      results.forEach(sample => {
        if (sample.value) {
          total += sample.value;
          count++;
        }
      });

      const avg = count > 0 ? total / count : 0;

      resolve({
        value: avg,
      });
    });
  });
};

export {
  requestHealthPermissions,
  permissions,
  getTotalSleepDuration,
  getVo2MaxAvg,
  getHealthKitDateOfBirth,
  getHealthKitGender,
  isHealthKitAvailable,
  getHealthAuthStatus,
  allPermissions,
  checkHealthKitAvailability,
};
