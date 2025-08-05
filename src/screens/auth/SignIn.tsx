import {
  AppLogo,
  AuthView,
  BackgroundWrapper,
  Button,
  Typography,
} from '@components/common';
import {Colors} from '@constants';
import {Icon} from '@icons';
import {appleAuth} from '@invertase/react-native-apple-authentication';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useSignIn} from '@services';
import {useAuthStore} from '@store/useAuthStore';
import {DecodedToken, RootStackParamList, User} from '@types';
import {showError, STORAGE_ENUMS} from '@utils';
import {setItem} from '@utils/storage';
import React from 'react';
import {View} from 'react-native';
import {styles} from './styles';
import {jwtDecode} from 'jwt-decode';
import {useNetInfo} from '@react-native-community/netinfo';

const SignIn = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const {setAuthenticated, setOnboardingComplete} = useAuthStore();
  const {mutateAsync, isPending} = useSignIn();
  const {isConnected} = useNetInfo();

  const handleSubmit = async () => {
    if (!isConnected) {
      showError(
        'Network issue detected. Please check your internet connection and try again.',
      );
      return;
    }

    const appleRes = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });

    if (!appleRes.identityToken || !appleRes.authorizationCode) {
      showError('Apple Sign-In failed. Please try again.');
      throw new Error('Apple Sign-In failed - no identity token returned');
    }

    const decodedToken = jwtDecode(appleRes.identityToken) as DecodedToken;
    const fullName =
      typeof appleRes.fullName === 'string'
        ? appleRes.fullName
        : `${appleRes.fullName?.givenName ?? ''} ${
            appleRes.fullName?.familyName ?? ''
          }`.trim();

    const res = await mutateAsync({
      email: decodedToken.email,
      full_name: fullName,
      authorization_code: appleRes.authorizationCode,
      identification_token: appleRes.identityToken,
    });

    if (res) {
      setAuthenticated(true);
      setItem<User>(STORAGE_ENUMS.USER, res.user);
      setItem(STORAGE_ENUMS.ACCESS_TOKEN, res.access_token);
      setItem(STORAGE_ENUMS.REFRESH_TOKEN, res.refresh_token);
      setItem(STORAGE_ENUMS.IS_ONBOARDED, res.user.onboarding_completed);
      setAuthenticated(true);
      setOnboardingComplete(res?.user?.onboarding_completed);
      if (res?.user?.onboarding_completed) {
        navigation.reset({
          index: 0,
          routes: [{name: 'App'}],
        });
      } else {
        navigation.reset({
          index: 0,
          routes: [{name: 'Onboarding'}],
        });
      }
    }
  };

  return (
    <BackgroundWrapper>
      <AuthView style={styles.container}>
        {/* Content */}
        <View style={styles.content}>
          <AppLogo size={100} />
          <Typography variant="h2" fontFamily="montserratSemiBold">
            Experience a new era of healthcare,{' '}
            <Typography
              color={Colors.text.main}
              variant="h2"
              fontFamily="montserratSemiBold">
              reimagined with you in mind
            </Typography>
          </Typography>
        </View>

        <View style={styles.buttonWrapper}>
          <Button
            variant="primary"
            size="medium"
            rounded="xl"
            onPress={handleSubmit}
            loading={isPending}
            fullWidth
            textStyle={{color: Colors.text.white}}
            leftIcon={
              <Icon name="apple" size={26} color={Colors.icon.white} />
            }>
            Continue with Apple
          </Button>
        </View>
      </AuthView>
    </BackgroundWrapper>
  );
};

export {SignIn};
