import HealthKit from '@assets/health-kit.png';
import SyncLoader from '@assets/lottie/sync-loader.json';
import {Typography} from '@components/common';
import {Colors} from '@constants';
import LottieView from 'lottie-react-native';
import React from 'react';
import {Image} from 'react-native';
import {styles} from './styles';

const SyncingView = () => (
  <>
    <Image source={HealthKit} style={styles.image} />
    <Typography
      variant="h3"
      align="center"
      fontFamily="montserratSemiBold"
      style={styles.title}
      color={Colors.primary.main}
      py={12}>
      We are syncing data from Apple Health Kit app
    </Typography>
    <LottieView style={styles.loader} source={SyncLoader} autoPlay loop />
    <Typography
      variant="body2"
      align="center"
      py={12}
      color={Colors.neutral.grey800}>
      Please don't close the application until syncing is complete
    </Typography>
  </>
);

export {SyncingView};
