import {Button, Typography, VStack} from '@components/common';
import {Colors} from '@constants';
import {Icon} from '@icons';
import React from 'react';
import {View} from 'react-native';
import {styles} from './styles';

interface NoDataFoundViewProps {
  onContinue: () => void;
}

const NoDataFoundView = ({onContinue}: NoDataFoundViewProps) => {
  return (
    <>
      <VStack spacing={12} style={styles.centerContent}>
        <View style={styles.failedIconWrapper}>
          <Icon name="circle-x" size={64} color={Colors.status.error} />
        </View>
        <Typography
          variant="h3"
          align="center"
          fontFamily="montserratSemiBold"
          style={styles.title}
          color={Colors.primary.main}>
          No Data Found
        </Typography>
        <Typography
          variant="body1"
          align="center"
          color={Colors.neutral.grey800}>
          We couldn't find any health data from Apple Health.
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
};

export {NoDataFoundView};
