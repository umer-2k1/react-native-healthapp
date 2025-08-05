import {differenceInHours, differenceInMinutes, parseISO} from 'date-fns';
import AppleHealthKit, {HealthPermission} from 'react-native-health';
import {
  BiomarkerType,
  CALORIE_GOAL,
  HealthKitUnit,
  MainBiomarkerType,
} from './constants';
import {HealthDataSample} from './types';

// Define types for health data

// Define the structure for each data type's configuration
interface HealthDataTypeConfig {
  key: BiomarkerType;
  permissions: HealthPermission | HealthPermission[];
  method: string;
  getOptions: (startDate: Date, endDate: Date) => any;
  formatter: (data: any) => HealthDataSample;
}

// Define the sync priority levels
interface SyncPriorityConfig {
  dataTypes: BiomarkerType[];
  syncInterval: number;
}
type SyncPriority = 'HIGH' | 'MEDIUM' | 'LOW';

// Interface for permissions object
interface HealthKitPermissions {
  read: string[];
  write: string[];
}

// Define the utility functions type
interface HealthKitUtilities {
  getSyncPriorityForDataType: (
    dataType: BiomarkerType | HealthDataTypeConfig,
  ) => SyncPriority;
  formatDataForSync: (
    dataType: BiomarkerType | HealthDataTypeConfig,
    data: any | any[],
  ) => HealthDataSample[];
}

// Map of data types to their corresponding methods and formatters
const healthKitDataTypes: Partial<Record<BiomarkerType, HealthDataTypeConfig>> =
  {
    //******* Fitness Biomarkers

    [BiomarkerType.Vo2Max]: {
      key: BiomarkerType.Vo2Max,
      permissions: AppleHealthKit.Constants.Permissions.HeartRate,
      method: 'getVo2MaxSamples',
      getOptions: (startDate: Date, endDate: Date) => ({
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        limit: 100,
        ascending: true,
      }),
      formatter: (data: any): HealthDataSample => ({
        group: MainBiomarkerType.Fitness,
        type: BiomarkerType.Vo2Max,
        id: data.id,
        value: data.value,
        unit: HealthKitUnit.bpm,
        startDate: data.startDate,
        endDate: data.endDate,
      }),
    },

    [BiomarkerType.BodyMassIndex]: {
      key: BiomarkerType.BodyMassIndex,
      permissions: AppleHealthKit.Constants.Permissions.BodyMass,
      method: 'getLatestBmi',
      getOptions: () => ({}),
      formatter: (data: any): HealthDataSample => ({
        group: MainBiomarkerType.Fitness,
        type: BiomarkerType.BodyMassIndex,
        value: data.value,
        unit: HealthKitUnit.count,
        startDate: data.startDate,
        endDate: data.endDate || data.startDate,
      }),
    },

    [BiomarkerType.RestingHeartRate]: {
      key: BiomarkerType.RestingHeartRate,
      permissions: AppleHealthKit.Constants.Permissions.RestingHeartRate,
      method: 'getRestingHeartRateSamples',
      getOptions: (startDate: Date, endDate: Date) => ({
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        ascending: true,
      }),
      formatter: (data: any): HealthDataSample => ({
        group: MainBiomarkerType.Fitness,
        type: BiomarkerType.RestingHeartRate,
        id: data.id,
        value: data.value,
        unit: HealthKitUnit.bpm,
        startDate: data.startDate,
        endDate: data.endDate,
      }),
    },

    [BiomarkerType.WalkingHeartRateAverage]: {
      key: BiomarkerType.RestingHeartRate,
      permissions: AppleHealthKit.Constants.Permissions.RestingHeartRate,
      method: 'getWalkingHeartRateAverage',
      getOptions: (startDate: Date, endDate: Date) => ({
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        ascending: true,
      }),
      formatter: (data: any): HealthDataSample => ({
        group: MainBiomarkerType.Fitness,
        type: BiomarkerType.RestingHeartRate,
        id: data.id,
        value: data.value,
        unit: HealthKitUnit.bpm,
        startDate: data.startDate,
        endDate: data.endDate,
      }),
    },

    [BiomarkerType.Steps]: {
      key: BiomarkerType.Steps,
      permissions: AppleHealthKit.Constants.Permissions.Steps,
      method: 'getStepCount',
      getOptions: (startDate: Date, endDate: Date) => ({
        date: endDate.toISOString(),
      }),
      formatter: (data: any): HealthDataSample => ({
        group: MainBiomarkerType.Fitness,
        type: BiomarkerType.Steps,
        unit: HealthKitUnit.count,
        value: data.value,
        startDate: data.startDate,
        endDate: data.endDate,
      }),
    },

    [BiomarkerType.ActiveEnergyBurned]: {
      key: BiomarkerType.ActiveEnergyBurned,
      permissions: AppleHealthKit.Constants.Permissions.ActiveEnergyBurned,
      method: 'getActiveEnergyBurned',
      getOptions: (startDate: Date, endDate: Date) => ({
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        includeManuallyAdded: true,
        ascending: true,
      }),
      formatter: (data: any): HealthDataSample => ({
        group: MainBiomarkerType.Fitness,
        type: BiomarkerType.ActiveEnergyBurned,
        value: data.value,
        unit: HealthKitUnit.kilocalorie,
        startDate: data.startDate,
        endDate: data.endDate,
      }),
    },

    [BiomarkerType.BasalEnergyBurned]: {
      key: BiomarkerType.BasalEnergyBurned,
      permissions: AppleHealthKit.Constants.Permissions.BasalEnergyBurned,
      method: 'getBasalEnergyBurned',
      getOptions: (startDate: Date, endDate: Date) => ({
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        includeManuallyAdded: true,
      }),
      formatter: (data: any): HealthDataSample => ({
        group: MainBiomarkerType.Fitness,
        type: BiomarkerType.BasalEnergyBurned,
        value: data.value,
        unit: HealthKitUnit.kilocalorie,
        startDate: data.startDate,
        endDate: data.endDate,
      }),
    },

    [BiomarkerType.HeartRate]: {
      key: BiomarkerType.HeartRate,
      permissions: AppleHealthKit.Constants.Permissions.HeartRate,
      method: 'getHeartRateSamples',
      getOptions: (startDate: Date, endDate: Date) => ({
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        limit: 100,
        ascending: true,
      }),
      formatter: (data: any): HealthDataSample => ({
        group: MainBiomarkerType.Fitness,
        type: BiomarkerType.HeartRate,
        id: data?.id,
        value: data.value,
        unit: HealthKitUnit.bpm,
        startDate: data.startDate,
        endDate: data.endDate,
      }),
    },

    [BiomarkerType.HeartRateVariability]: {
      key: BiomarkerType.HeartRateVariability,
      permissions: AppleHealthKit.Constants.Permissions.HeartRateVariability,
      method: 'getHeartRateVariabilitySamples',
      getOptions: (startDate: Date, endDate: Date) => ({
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        unit: HealthKitUnit.second,
      }),
      formatter: (data: any): HealthDataSample => ({
        group: MainBiomarkerType.Unkown,
        type: BiomarkerType.HeartRateVariability,
        value: data.value,
        // unit: HealthKitUnit.second,
        startDate: data.startDate,
        endDate: data.endDate || data.startDate,
      }),
    },

    [BiomarkerType.SleepAnalysis]: {
      key: BiomarkerType.SleepAnalysis,
      permissions: AppleHealthKit.Constants.Permissions.SleepAnalysis,
      method: 'getSleepSamples',
      getOptions: (startDate: Date, endDate: Date) => ({
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        limit: 100,
        ascending: true,
      }),
      formatter: (data: any): HealthDataSample => {
        const startDate = parseISO(data.startDate);
        const endDate = parseISO(data.endDate);
        const sleepDurationHours = differenceInHours(endDate, startDate);
        const sleepDurationMinutes =
          differenceInMinutes(endDate, startDate) % 60;
        const sleepDuration = Number(
          (sleepDurationHours + sleepDurationMinutes / 60).toFixed(2),
        );

        return {
          group: MainBiomarkerType.Sleep,
          type: BiomarkerType.SleepAnalysis,
          value: sleepDuration,
          id: data.id,
          unit: HealthKitUnit.hour,
          startDate: data.startDate,
          endDate: data.endDate,
          metadata: {
            type: data.value, // Store the sleep type
          },
        };
      },
    },

    [BiomarkerType.BodyMass]: {
      key: BiomarkerType.BodyMass,
      permissions: AppleHealthKit.Constants.Permissions.BodyMass,
      method: 'getWeightSamples',
      getOptions: (startDate: Date, endDate: Date) => ({
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        unit: HealthKitUnit.pound,
      }),
      formatter: (data: any): HealthDataSample => ({
        group: MainBiomarkerType.Unkown,
        type: BiomarkerType.BodyMass,
        value: data.value,
        unit: HealthKitUnit.pound,
        startDate: data.startDate,
        endDate: data.endDate || data.startDate,
      }),
    },

    //! Nutrition data

    // Calories consumed
    [BiomarkerType.EnergyConsumed]: {
      key: BiomarkerType.EnergyConsumed,
      permissions: AppleHealthKit.Constants.Permissions.BodyMass,
      method: 'getEnergyConsumedSamples',
      getOptions: (startDate: Date, endDate: Date) => ({
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
      }),
      formatter: (data: any): HealthDataSample => ({
        group: MainBiomarkerType.Unkown,
        type: BiomarkerType.EnergyConsumed,
        value: data.value, // Convert calories to kilocalories
        unit: HealthKitUnit.kilocalorie,
        startDate: data.startDate,
        endDate: data.endDate || data.startDate,
      }),
    },

    // Protien
    [BiomarkerType.ProteinPercentage]: {
      key: BiomarkerType.ProteinPercentage,
      permissions: AppleHealthKit.Constants.Permissions.Protein,
      method: 'getProteinSamples',
      getOptions: (startDate: Date, endDate: Date) => ({
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
      }),
      formatter: (data: any): HealthDataSample => ({
        group: MainBiomarkerType.Nutrition,
        type: BiomarkerType.ProteinPercentage,
        value: data.value,
        unit: HealthKitUnit.percent,
        startDate: data.startDate,
        endDate: data.endDate || data.startDate,
      }),
    },
    [BiomarkerType.ProteinGrams]: {
      key: BiomarkerType.ProteinGrams,
      permissions: AppleHealthKit.Constants.Permissions.Protein,
      method: 'getProteinSamples',
      getOptions: (startDate: Date, endDate: Date) => ({
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
      }),
      formatter: (data: any): HealthDataSample => ({
        group: MainBiomarkerType.Nutrition,
        type: BiomarkerType.ProteinGrams,
        value: data.value,
        unit: HealthKitUnit.gram,
        startDate: data.startDate,
        endDate: data.endDate || data.startDate,
      }),
    },

    // Fat
    [BiomarkerType.FatPercentage]: {
      key: BiomarkerType.FatPercentage,
      permissions: AppleHealthKit.Constants.Permissions.FatTotal,
      method: 'getTotalFatSamples',
      getOptions: (startDate: Date, endDate: Date) => ({
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
      }),
      formatter: (data: any): HealthDataSample => ({
        group: MainBiomarkerType.Nutrition,
        type: BiomarkerType.FatPercentage,
        value: data.value,
        unit: HealthKitUnit.percent,
        startDate: data.startDate,
        endDate: data.endDate || data.startDate,
      }),
    },

    // Carbohydrates
    [BiomarkerType.CarbsPercentage]: {
      key: BiomarkerType.CarbsPercentage,
      permissions: AppleHealthKit.Constants.Permissions.Carbohydrates,
      method: 'getCarbohydratesSamples',
      getOptions: (startDate: Date, endDate: Date) => ({
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
      }),
      formatter: (data: any): HealthDataSample => ({
        group: MainBiomarkerType.Nutrition,
        type: BiomarkerType.CarbsPercentage,
        value: data.value * 4,
        unit: HealthKitUnit.gram,
        startDate: data.startDate,
        endDate: data.endDate || data.startDate,
      }),
    },

    // Fiber
    [BiomarkerType.Fiber]: {
      key: BiomarkerType.Fiber,
      permissions: AppleHealthKit.Constants.Permissions.Fiber,
      method: 'getFiberSamples',
      getOptions: (startDate: Date, endDate: Date) => ({
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
      }),
      formatter: (data: any): HealthDataSample => ({
        group: MainBiomarkerType.Nutrition,
        type: BiomarkerType.CarbsPercentage,
        value: data.value,
        unit: HealthKitUnit.gram,
        startDate: data.startDate,
        endDate: data.endDate || data.startDate,
      }),
    },

    [BiomarkerType.DistanceWalkingRunning]: {
      key: BiomarkerType.DistanceWalkingRunning,
      permissions: AppleHealthKit.Constants.Permissions.DistanceWalkingRunning,
      method: 'getDistanceCycling',
      getOptions: (startDate: Date, endDate: Date) => ({
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        unit: HealthKitUnit.mile,
      }),
      formatter: (data: any): HealthDataSample => ({
        group: MainBiomarkerType.Unkown,
        type: BiomarkerType.DistanceWalkingRunning,
        value: data.value,
        unit: HealthKitUnit.mile,
        startDate: data.startDate,
        endDate: data.endDate,
      }),
    },

    [BiomarkerType.BodyFatPercentage]: {
      key: BiomarkerType.BodyFatPercentage,
      permissions: AppleHealthKit.Constants.Permissions.BodyFatPercentage,
      method: 'getBodyFatPercentageSamples',
      getOptions: (startDate: Date, endDate: Date) => ({
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
      }),
      formatter: (data: any): HealthDataSample => ({
        group: MainBiomarkerType.Unkown,
        type: BiomarkerType.BodyFatPercentage,
        value: data.value,
        unit: HealthKitUnit.percent,
        startDate: data.startDate,
        endDate: data.endDate,
      }),
    },

    [BiomarkerType.OxygenSaturation]: {
      key: BiomarkerType.OxygenSaturation,
      permissions: AppleHealthKit.Constants.Permissions.OxygenSaturation,
      method: 'getOxygenSaturationSamples',
      getOptions: (startDate: Date, endDate: Date) => ({
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
      }),
      formatter: (data: any): HealthDataSample => ({
        group: MainBiomarkerType.Unkown,
        type: BiomarkerType.OxygenSaturation,
        value: data.value * 100, // Convert decimal to percentage
        unit: HealthKitUnit.percent,
        startDate: data.startDate,
        endDate: data.endDate,
      }),
    },

    //************ Heart */

    [BiomarkerType.BloodPressureSystolic]: {
      key: BiomarkerType.BloodPressureSystolic,
      permissions: [
        AppleHealthKit.Constants.Permissions.BloodPressureDiastolic,
        AppleHealthKit.Constants.Permissions.BloodPressureSystolic,
      ],
      method: 'getBloodPressureSamples',
      getOptions: (startDate: Date, endDate: Date) => ({
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
      }),
      formatter: (data: any): HealthDataSample => ({
        group: MainBiomarkerType.Heart,
        type: BiomarkerType.BloodPressureSystolic,
        value: data.bloodPressureSystolicValue,
        unit: HealthKitUnit.mmhg,
        startDate: data.startDate,
        endDate: data.endDate,
      }),
    },
    [BiomarkerType.BloodPressureDiastolic]: {
      key: BiomarkerType.BloodPressureSystolic,
      permissions: [
        AppleHealthKit.Constants.Permissions.BloodPressureDiastolic,
        AppleHealthKit.Constants.Permissions.BloodPressureSystolic,
      ],
      method: 'getBloodPressureSamples',
      getOptions: (startDate: Date, endDate: Date) => ({
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
      }),
      formatter: (data: any): HealthDataSample => ({
        group: MainBiomarkerType.Heart,
        type: BiomarkerType.BloodPressureDiastolic,
        value: data.bloodPressureDiastolicValue,
        unit: HealthKitUnit.mmhg,
        startDate: data.startDate,
        endDate: data.endDate,
      }),
    },

    [BiomarkerType.BloodGlucose]: {
      key: BiomarkerType.BloodGlucose,
      permissions: AppleHealthKit.Constants.Permissions.BloodGlucose,
      method: 'getBloodGlucoseSamples',
      getOptions: (startDate: Date, endDate: Date) => ({
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
      }),
      formatter: (data: any): HealthDataSample => ({
        group: MainBiomarkerType.Unkown,
        type: BiomarkerType.BloodGlucose,
        value: data.value,
        unit: HealthKitUnit.mgPerdL,
        startDate: data.startDate,
        endDate: data.endDate,
      }),
    },

    [BiomarkerType.MindfulSession]: {
      key: BiomarkerType.MindfulSession,
      permissions: AppleHealthKit.Constants.Permissions.MindfulSession,
      method: 'getMindfulSession',
      getOptions: (startDate: Date, endDate: Date) => ({
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
      }),
      formatter: (data: any): HealthDataSample => ({
        group: MainBiomarkerType.Mindfulness,
        type: BiomarkerType.MindfulSession,
        value:
          (new Date(data.endDate).getTime() -
            new Date(data.startDate).getTime()) /
          60000, // Duration in minutes
        unit: HealthKitUnit.minute,
        startDate: data.startDate,
        endDate: data.endDate,
      }),
    },
  };

// Get all data types as an array
const getAllDataTypes = (): HealthDataTypeConfig[] =>
  Object.values(healthKitDataTypes);

// Get all required permissions
const getHealthKitPermissions = (): HealthKitPermissions => {
  const permissions: HealthKitPermissions = {
    read: [],
    write: [], // Only request read permissions
  };

  Object.values(healthKitDataTypes).forEach(dataType => {
    if (Array.isArray(dataType.permissions)) {
      permissions.read.push(...dataType.permissions);
    } else {
      permissions.read.push(dataType.permissions);
    }
  });

  return permissions;
};

// Priority levels for sync frequency
const syncPriorities: Record<SyncPriority, SyncPriorityConfig> = {
  HIGH: {
    dataTypes: [
      BiomarkerType.Steps,
      BiomarkerType.Vo2Max,
      BiomarkerType.SleepAnalysis,
      BiomarkerType.RestingHeartRate,
      BiomarkerType.WalkingHeartRateAverage,
      BiomarkerType.ActiveEnergyBurned,
      BiomarkerType.BasalEnergyBurned,
      BiomarkerType.BloodPressureDiastolic,
      BiomarkerType.BloodPressureSystolic,

      // End
      // BiomarkerType.HeartRate,
      // BiomarkerType.BodyFatPercentage,
      // BiomarkerType.EnergyConsumed,
      // BiomarkerType.BloodGlucose,
    ],
    syncInterval: 15 * 60 * 1000, // 15 minutes
  },
  MEDIUM: {
    dataTypes: [
      BiomarkerType.TotalCalories,
      BiomarkerType.ProteinPercentage,
      BiomarkerType.ProteinGrams,
      BiomarkerType.FatPercentage,
      BiomarkerType.CarbsPercentage,
    ],
    syncInterval: 30 * 60 * 1000, // 30 minutes
  },
  LOW: {
    dataTypes: [BiomarkerType.BodyMassIndex],
    syncInterval: 60 * 60 * 1000, // 1 hour
  },
};

// Utility functions
const healthKitUtils: HealthKitUtilities = {
  getSyncPriorityForDataType: (dataType): SyncPriority => {
    const dataTypeKey = typeof dataType === 'object' ? dataType.key : dataType;

    if (syncPriorities.HIGH?.dataTypes.includes(dataTypeKey)) {
      return 'HIGH';
    }
    if (syncPriorities.MEDIUM?.dataTypes.includes(dataTypeKey)) {
      return 'MEDIUM';
    }
    return 'LOW';
  },

  formatDataForSync: (dataType, data): HealthDataSample[] => {
    const dataTypeConfig =
      typeof dataType === 'object'
        ? dataType
        : healthKitDataTypes[dataType as BiomarkerType];

    if (!dataTypeConfig || !dataTypeConfig.formatter) {
      return Array.isArray(data) ? data : [data]; // Return unformatted if no formatter found
    }

    return Array.isArray(data)
      ? data.map(dataTypeConfig.formatter)
      : [dataTypeConfig.formatter(data)];
  },
};

// Define biomarkers that require aggregation
const AGGREGATED_BIOMARKERS = new Set([
  BiomarkerType.ActiveEnergyBurned,
  BiomarkerType.BasalEnergyBurned,
  BiomarkerType.ProteinPercentage,
  BiomarkerType.ProteinGrams,
  BiomarkerType.FatPercentage,
  BiomarkerType.CarbsPercentage,
]);

const NUTRITION_BIOMARKERS = new Set([
  BiomarkerType.ProteinPercentage,
  BiomarkerType.FatPercentage,
  BiomarkerType.CarbsPercentage,
]);

async function calculateTotalCalories(
  startDate: Date,
  endDate: Date,
): Promise<{
  calories: number;
  percentOfGoal: number;
  calorieData: HealthDataSample;
}> {
  // Fetch active and basal energy burned data directly
  const [activeData, basalData] = await Promise.all([
    fetchHealthData(BiomarkerType.ActiveEnergyBurned, startDate, endDate),
    fetchHealthData(BiomarkerType.BasalEnergyBurned, startDate, endDate),
  ]);
  const firstStartDate =
    activeData.length > 0
      ? activeData[activeData.length - 1]?.startDate
      : startDate.toISOString();

  const lastEndDate =
    activeData.length > 0
      ? activeData[activeData.length - 1]?.endDate
      : endDate.toISOString();

  const activeTotal = activeData.reduce(
    (sum, item) => sum + (item.value || 0),
    0,
  );
  const basalTotal = basalData.reduce(
    (sum, item) => sum + (item.value || 0),
    0,
  );

  const totalCalories = activeTotal + basalTotal;

  const totalCaloriesPercent = Math.min(
    (totalCalories / CALORIE_GOAL) * 100,
    100,
  ); // Convert to percentage

  const calorieData: HealthDataSample = {
    group: MainBiomarkerType.Nutrition,
    type: BiomarkerType.TotalCalories,
    value: totalCaloriesPercent,
    unit: HealthKitUnit.percent,
    startDate: firstStartDate,
    endDate: lastEndDate,
  };

  return {
    calories: totalCalories,
    percentOfGoal: totalCaloriesPercent,
    calorieData: calorieData,
  };
}

async function fetchHealthData(
  dataTypeKey: BiomarkerType,
  startDate?: Date,
  endDate?: Date,
): Promise<any[]> {
  const dataType = healthKitDataTypes[dataTypeKey];

  const defaultEndDate = new Date(); // Now
  const defaultStartDate = new Date();
  defaultStartDate.setHours(0, 0, 0, 0);

  const finalStartDate = startDate ?? defaultStartDate;
  const finalEndDate = endDate ?? defaultEndDate;

  // Calculate the total calories
  if (dataTypeKey === BiomarkerType.TotalCalories) {
    const {calorieData} = await calculateTotalCalories(
      finalStartDate,
      finalEndDate,
    );
    return [calorieData];
  }

  const options = dataType?.getOptions(finalStartDate, finalEndDate);

  // Ensure the method exists on AppleHealthKit
  const method = dataType?.method as keyof typeof AppleHealthKit;
  const healthKitMethod = (AppleHealthKit as any)[method];
  if (typeof healthKitMethod !== 'function') {
    throw new Error(`Method ${dataType?.method} not found in AppleHealthKit`);
  }

  try {
    const rawData = await new Promise<any[]>((resolve, reject) => {
      healthKitMethod(options, (err: Error | null, results: any) => {
        if (err) {
          console.error(`Error fetching ${dataTypeKey}:`, err);
          reject(err);
          return;
        }
        resolve(Array.isArray(results) ? results : results ? [results] : []);
      });
    });

    // If the biomarker requires aggregation, process it
    if (AGGREGATED_BIOMARKERS.has(dataTypeKey)) {
      if (rawData.length === 0) {
        return []; // No data
      }

      let totalValue = rawData.reduce(
        (sum, item) => sum + (item.value || 0),
        0,
      );
      const startDate = rawData[rawData.length - 1].startDate;
      const endDate = rawData[rawData.length - 1].endDate;

      // If the biomarker is nutrition-related, convert to percentage
      if (NUTRITION_BIOMARKERS.has(dataTypeKey)) {
        const {calories: totalCalories} = await calculateTotalCalories(
          finalStartDate,
          finalEndDate,
        );

        if (totalCalories === 0) {
          return [];
        }

        if (dataTypeKey === BiomarkerType.ProteinPercentage) {
          totalValue = totalValue * 4; // convert into calorie
        }
        if (dataTypeKey === BiomarkerType.CarbsPercentage) {
          totalValue = totalValue * 4; // convert into calorie
        }
        if (dataTypeKey === BiomarkerType.FatPercentage) {
          totalValue = totalValue * 9; // convert into calorie
        }
        // totalCaloriesPercent
        totalValue = (totalValue / totalCalories) * 100; // Convert to percentage
      }

      const data = {
        ...rawData[rawData.length - 1],
        value: totalValue,
        startDate,
        endDate,
      };
      return healthKitUtils.formatDataForSync(dataType!, data);
    }

    // Use the formatter to structure the data before returning
    return healthKitUtils.formatDataForSync(dataType!, rawData);
  } catch (error) {
    console.error(`Error fetching ${dataTypeKey}:`, error);
    return [];
  }
}

export {
  healthKitDataTypes,
  getAllDataTypes,
  getHealthKitPermissions,
  syncPriorities,
  healthKitUtils,
  fetchHealthData,
};

export type {
  HealthDataTypeConfig,
  SyncPriorityConfig,
  SyncPriority,
  HealthKitUtilities,
};
