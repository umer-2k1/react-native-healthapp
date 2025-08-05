import {Typography} from '@components/common';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {styles} from './styles';

interface BiomarkerIconActionProps {
  icon: React.ReactNode;
  label: string;
  onPress?: () => void;
}

const BiomarkerIconAction = ({
  icon,
  label,
  onPress,
}: BiomarkerIconActionProps) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.circle}>{icon}</View>
      {/* Label */}
      <Typography fontFamily="poppinsMedium" variant="body2">
        {label}
      </Typography>
    </TouchableOpacity>
  );
};

export {BiomarkerIconAction};
