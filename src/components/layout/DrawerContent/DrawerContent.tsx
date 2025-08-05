import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {Icon} from '@src/components/Icon';
import {Colors} from '@src/constants';
import {logoutHandler} from '@utils';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const DrawerContent = (props: DrawerContentComponentProps) => {
  const onLogout = () => {
    logoutHandler();
  };

  return (
    <View style={styles.container}>
      {/* Drawer Items */}
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
        <Icon name="logout" size={20} color={Colors.status.error} />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderTopWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  logoutText: {
    fontSize: 16,
    marginLeft: 10,
    color: Colors.status.error,
  },
});
export {DrawerContent};
