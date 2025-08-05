import {AppView, BackButton, Typography} from '@components/common';
import {Colors, globalStyles} from '@constants';
import React from 'react';
import {StyleSheet, View} from 'react-native';

const Notification = () => {
  return (
    <AppView backgroundColor={Colors.background.primary}>
      <NotificationHeader />
    </AppView>
  );
};

const NotificationHeader = () => (
  <View
    style={[
      globalStyles.flexRowCenter,
      globalStyles.hPadding16,
      styles.header,
    ]}>
    <BackButton />
    <View style={globalStyles.flexAlignCenter}>
      <Typography variant="h5" fontFamily="montserratMedium">
        Notification
      </Typography>
    </View>
  </View>
);

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.primary.main,
    paddingBottom: 12,
  },
});

export {Notification};
