import {
  AppView,
  BackButton,
  DailyProgressRing,
  HStack,
  RNBottomSheet,
  RNBottomSheetRef,
  Typography,
} from '@components/common';
import {
  NoDataFoundView,
  SyncCompleteView,
  SyncFailedView,
  SyncingView,
} from '@components/sync-healthdata';
import {ConnectHealthSheet, ConnectivityTips} from '@components/connectivity';
import {Colors, globalStyles} from '@constants';
import {CONNECTIVITY_TIPS, delay, getItem, STORAGE_ENUMS} from '@utils';
import React, {useEffect, useRef, useState} from 'react';
import {
  FlatList,
  Image,
  Modal,
  Pressable,
  TouchableOpacity,
  View,
} from 'react-native';
import {styles} from './styles';
import {format, parseISO} from 'date-fns';
import AppleHealth from '@assets/health-kit.png';
import {useConnectivityStore} from '@store/useConnectivityStore';
import {BackgroundTaskManager} from '@src/services';

type SyncStatus = 'syncing' | 'complete' | 'failed' | 'not_found';

const Connectivity = () => {
  const ConnectivityTipsList = new Array(7).fill(CONNECTIVITY_TIPS);
  const {openConnectivityModal, setOpenConnectivityModal} =
    useConnectivityStore();
  const {isConnectedHealthKit} = useConnectivityStore();
  const bottomSheetRef = useRef<RNBottomSheetRef>(null);
  const [syncStatus, setSyncStatus] = useState<SyncStatus>('syncing');

  // const isConnectedHealthKit = false;

  const onOpenConnectiviy = () => {
    bottomSheetRef.current?.open();
  };

  const lastSync = getItem<string>(STORAGE_ENUMS.LAST_SYNC);
  const lastSyncDate = lastSync
    ? format(parseISO(lastSync), 'dd MMM, yyyy hh:mm a')
    : 'No Sync Yet';

  const connectivityScore = isConnectedHealthKit ? 100 : 0;

  const fetchAppleData = async () => {
    await delay(2000);
    const result =
      await BackgroundTaskManager.getInstance().runAllBiomarkersSync();
    if (result.status === 'success') {
      setSyncStatus('complete');
    } else if (result.status === 'not_found') {
      setSyncStatus('not_found');
    } else {
      setSyncStatus('failed');
    }
  };

  const onRetry = async () => {
    setSyncStatus('syncing');
    await fetchAppleData();
  };
  const onContinue = () => {
    setOpenConnectivityModal(false);
    setSyncStatus('syncing');
  };

  useEffect(() => {
    if (openConnectivityModal) {
      fetchAppleData();
    }
  }, [openConnectivityModal]);

  return (
    <>
      <AppView backgroundColor={Colors.background.primary}>
        {/* Header */}
        <ConnectivityHeader />

        <View style={globalStyles.hPadding16}>
          {/* Progress */}
          <View style={styles.progressContainer}>
            <DailyProgressRing
              tintColor={Colors.connectivity.green}
              fill={connectivityScore}
              size={120}
              width={8}>
              <Typography variant="h2" fontFamily="montserratSemiBold">
                {connectivityScore}
              </Typography>
            </DailyProgressRing>
            <Typography py={6} color={Colors.neutral.grey600} variant="body2">
              Last Syn Date: {lastSyncDate}
            </Typography>
          </View>

          {/* Status Boxes */}
          <View style={styles.statusContainer}>
            {/* Within Range */}
            <View style={styles.statusBox}>
              <HStack spacing={5}>
                <View style={[styles.dot, styles.greenDot]} />
                <Typography variant="body2" fontFamily="poppinsMedium">
                  Within Range
                </Typography>
              </HStack>
              <Typography
                py={5}
                variant="h5"
                align="center"
                fontFamily="poppinsSemiBold"
                color={Colors.connectivity.green}>
                {connectivityScore}
              </Typography>
            </View>

            {/* Out of Range */}
            <View style={styles.statusBox}>
              <HStack spacing={5}>
                <View style={[styles.dot, styles.redDot]} />
                <Typography variant="body2" fontFamily="poppinsMedium">
                  Out of Range
                </Typography>
              </HStack>
              <Typography
                py={5}
                variant="h5"
                align="center"
                fontFamily="poppinsSemiBold"
                color={Colors.connectivity.red}>
                {!isConnectedHealthKit ? 100 : 0}
              </Typography>
            </View>
          </View>

          <View style={[globalStyles.card, styles.applehealthContainer]}>
            <HStack justify="space-between">
              <HStack spacing={10}>
                <Image source={AppleHealth} style={{width: 60, height: 60}} />
                <Typography variant="h6" fontFamily="montserratSemiBold">
                  Apple Health
                </Typography>
              </HStack>

              <TouchableOpacity
                disabled={isConnectedHealthKit}
                onPress={onOpenConnectiviy}
                style={[
                  styles.connectionBtn,
                  {
                    backgroundColor: isConnectedHealthKit
                      ? '#2ECC71'
                      : '#E74C3C',
                  },
                ]}>
                <Typography
                  variant="body2"
                  fontFamily="montserratMedium"
                  color={Colors.neutral.white}>
                  {isConnectedHealthKit ? 'Connected' : 'Connect'}
                </Typography>
              </TouchableOpacity>
            </HStack>
          </View>

          {/* Connectivity Tips */}
          <Typography py={16} variant="h6" fontFamily="montserratMedium">
            Tips for better Connectivity
          </Typography>

          {/* <ConnectivityTips /> */}

          <FlatList
            data={ConnectivityTipsList}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({item}) => <ConnectivityTips {...item} />}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              flexGrow: 1,
              backgroundColor: 'transparent',
            }}
            showsVerticalScrollIndicator={false}
          />
        </View>

        <RNBottomSheet
          ref={bottomSheetRef}
          snapPoints={['60%']}
          backdropOpacity={0.5}>
          <ConnectHealthSheet ref={bottomSheetRef} />
        </RNBottomSheet>
      </AppView>

      <Modal
        animationType="slide"
        transparent
        visible={openConnectivityModal} // Handles back button close on Android
      >
        <Pressable style={styles.modalContainer} onPress={() => {}}>
          <View style={styles.modalContent}>
            {syncStatus === 'syncing' && <SyncingView />}
            {syncStatus === 'complete' && (
              <SyncCompleteView onContinue={onContinue} />
            )}
            {syncStatus === 'failed' && (
              <SyncFailedView onRetry={onRetry} onSkip={onContinue} />
            )}
            {syncStatus === 'not_found' && (
              <NoDataFoundView onContinue={onContinue} />
            )}
          </View>
        </Pressable>
      </Modal>
    </>
  );
};

const ConnectivityHeader = () => (
  <View
    style={[
      globalStyles.flexRowCenter,
      globalStyles.hPadding16,
      styles.header,
    ]}>
    <BackButton />
    <View style={globalStyles.flexAlignCenter}>
      <Typography variant="h5" fontFamily="montserratMedium">
        Connectivity
      </Typography>
    </View>
  </View>
);

export {Connectivity};
