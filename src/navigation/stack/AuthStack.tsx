import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SignIn} from '@screens/auth';
import {AuthNavigation} from '@screens/constants';
import {BackgroundWrapper} from '@components/common';
import {AuthStackParamList} from '@types';

const {Navigator, Screen} = createNativeStackNavigator<AuthStackParamList>();
const AuthStack = () => {
  return (
    <BackgroundWrapper>
      <Navigator
        screenOptions={{
          headerShown: false,
          headerShadowVisible: false,
        }}>
        <Screen name={AuthNavigation.SIGN_IN} component={SignIn} />
      </Navigator>
    </BackgroundWrapper>
  );
};

export {AuthStack};
