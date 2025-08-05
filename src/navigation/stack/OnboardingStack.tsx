import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Privacy, SyncHealthData} from '@screens';
import {OnboardingNavigation} from '@screens/constants';
import {BeginAppleHealth, EditDetails, HealthAccess} from '@screens/onboarding';
import {OnboardingStackParamList, User} from '@types';
import {STORAGE_ENUMS} from '@utils';
import {getItem} from '@utils/storage';
import {useEffect, useState} from 'react';

const {Navigator, Screen} =
  createNativeStackNavigator<OnboardingStackParamList>();

const OnboardingStack = () => {
  const [initialScreen, setInitialScreen] = useState<string | null>(null);
  const user = getItem<User>(STORAGE_ENUMS.USER);
  const lastOnboardStep = getItem(STORAGE_ENUMS.ONBOARDING_LAST_STEP);
  const firstOnboardStep = getItem(STORAGE_ENUMS.ONBOARDING_FIRST_STEP);

  const getInitialScreen = () => {
    if (!user?.accept_terms) {
      return OnboardingNavigation.PRIVACY;
    }
    if (!user?.onboarding_completed && lastOnboardStep) {
      return OnboardingNavigation.EDIT_DETAILS;
    }
    if (!firstOnboardStep) {
      return OnboardingNavigation.BEGIN_APPLE_HEALTH;
    } else {
      return OnboardingNavigation.HEALTH_ACCESS;
    }
  };

  useEffect(() => {
    const screen = getInitialScreen();
    if (screen) {
      setInitialScreen(screen);
    }
  }, []);

  if (!initialScreen) {
    return null;
  }
  return (
    <Navigator
      initialRouteName={initialScreen}
      screenOptions={{
        headerShown: false,
        headerShadowVisible: false,
      }}>
      <Screen name={OnboardingNavigation.PRIVACY} component={Privacy} />
      <Screen
        name={OnboardingNavigation.BEGIN_APPLE_HEALTH}
        component={BeginAppleHealth}
      />
      <Screen
        name={OnboardingNavigation.HEALTH_ACCESS}
        component={HealthAccess}
      />
      <Screen
        name={OnboardingNavigation.EDIT_DETAILS}
        component={EditDetails}
      />
      <Screen
        name={OnboardingNavigation.SYNC_APPLE_HEALTH_DATA}
        component={SyncHealthData}
      />
    </Navigator>
  );
};

export {OnboardingStack};
