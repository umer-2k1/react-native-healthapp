import {BiomarkerType} from './constants';
import {HealthDataSample} from './types';

interface HealthDataItem {
  name: string;
  value: number | string;
  unit?: string;
  startDate: string;
  endDate: string;
}

interface LongevityKey {
  name: string;
  sub_longevity_keys: HealthDataItem[];
}

interface TransformedData {
  longevity_keys: LongevityKey[];
}

function transformData(
  rawData: Record<string, HealthDataSample[]>,
): TransformedData {
  const longevityKeys: LongevityKey[] = [];

  Object.keys(rawData).forEach(key => {
    rawData[key]?.forEach(item => {
      let existingGroup = longevityKeys.find(g => g.name === item.group);
      if (!existingGroup) {
        existingGroup = {name: item.group, sub_longevity_keys: []};
        longevityKeys.push(existingGroup);
      }
      existingGroup.sub_longevity_keys.push({
        name:
          item.type === BiomarkerType.SleepAnalysis
            ? item?.metadata?.type
            : item.type,
        value: item.value,
        unit: item.unit,
        startDate: item.startDate,
        endDate: item.endDate,
      });
    });
  });

  return {longevity_keys: longevityKeys};
}

export {transformData};
