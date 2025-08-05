import lock from '@assets/lock.png';
import {
  AuthView,
  BackgroundWrapper,
  Button,
  Typography,
  VStack,
} from '@components/common';
import {LinkCard} from '@components/preferences';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {OnboardingNavigation} from '@screens/constants';
import {useProfileUpdate} from '@services';
import {STORAGE_ENUMS} from '@src/utils';
import {setItem} from '@src/utils/storage';
import {OnboardingStackParamList} from '@types';
import React from 'react';
import {Image, View} from 'react-native';
import {styles} from './styles';
import {Colors} from '@constants';

const Privacy = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<OnboardingStackParamList>>();
  const {mutateAsync} = useProfileUpdate();

  const onContinue = async () => {
    const res = await mutateAsync({accept_terms: true});
    if (res) {
      setItem(STORAGE_ENUMS.USER, res.data);
      navigation.navigate(OnboardingNavigation.BEGIN_APPLE_HEALTH);
    }
  };

  return (
    <BackgroundWrapper>
      <AuthView style={styles.container}>
        <View style={styles.content}>
          <View
            style={{
              alignItems: 'center',
            }}>
            <Image source={lock} />
            <VStack spacing={10} py={20} align="center">
              <Typography variant="h3" fontFamily="montserratMedium">
                Privacy by design
              </Typography>
              <Typography variant="body1" align="center">
                All health data is stored and processed locally. We never sell
                or share your information with third parties.
              </Typography>
            </VStack>
          </View>
          {/* Linking Cards */}
          <View style={styles.cardContainer}>
            <LinkCard
              title={'Terms of service'}
              url={'https://www.google.com'}
              iconName="terms"
              iconSize={20}
            />
            <LinkCard
              title={'Privacy Policy'}
              url={'https://www.google.com'}
              iconName="privacy"
              iconSize={20}
              isSeparator={false}
            />
          </View>
        </View>

        <View style={styles.buttonWrapper}>
          <Button
            variant="primary"
            rounded="xl"
            size="medium"
            onPress={onContinue}
            fullWidth>
            Accept & Continue
          </Button>
          <Typography
            variant="body2"
            align="center"
            py={16}
            color={Colors.neutral.grey800}>
            By tapping on "Accept and continue", you agree to our Terms of
            Service and Privacy Policy.
          </Typography>
        </View>
      </AuthView>
    </BackgroundWrapper>
  );
};

export {Privacy};
