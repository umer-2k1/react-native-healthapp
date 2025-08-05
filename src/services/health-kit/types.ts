import {BiomarkerType, HealthKitUnit, MainBiomarkerType} from './constants';

interface HealthDataSample {
  group: MainBiomarkerType;
  type: BiomarkerType;
  value: number;
  unit?: HealthKitUnit;
  startDate: string;
  endDate: string;
  id?: string;
  sourceId?: string;
  sourceName?: string;
  metadata?: {
    [key: string]: any;
  };
}

export type {HealthDataSample};
