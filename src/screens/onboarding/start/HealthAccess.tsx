import healthBundle from '@assets/onboarding/health_bundle.png';
import {
  AuthView,
  BackButton,
  BackgroundWrapper,
  Button,
  Typography,
  VStack,
} from '@components/common';
import {ProgressBar} from '@components/onboarding';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {OnboardingNavigation} from '@screens/constants';
import {useOnboardingStore} from '@store/useOnboardingStore';
import {OnboardingStackParamList} from '@types';
import {requestHealthPermissions, setItem, STORAGE_ENUMS} from '@utils';
import React, {useEffect} from 'react';
import {Image, View} from 'react-native';
import {styles} from './styles';

const HealthAccess = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<OnboardingStackParamList>>();
  const {setCurrentStep, prevStep} = useOnboardingStore();

  const onSkip = () => {
    setItem(STORAGE_ENUMS.ALLOWED_HEALTH_KIT, false);
    setItem(STORAGE_ENUMS.ONBOARDING_LAST_STEP, true);
    navigation.navigate(OnboardingNavigation.EDIT_DETAILS);
  };

  const onContinue = async () => {
    const granted = await requestHealthPermissions();
    if (granted) {
      setItem<boolean>(STORAGE_ENUMS.ALLOWED_HEALTH_KIT, true);
      setItem(STORAGE_ENUMS.ONBOARDING_LAST_STEP, true);
      navigation.navigate(OnboardingNavigation.EDIT_DETAILS);
    }
  };

  const onBack = () => {
    prevStep();
    const state = navigation.getState();
    if (navigation.canGoBack() && state?.routes.length > 1) {
      navigation.goBack();
    } else {
      navigation.reset({
        index: 0,
        routes: [{name: OnboardingNavigation.BEGIN_APPLE_HEALTH}],
      });
    }
  };
  useEffect(() => {
    setCurrentStep(2);
  }, []);

  return (
    <BackgroundWrapper>
      <AuthView style={styles.container}>
        <View style={styles.topView}>
          <BackButton onPress={onBack} />
          <ProgressBar />
          <View />
        </View>
        <View style={styles.mainContent}>
          <Image source={healthBundle} style={{width: 350, height: 350}} />
          <VStack spacing={10} py={20} align="center">
            <Typography variant="h3" fontFamily="montserratSemiBold">
              Allow access to Health
            </Typography>
            <Typography variant="body1" align="center">
              Decima needs your Health data to provide insights and record of
              workouts.
            </Typography>
          </VStack>
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
          <Button
            variant="outline"
            rounded="xl"
            size="medium"
            onPress={onSkip}
            fullWidth>
            Skip
          </Button>
        </View>
      </AuthView>
    </BackgroundWrapper>
  );
};

export {HealthAccess};
