import {
  AppView,
  BackButton,
  TextInputField,
  Typography,
} from '@components/common';
import {LongevityList} from '@components/longevity-keys';
import {Colors, globalStyles} from '@constants';
import {Icon} from '@icons';
import React from 'react';
import {StyleSheet, View} from 'react-native';

const LongevityKeysList = () => {
  const IconContainer = () => {
    return (
      <View style={{backgroundColor: '#11213A', padding: 7, borderRadius: 8}}>
        <Icon name="filter" color={Colors.icon.white} size={24} />
      </View>
    );
  };

  return (
    <AppView backgroundColor={Colors.background.primary}>
      <LongevityHeader />
      <View style={globalStyles.hPadding12}>
        <TextInputField
          leftIcon={<Icon name="search" color={'#A6ACB6'} />}
          containerStyle={{marginVertical: 16}}
          placeholder="Search here"
          rightIcon={<IconContainer />}
        />
      </View>

      <LongevityList />
    </AppView>
  );
};

const LongevityHeader = () => (
  <View
    style={[
      globalStyles.flexRowCenter,
      globalStyles.hPadding16,
      styles.header,
    ]}>
    <BackButton />
    <View style={globalStyles.flexAlignCenter}>
      <Typography variant="h5" fontFamily="montserratMedium">
        Longevity Keys
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

export {LongevityKeysList};
