import {View, TouchableOpacity, Linking} from 'react-native';
import React from 'react';
import {styles} from './styles';
import {Separator, Typography} from '@components/common';
import {Icon, IconName} from '@icons';

interface LinkCardProps {
  title: string;
  url: string;
  iconName: IconName;
  iconSize: number;
  isSeparator?: boolean;
}

const LinkCard = ({
  title,
  url,
  iconName,
  iconSize,
  isSeparator = true,
}: LinkCardProps) => {
  const handlePress = async () => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      console.error('Unable to open URL:', url);
    }
  };
  return (
    <>
      <TouchableOpacity onPress={handlePress}>
        <View style={styles.cardRow}>
          <View style={styles.flexRowCenter}>
            <View style={styles.iconContainer}>
              <Icon name={iconName} size={iconSize} />
            </View>
            <Typography>{title}</Typography>
          </View>
          <Icon color="white" name="chevron-right" size={22} />
        </View>
      </TouchableOpacity>
      {isSeparator && <Separator thickness={1} color="#E2E4E7" />}
    </>
  );
};

export {LinkCard};
