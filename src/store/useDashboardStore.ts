import {format} from 'date-fns';
import {create} from 'zustand';

type DashboardStore = {
  loadingLongevity: boolean;
  longevityData: Record<string, string>;
  setLongevityData: (type: string, value: string) => void;
  setLoadingLongevity: (loading: boolean) => void;
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  refresh: boolean;
  setRefresh: (refresh: boolean) => void;
  level: number;
  setLevel: (level: number) => void;
};

const useDashboardStore = create<DashboardStore>(set => ({
  selectedDate: format(new Date(), 'yyyy-MM-dd'),
  loadingLongevity: false,
  longevityData: {},
  refresh: false,
  level: 0,

  setLongevityData: (type, value) =>
    set(state => {
      if (type === 'RESET') {
        return {longevityData: {}};
      }
      return {longevityData: {...state.longevityData, [type]: value}};
    }),

  setLoadingLongevity: loading => set({loadingLongevity: loading}),
  setSelectedDate: date => set({selectedDate: date}),
  setRefresh: state => set(() => ({refresh: state})),
  setLevel: state => set(() => ({level: state})),
}));

export {useDashboardStore};
