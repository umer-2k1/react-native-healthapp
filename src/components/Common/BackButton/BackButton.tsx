import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity, ViewStyle} from 'react-native';
import React from 'react';
import {Icon} from '@icons';
import {Colors} from '@constants';

interface BackButtonProps {
  onPress?: () => void;
  color?: string;
  size?: number;
  style?: ViewStyle;
}

const BackButton = ({
  onPress,
  color = Colors.icon.white,
  size = 20,
  style,
}: BackButtonProps) => {
  const navigation = useNavigation();
  const onBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  return (
    <TouchableOpacity onPress={onPress || onBack} style={style}>
      <Icon name="chevron-left" color={color} size={size} />
    </TouchableOpacity>
  );
};

export {BackButton};
