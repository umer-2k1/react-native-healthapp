import {HStack, Typography, VStack} from '@components/common';
import {Colors} from '@constants';
import {Icon} from '@icons';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import * as Progress from 'react-native-progress';
import {styles} from './styles';
import {NONE} from '@utils';

interface KeyGoalsCardProps {
  title: string;
  icon: React.ReactNode;
  progress: number;
  desc: string;
  hasQty?: boolean;
  quantity?: number;
  onQuantityChange?: (qty: number) => void;
  disable?: boolean;
}

const KeyGoalsCard = ({
  title,
  icon,
  progress,
  desc,
  hasQty = false,
  quantity,
  onQuantityChange,
  disable = false,
}: KeyGoalsCardProps) => {
  const QuantityManagement = () => {
    if (hasQty && typeof quantity === 'number' && onQuantityChange) {
      return (
        <HStack spacing={10}>
          <TouchableOpacity
            style={styles.qtyButtons}
            onPress={() => onQuantityChange(quantity - 1)}>
            <Icon name="minus" size={16} />
          </TouchableOpacity>
          <Typography fontFamily="montserratMedium" variant="h5">
            {quantity}
          </Typography>
          <TouchableOpacity
            style={styles.qtyButtons}
            onPress={() => onQuantityChange(quantity + 1)}>
            <Icon name="plus" size={16} />
          </TouchableOpacity>
        </HStack>
      );
    }
    return null;
  };

  return (
    <VStack style={styles.card} py={12} px={10} spacing={8}>
      <HStack justify="space-between">
        {icon}
        <Icon name="chevron-right" size={12} />
      </HStack>

      <Typography variant="h6" fontFamily="poppinsMedium">
        {title}
      </Typography>

      {hasQty ? (
        disable ? (
          <Typography fontFamily="poppinsMedium">NONE</Typography>
        ) : (
          <QuantityManagement />
        )
      ) : (
        <Typography variant="h3" fontFamily="poppinsMedium" align="center">
          {disable ? NONE : `${progress}%`}
        </Typography>
      )}

      <Typography
        variant="body2"
        fontFamily="poppinsMedium"
        color={Colors.text.disabled}
        numberOfLines={1}>
        Goal: {disable ? NONE : desc}
      </Typography>
      <Progress.Bar
        progress={disable ? 0 : progress / 100}
        color={Colors.primary.main}
        unfilledColor={Colors.progressBar.unfilled}
        borderWidth={0}
        height={9}
      />
    </VStack>
  );
};

export {KeyGoalsCard};
