import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  Connectivity,
  DailyActions,
  Home,
  LongevityKeysList,
  Notification,
  Profile,
  SleepAnalytics,
} from '@screens';
import {AppNavigation} from '@screens/constants';
import {RootStackParamList} from '@types';

const {Navigator, Screen} = createNativeStackNavigator<RootStackParamList>();
const AppStack = () => {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        headerShadowVisible: false,
      }}>
      <Screen name={AppNavigation.APP_HOME} component={Home} />
      <Screen name={AppNavigation.SLEEP_ANALYTICS} component={SleepAnalytics} />
      <Screen name={AppNavigation.DAILY_ACTIONS} component={DailyActions} />
      <Screen
        name={AppNavigation.LONGEVITY_KEYS_LIST}
        component={LongevityKeysList}
      />
      <Screen name={AppNavigation.CONNECTIVITY} component={Connectivity} />
      <Screen name={AppNavigation.NOTIFICATIONS} component={Notification} />
      <Screen name={AppNavigation.PROFILE} component={Profile} />
    </Navigator>
  );
};

export {AppStack};
