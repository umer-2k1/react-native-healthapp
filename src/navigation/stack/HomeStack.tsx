import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Tabs} from '@screens/constants';
import {RootStackParamList} from '@types';
import {BottomTab} from '../tabs';
const {Navigator, Screen} = createNativeStackNavigator<RootStackParamList>();

const HomeStack = () => {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        headerShadowVisible: false,
      }}>
      <Screen name={Tabs.BOTTOM_TABS} component={BottomTab} />
    </Navigator>
  );
};

export {HomeStack};
