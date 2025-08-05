import {createDrawerNavigator} from '@react-navigation/drawer';
import {Home} from '@screens';
import {AppNavigation} from '@screens/constants';
import {DrawerContent} from '@src/components/layout';
import React from 'react';

const {Navigator, Screen} = createDrawerNavigator();

const HomeDrawer = () => {
  return (
    <Navigator
      drawerContent={props => <DrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: '#fff',
          width: 250,
          borderTopRightRadius: 20,
          borderBottomRightRadius: 20,
        },
      }}>
      <Screen name={AppNavigation.HOME} component={Home} />
    </Navigator>
  );
};

export {HomeDrawer};
