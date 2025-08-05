import {Typography, VStack} from '@components/common';
import {Colors} from '@constants';
import {Icon} from '@icons';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {styles} from './styles';

interface ConnectivityTipsProps {
  title: string;
  desc: string;
}

const ConnectivityTips = ({title, desc}: ConnectivityTipsProps) => {
  return (
    <TouchableOpacity style={styles.cardContainer}>
      <View style={styles.card}>
        <View style={styles.iconContainer}>
          <Icon name="bulb" size={30} />
        </View>

        <VStack spacing={2} style={{flex: 1}}>
          <Typography variant="body2" fontFamily="poppinsMedium">
            {title}
          </Typography>
          <Typography variant="caption" color={Colors.text.primary}>
            {desc}
          </Typography>
        </VStack>
      </View>
    </TouchableOpacity>
  );
};

export {ConnectivityTips};
