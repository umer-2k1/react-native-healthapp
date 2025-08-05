import {create} from 'zustand';
import {MMKV} from 'react-native-mmkv';
import {http, STORAGE_ENUMS} from '@src/utils';
import {clearStorage, getItem, setItem} from '@src/utils/storage';
import {User, UserProfileUpdateResponse} from '@src/types';

const storage = new MMKV();

type AuthStore = {
  isAuthenticated: boolean;
  isOnboardingComplete: boolean;
  isLoading: boolean;
  //   Actions
  setAuthenticated: (value: boolean) => void;
  setOnboardingComplete: (value: boolean) => void;
  initializeNavigation: () => Promise<void>;
  logout: () => void;

  fetchUser: () => Promise<void>;
};

const useAuthStore = create<AuthStore>(set => ({
  isAuthenticated: false,
  isOnboardingComplete: false,
  isLoading: true,

  initializeNavigation: async () => {
    try {
      const token = getItem(STORAGE_ENUMS.ACCESS_TOKEN);
      const user = getItem<User>(STORAGE_ENUMS.USER);
      const onboardingComplete = user?.onboarding_completed;

      set({
        isAuthenticated: !!token,
        isOnboardingComplete: !!onboardingComplete,
        isLoading: false,
      });
    } catch (error) {
      console.error('Failed to load navigation state:', error);
      set({isLoading: false});
    }
  },

  setAuthenticated: value => {
    set({isAuthenticated: value});
  },

  setOnboardingComplete: value => {
    set({isOnboardingComplete: value});
    storage.set(STORAGE_ENUMS.IS_ONBOARDED, value);
  },

  logout: () => {
    clearStorage();
    set({
      isAuthenticated: false,
      isOnboardingComplete: false,
    });
  },

  fetchUser: async () => {
    try {
      const res = await http.get<UserProfileUpdateResponse>('/user');
      if ('success' in res) {
        throw new Error(res.message);
      }
      setItem<User>(STORAGE_ENUMS.USER, res.data);
    } catch (error) {
      console.error(error);
    }
  },
}));

export {useAuthStore};
