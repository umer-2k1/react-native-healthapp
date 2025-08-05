import {Button, RNBottomSheetRef, Typography, VStack} from '@components/common';
import {Alert, Image, Linking, StyleSheet, View} from 'react-native';
import {useConnectivityStore} from '@store/useConnectivityStore';
import healthBundle from '@assets/onboarding/health_bundle.png';
import {requestHealthPermissions} from '@utils';
import React, {forwardRef} from 'react';
import {Colors} from '@constants';

const ConnectHealthSheet = forwardRef<RNBottomSheetRef>((_, ref) => {
  const {setConnectedHealthKit, setOpenConnectivityModal} =
    useConnectivityStore();

  const onConnect = async () => {
    const isAvail = await requestHealthPermissions();
    setConnectedHealthKit(isAvail);
    if (!isAvail) {
      Alert.alert(
        'Apple Health Permissions Required',
        'Navigate to Health -> Your Profile -> Privacy -> Apps -> Decima to manage permissions.',
        [
          {
            text: 'Open Apple Health',
            onPress: () => Linking.openURL('x-apple-health://'),
          },
          {text: 'Cancel', style: 'cancel'},
        ],
      );
    }
    (ref as React.RefObject<RNBottomSheetRef>)?.current?.close();
    setOpenConnectivityModal(true);
  };

  return (
    <View style={styles.container}>
      <VStack justify="center" align="center" spacing={10}>
        <Typography variant="h4" fontFamily="poppinsMedium">
          Connect your Apple Health
        </Typography>
        <Typography
          variant="body2"
          align="center"
          px={6}
          color={Colors.neutral.grey600}>
          Please connect your Apple Health to track and sync your health data
          seamlessly.
        </Typography>

        <Image source={healthBundle} style={{width: 270, height: 270}} />
      </VStack>
      <Button
        style={styles.button}
        textStyle={{color: Colors.text.primary}}
        onPress={onConnect}
        size="large"
        fullWidth>
        Connect to Apple Health
      </Button>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  button: {
    backgroundColor: '#F2F2F7',
    bottom: 8,
    position: 'absolute',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
  },
});

export {ConnectHealthSheet};
