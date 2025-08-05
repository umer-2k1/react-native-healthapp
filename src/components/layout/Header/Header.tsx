import Female from '@assets/user.png';
import {HStack, LevelProgressBar, Typography, VStack} from '@components/common';
import {Icon} from '@icons';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Colors} from '@constants';
import {AppNavigation} from '@screens/constants';
import {AppStackParamList, User} from '@types';
import React, {useEffect} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {STORAGE_ENUMS, checkHealthKitAvailability, getItem} from '@utils';
import {useConnectivityStore} from '@store/useConnectivityStore';
import {useDashboardStore} from '@store/useDashboardStore';

const Header = () => {
  const user = getItem<User>(STORAGE_ENUMS.USER);
  const {level} = useDashboardStore();
  const {isConnectedHealthKit, setConnectedHealthKit} = useConnectivityStore();

  const navigation =
    useNavigation<NativeStackNavigationProp<AppStackParamList>>();

  const onNotificationPress = () => {
    navigation.navigate(AppNavigation.NOTIFICATIONS);
  };
  const onConnectivityPress = () => {
    navigation.navigate(AppNavigation.CONNECTIVITY);
  };

  const onProfilePress = () => {
    navigation.navigate(AppNavigation.PROFILE);
  };

  const checkConnectivity = async () => {
    const isAvailable = await checkHealthKitAvailability();
    setConnectedHealthKit(isAvailable);
  };

  useEffect(() => {
    checkConnectivity();
  }, []);

  return (
    <>
      <LinearGradient
        colors={['#C6A662', '#B48E4F']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}>
        <View style={styles.container}>
          <VStack>
            <TouchableOpacity onPress={onProfilePress}>
              <Image source={Female} style={styles.avatarSize} />
            </TouchableOpacity>
            <Typography fontFamily="montserratSemiBold" variant="h6">
              {user?.full_name?.split(' ')[0]}
            </Typography>
          </VStack>

          <View style={{flex: 0.8}}>
            <LevelProgressBar
              currentScore={level}
              disable={!isConnectedHealthKit}
              type="active"
              height={25}
              fontSize={16}
            />
          </View>

          <HStack spacing={8}>
            <TouchableOpacity
              onPress={onNotificationPress}
              style={styles.iconContainer}>
              <Icon name="bell" size={24} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onConnectivityPress}
              style={styles.iconContainer}>
              <Icon
                name="link"
                size={18}
                color={isConnectedHealthKit ? 'green' : 'red'}
              />
              <Typography
                variant="caption"
                fontSize={10}
                color={Colors.text.primary}
                fontFamily="montserratSemiBold">
                {isConnectedHealthKit ? 100 : 0}
              </Typography>
            </TouchableOpacity>
          </HStack>
        </View>
      </LinearGradient>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary.main,
    paddingHorizontal: 16,
    paddingVertical: 8,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 999,
    backgroundColor: Colors.neutral.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarSize: {width: 35, height: 35},
});

export {Header};
