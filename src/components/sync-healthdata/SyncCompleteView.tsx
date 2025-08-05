import {Button, Typography, VStack} from '@components/common';
import {Colors} from '@constants';
import {Icon} from '@icons';
import React from 'react';
import {View} from 'react-native';
import {styles} from './styles';

interface SyncCompleteViewProps {
  onContinue: () => void;
}

const SyncCompleteView = ({onContinue}: SyncCompleteViewProps) => (
  <>
    <VStack spacing={12} style={styles.centerContent}>
      <View style={styles.successIconWrapper}>
        <Icon name="circle-check" size={64} color={Colors.green[500]} />
      </View>
      <Typography
        variant="h3"
        align="center"
        fontFamily="montserratSemiBold"
        style={styles.title}
        color={Colors.primary.main}>
        Sync complete!
      </Typography>
      <Typography variant="body1" align="center" color={Colors.neutral.grey800}>
        Your health data has been successfully synced
      </Typography>
    </VStack>
    <View style={styles.buttonWrapper}>
      <Button
        variant="primary"
        rounded="xl"
        size="medium"
        onPress={onContinue}
        fullWidth>
        Continue
      </Button>
    </View>
  </>
);

export {SyncCompleteView};
