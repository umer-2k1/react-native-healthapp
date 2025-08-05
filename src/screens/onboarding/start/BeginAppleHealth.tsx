import {
  AuthView,
  BackgroundWrapper,
  Button,
  Typography,
} from '@components/common';
import {ProgressBar} from '@components/onboarding';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {OnboardingNavigation} from '@screens/constants';
import {useOnboardingStore} from '@store/useOnboardingStore';
import {OnboardingStackParamList} from '@types';
import React, {useEffect} from 'react';
import {View} from 'react-native';
import {styles} from './styles';
import {setItem, STORAGE_ENUMS} from '@utils';

const BeginAppleHealth = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<OnboardingStackParamList>>();
  const {setCurrentStep} = useOnboardingStore();

  const onContinue = () => {
    setItem(STORAGE_ENUMS.ONBOARDING_FIRST_STEP, true);
    navigation.navigate(OnboardingNavigation.HEALTH_ACCESS);
  };

  useEffect(() => {
    setCurrentStep(1);
  }, []);

  return (
    <BackgroundWrapper>
      <AuthView style={styles.container}>
        <View style={styles.topCenterView}>
          <ProgressBar />
        </View>
        <View style={styles.mainContent}>
          <Typography
            variant="h3"
            align="center"
            fontFamily="montserratSemiBold"
            style={styles.title}>
            To begin, we need access to your Apple Health.
          </Typography>
        </View>

        <View style={styles.buttonWrapper}>
          <Button
            variant="primary"
            rounded="xl"
            size="medium"
            onPress={onContinue}
            fullWidth>
            Continue
          </Button>
        </View>
      </AuthView>
    </BackgroundWrapper>
  );
};

export {BeginAppleHealth};
