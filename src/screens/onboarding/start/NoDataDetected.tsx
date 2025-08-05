import {View, Image, Alert} from 'react-native';
import React from 'react';
import {styles} from './styles';
import HealthKit from '@assets/health-kit.png';
import {Button, Typography, AppView, VStack} from '@components/common';

const NoDataDetected = () => {
  return (
    <AppView style={styles.container}>
      <View style={styles.mainContent}>
        <Image
          source={HealthKit}
          style={{
            width: 150,
            height: 150,
          }}
        />
        <VStack spacing={10} py={20}>
          <Typography variant="h3" fontFamily="montserratSemiBold">
            No Data Detected
          </Typography>
          <Typography variant="body1" align="center">
            We couldn’t find any data recorded in last 60 days. For best
            results, please connect a wearable that records data and enable all
            health permissions.
          </Typography>
        </VStack>
      </View>

      <View style={styles.buttonWrapper}>
        <Button
          variant="primary"
          rounded="xl"
          size="large"
          onPress={() => Alert.alert('Action', 'Logout')}
          fullWidth>
          Continue
        </Button>
      </View>
    </AppView>
  );
};

export {NoDataDetected};
