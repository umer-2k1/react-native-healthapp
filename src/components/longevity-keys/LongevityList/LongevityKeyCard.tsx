import {HStack, Typography, VStack} from '@components/common';
import {Colors, globalStyles} from '@constants';
import {Icon} from '@icons';
import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import * as Progress from 'react-native-progress';

interface Colors {
  primary: string;
  secondary: string;
}

interface LongevityKeyCardProps {
  title: string;
  percent: number;
  currentProgress: string;
  target: string;
  colors: Colors;
}

const LongevityKeyCard = ({
  title,
  percent,
  currentProgress,
  target,
  colors,
}: LongevityKeyCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <TouchableOpacity style={styles.card}>
      <HStack justify="space-between">
        <Typography py={3} variant="h6" fontFamily="poppinsMedium">
          {title}
        </Typography>
        <TouchableOpacity onPress={() => setIsFavorite(!isFavorite)}>
          <Icon
            name="heart"
            size={24}
            color={isFavorite ? 'white' : 'black'}
            fill={isFavorite ? Colors.primary.main : 'transparent'}
          />
        </TouchableOpacity>
      </HStack>

      <View style={styles.circularProgressContainer}>
        <AnimatedCircularProgress
          size={80}
          fill={percent}
          tintColor={colors.primary}
          backgroundColor={colors.secondary}
          backgroundWidth={7}
          width={7}
          lineCap="round"
          rotation={0}>
          {() => (
            <Typography
              variant="body1"
              color={colors.primary}
              fontFamily="poppinsSemiBold">
              {percent}%
            </Typography>
          )}
        </AnimatedCircularProgress>
      </View>

      <View style={{flexDirection: 'row', flex: 1, gap: 14}}>
        <VStack style={{flex: 1}} spacing={3}>
          <Typography variant="caption">Current</Typography>
          <Typography fontFamily="poppinsMedium">{currentProgress}</Typography>
          <Progress.Bar
            progress={20 / 100}
            color={colors.primary}
            unfilledColor={colors.secondary}
            borderWidth={0}
            height={8}
            width={null}
          />
        </VStack>
        <VStack style={{flex: 1}} spacing={3}>
          <Typography variant="caption">Target</Typography>
          <Typography fontFamily="poppinsMedium">{target}</Typography>
          <Progress.Bar
            progress={20 / 100}
            color={colors.primary}
            unfilledColor={colors.secondary}
            borderWidth={0}
            height={8}
            width={null}
          />
        </VStack>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    ...globalStyles.card,
    flex: 1,
    gap: 4,
  },
  circularProgressContainer: {
    ...globalStyles.justifyCenter,
    ...globalStyles.alignCenter,
    marginVertical: 6,
  },
});

export {LongevityKeyCard};

export type {LongevityKeyCardProps};
