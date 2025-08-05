import ActiveHealthKit from '@assets/active-health-kit.png';
import {Flex, Typography} from '@components/common';
import React from 'react';
import {Image, View} from 'react-native';

const UserGreeting = () => {
  return (
    <Flex justify="space-between">
      <View>
        <Typography fontFamily="poppinsRegular">Hello, Good Morning</Typography>
        <Typography fontFamily="montserratSemiBold" variant="h3">
          Sophia !
        </Typography>
      </View>
      <View>
        <Image source={ActiveHealthKit} style={{width: 100, height: 100}} />
      </View>
    </Flex>
  );
};

export {UserGreeting};
