import Decima from '@assets/decima.png';
import {BottomPopup} from '@components/bottom-popup';
import {Typography} from '@components/common';
import {Colors} from '@constants';
import {Icon, IconName} from '@icons';
import {
  BottomTabBarButtonProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {DailyActions, LongevityKeysList} from '@screens';
import {AppNavigation} from '@screens/constants';
import {BackgroundTaskManager} from '@services';
import {AppStackParamList} from '@types';
import React, {useEffect} from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {AppStack} from '../stack';
import {useAuthStore} from '@store/useAuthStore';

const {Screen, Navigator} = createBottomTabNavigator<AppStackParamList>();

const TabBarLabel = ({color, title}: {color: string; title: string}) => (
  <Typography color={color} variant="body2" fontFamily="poppinsMedium">
    {title}
  </Typography>
);

const TabBarIcon = ({
  name,
  color,
  size,
}: {
  name: IconName;
  color: string;
  size: number;
}) => <Icon name={name} color={color} size={size} />;

const CustomTabBarButton = ({onPress}: BottomTabBarButtonProps) => (
  <TouchableOpacity onPress={onPress} style={styles.customButton}>
    <View style={styles.circleBackground}>
      <View style={styles.innerCircle}>
        <Image source={Decima} style={styles.logo} />
      </View>
    </View>
  </TouchableOpacity>
);

const getTabOptions = (title: string, iconName: IconName) => ({
  tabBarLabel: ({color}: {color: string}) => (
    <TabBarLabel color={color} title={title} />
  ),
  tabBarIcon: ({color, size}: {color: string; size: number}) => (
    <TabBarIcon name={iconName} color={color} size={size} />
  ),
});

const BottomTab = () => {
  const {fetchUser} = useAuthStore();

  useEffect(() => {
    // Register Background Tasks
    const backgroundTaskManager = BackgroundTaskManager.getInstance();
    backgroundTaskManager.startBackgroundService();
    fetchUser();
  }, []);

  return (
    <View style={styles.container}>
      {/* Pop-up Message Above Center Tab */}
      <BottomPopup />

      <Navigator
        initialRouteName={AppNavigation.HOME}
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: Colors.primary.main,
          tabBarInactiveTintColor: '#808080',
          tabBarStyle: styles.tabBarStyle,
          tabBarLabelStyle: styles.tabBarLabelStyle,
          tabBarItemStyle: styles.tabBarItemStyle,
          tabBarIconStyle: styles.tabBarIconStyle,
        }}>
        <Screen
          name={AppNavigation.LONGEVITY_KEYS_LIST}
          component={LongevityKeysList}
          options={{
            ...getTabOptions('Longevity Keys', 'blood-cell'),
            tabBarButton: props => (
              <Pressable {...props} onPress={() => {}}>
                {props.children}
              </Pressable>
            ),
          }}
        />
        <Screen
          name={AppNavigation.HOME}
          component={AppStack}
          options={{
            tabBarLabel: () => null,
            tabBarButton: props => <CustomTabBarButton {...props} />,
          }}
        />
        <Screen
          name={AppNavigation.DAILY_ACTIONS}
          component={DailyActions}
          options={{
            ...getTabOptions('Daily Actions', 'dumbell'),
            tabBarButton: props => (
              <Pressable {...props} onPress={() => {}}>
                {props.children}
              </Pressable>
            ),
          }}
        />
      </Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBarStyle: {
    height: 85,
    backgroundColor: Colors.neutral.white,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    paddingHorizontal: 12,
  },
  tabBarLabelStyle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#808080',
    paddingBottom: 5,
  },
  tabBarItemStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBarIconStyle: {
    marginVertical: 5,
  },
  logo: {
    width: 70,
    height: 70,
    zIndex: 999,
    tintColor: Colors.neutral.white,
  },
  customButton: {
    top: -10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  circleBackground: {
    width: 90,
    height: 90,
    borderTopLeftRadius: 999,
    borderTopRightRadius: 999,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 30,
    borderColor: Colors.neutral.white,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: -0.2,
    shadowRadius: 8,
    elevation: 8,
    overflow: 'hidden',
  },
  innerCircle: {
    width: 75,
    height: 75,
    borderRadius: 999,
    backgroundColor: Colors.primary.main,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export {BottomTab};
