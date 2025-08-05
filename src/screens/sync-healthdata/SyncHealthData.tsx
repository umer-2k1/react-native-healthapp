import {AuthView, BackgroundWrapper} from '@components/common';
import {
  NoDataFoundView,
  SyncCompleteView,
  SyncFailedView,
  SyncingView,
} from '@components/sync-healthdata';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {BackgroundTaskManager} from '@services';
import {useAuthStore} from '@store/useAuthStore';
import {RootStackParamList} from '@types';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';

type SyncStatus = 'syncing' | 'complete' | 'failed' | 'not_found';

const SyncHealthData = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [syncStatus, setSyncStatus] = useState<SyncStatus>('syncing');
  const {setOnboardingComplete} = useAuthStore();

  const onContinue = () => {
    setOnboardingComplete(true);
    navigation.reset({
      index: 1,
      routes: [{name: 'App'}],
    });
  };

  const syncData = async () => {
    try {
      const result =
        await BackgroundTaskManager.getInstance().runAllBiomarkersSync();
      setTimeout(() => {
        if (result.status === 'success') {
          setSyncStatus('complete');
        } else if (result.status === 'not_found') {
          setSyncStatus('not_found');
        } else {
          setSyncStatus('failed');
        }
      }, 1500);
    } catch (error) {
      console.error('Sync failed:', error);
      setSyncStatus('failed');
    }
  };

  const onRetry = async () => {
    setSyncStatus('syncing');
    await syncData();
  };

  useEffect(() => {
    syncData();
  }, []);

  return (
    <BackgroundWrapper>
      <AuthView style={styles.container}>
        <View style={styles.mainContent}>
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
      </AuthView>
    </BackgroundWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export {SyncHealthData};
