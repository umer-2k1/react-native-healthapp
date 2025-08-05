import {HStack, Typography} from '@components/common';
import {Colors} from '@constants';
import {Icon} from '@icons';
import React from 'react';
import {FlatList, TouchableOpacity, View} from 'react-native';
import {styles} from './styles';

interface DailyActionCardProps {
  label: string;
  icon: React.ReactNode;
  borderColor: string;
  innerCircleColor: string;
  points: string[];
}

const DailyActionCard = ({
  label,
  icon,
  borderColor,
  innerCircleColor,
  points,
}: DailyActionCardProps) => {
  return (
    <TouchableOpacity style={styles.card}>
      <HStack justify="space-between">
        <Typography py={3} variant="h6" fontFamily="poppinsMedium">
          {label}
        </Typography>
        <Icon name="arrow-right" size={22} />
      </HStack>

      <HStack spacing={8}>
        <View style={[styles.outerCircle, {borderColor}]}>
          {/* Inner Circle */}
          <View
            style={[styles.innerCircle, {backgroundColor: innerCircleColor}]}>
            {icon}
          </View>
        </View>
        <FlatList
          data={points}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({item}) => (
            <Typography
              color={Colors.neutral.grey800}
              variant="caption"
              fontFamily="poppinsMedium"
              numberOfLines={1}
              style={{flexWrap: 'wrap', flexShrink: 1}}>
              • {item}
            </Typography>
          )}
        />
      </HStack>
    </TouchableOpacity>
  );
};

export {DailyActionCard};
