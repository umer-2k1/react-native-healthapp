import {Button, Typography, VStack} from '@components/common';
import {Colors} from '@constants';
import {Icon} from '@icons';
import React from 'react';
import {View} from 'react-native';
import {styles} from './styles';

interface SyncFailedViewProps {
  onRetry: () => void;
  onSkip: () => void;
}
// Sync Failed View Component
const SyncFailedView = ({onRetry, onSkip}: SyncFailedViewProps) => (
  <>
    <VStack spacing={12} style={styles.centerContent}>
      <View style={styles.failedIconWrapper}>
        <Icon name="triangle-alert" size={64} color={Colors.status.error} />
      </View>
      <Typography
        variant="h3"
        align="center"
        fontFamily="montserratSemiBold"
        style={styles.title}
        color={Colors.status.error}>
        Sync failed
      </Typography>
      <Typography variant="body1" align="center" color={Colors.neutral.grey800}>
        We couldn't sync your health data. Please try again.
      </Typography>
    </VStack>
    <View style={styles.buttonWrapper}>
      <VStack spacing={16}>
        <Button
          variant="primary"
          rounded="xl"
          size="medium"
          onPress={onRetry}
          fullWidth
          rightIcon={
            <Icon name="refresh" color={Colors.neutral.white} size={20} />
          }>
          Retry
        </Button>
        <Button
          variant="outline"
          rounded="xl"
          size="medium"
          onPress={onSkip}
          fullWidth>
          Skip
        </Button>
      </VStack>
    </View>
  </>
);

export {SyncFailedView};
