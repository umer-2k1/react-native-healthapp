import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ActivityIndicator, View} from 'react-native';
import {Colors} from '@constants';
import {AuthStack, OnboardingStack} from './stack';
import {useAuthStore} from '@store/useAuthStore';
import {RootStackParamList} from '@types';
import {setNavigationRef} from '@utils';
import {Stacks} from '@screens/constants';
import {BottomTab} from './tabs';

const {Navigator, Screen} = createNativeStackNavigator<RootStackParamList>();

const NavigationContent = () => {
  const {isAuthenticated, isOnboardingComplete, isLoading} = useAuthStore();

  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignContent: 'center'}}>
        <ActivityIndicator color={Colors.primary.main} />
      </View>
    );
  }

  return (
    <Navigator screenOptions={{headerShown: false}}>
      {!isAuthenticated ? (
        <Screen name={Stacks.AUTH} component={AuthStack} />
      ) : !isOnboardingComplete ? (
        <Screen name={Stacks.ONBOARDING} component={OnboardingStack} />
      ) : (
        <Screen name={Stacks.APP} component={BottomTab} />
      )}
    </Navigator>
  );
};

export const RootNavigation = () => {
  return (
    <NavigationContainer ref={setNavigationRef}>
      <NavigationContent />
    </NavigationContainer>
  );
};
