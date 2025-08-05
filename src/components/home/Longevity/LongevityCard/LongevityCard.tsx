import {GradientRating, HStack, Typography} from '@components/common';
import {Icon} from '@icons';
import {Colors, globalStyles} from '@src/constants';
import {AppStackParamList, GradientType} from '@types';
import {capitalizeFirstChar, formatNumber, NONE} from '@utils';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {styles} from './styles';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AppNavigation} from '@screens/constants';

interface LongevityCardProps {
  title: string;
  score: number;
  icon: React.ReactNode;
  type: GradientType;
  value: string;
  disable: boolean;
  showArrow?: boolean;
  route?: string;
  reversePointer?: boolean;
}

const LongevityCard = ({
  title,
  score,
  icon,
  value,
  type,
  disable = false,
  showArrow = true,
  route,
  reversePointer = false,
}: LongevityCardProps) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AppStackParamList>>();

  const onPress = () => {
    if (route && !disable) {
      navigation.navigate(AppNavigation.SLEEP_ANALYTICS);
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.card, globalStyles.card]}>
      <HStack justify="space-between">
        {icon}
        {showArrow && <Icon name="chevron-right" size={12} />}
      </HStack>

      <Typography variant="h6" fontFamily="poppinsMedium">
        {title}
      </Typography>

      <Typography align="center" variant={'h2'} fontFamily="poppinsMedium">
        {disable ? NONE : formatNumber(score)}
      </Typography>
      <HStack justify="space-between">
        <Typography variant="body2" fontFamily="poppinsMedium">
          {disable ? '' : value}
        </Typography>
        <Typography
          variant="body2"
          fontFamily="poppinsMedium"
          color={Colors.gradientRatingText[type]}>
          {disable ? '' : capitalizeFirstChar(type)}
        </Typography>
      </HStack>
      <View style={styles.gradientContainer}>
        <GradientRating
          disable={disable}
          score={score}
          height={10}
          type={type}
          reversePointer={reversePointer}
        />
      </View>
    </TouchableOpacity>
  );
};

export {LongevityCard};
