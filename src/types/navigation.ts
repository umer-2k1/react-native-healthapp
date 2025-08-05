import {NavigatorScreenParams} from '@react-navigation/native';
import {
  AppNavigation,
  AuthNavigation,
  OnboardingNavigation,
} from '@screens/constants';

type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Onboarding: NavigatorScreenParams<OnboardingStackParamList>;
  App: NavigatorScreenParams<AppStackParamList>;
};

type AuthStackParamList = {
  [AuthNavigation.SIGN_IN]: undefined;
};
type OnboardingStackParamList = {
  [OnboardingNavigation.PRIVACY]: undefined;
  [OnboardingNavigation.BEGIN_APPLE_HEALTH]: undefined;
  [OnboardingNavigation.HEALTH_ACCESS]: undefined;
  [OnboardingNavigation.NO_DATA_DETECTED]: undefined;
  [OnboardingNavigation.EDIT_DETAILS]: undefined;
  [OnboardingNavigation.SYNC_APPLE_HEALTH_DATA]: undefined;
};

type AppStackParamList = {
  [AppNavigation.HOME]: undefined;
  [AppNavigation.AI_COACH]: undefined;
  [AppNavigation.GOALS]: undefined;
  [AppNavigation.HEALTH_METRICS]: undefined;
  [AppNavigation.DAILY_ACTIONS]: undefined;
  [AppNavigation.LONGEVITY]: undefined;
  [AppNavigation.LONGEVITY_KEYS_LIST]: undefined;
  [AppNavigation.CONNECTIVITY]: undefined;
  [AppNavigation.NOTIFICATIONS]: undefined;
  [AppNavigation.AQI]: undefined;
  [AppNavigation.PROFILE]: undefined;
  [AppNavigation.SLEEP_ANALYTICS]: undefined;
};

export type {
  RootStackParamList,
  AuthStackParamList,
  OnboardingStackParamList,
  AppStackParamList,
};
