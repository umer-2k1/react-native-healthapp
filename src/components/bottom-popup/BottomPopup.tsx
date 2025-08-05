import Decima from '@assets/decima.png';
import {Typography} from '@components/common';
import {Icon} from '@icons';
import React, {useState} from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {styles} from './styles';
import {Colors} from '@constants';

const BottomPopup = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  return isPopupVisible ? (
    <View style={styles.popupContainer}>
      <LinearGradient
        colors={['#E8DDCD', Colors.primary.main]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={styles.popup}>
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <Image source={Decima} style={styles.icon} />
          </View>
          <Typography variant="h5" align="left" fontFamily="poppinsSemiBold">
            DECIMA AI
          </Typography>
          <TouchableOpacity
            style={styles.closeIcon}
            onPress={() => setIsPopupVisible(false)}>
            <Icon name="close" />
          </TouchableOpacity>
        </View>
        <Typography variant="body2" style={styles.message} py={4}>
          Hey Stuart, you're making great progress—awesome work! Today, we’re
          focusing on two key actions: refining your sleep routine and cutting
          down screen time. Let’s take a look at your daily actions!
        </Typography>
        <TouchableOpacity style={styles.chatButton}>
          <Typography
            style={styles.chatText}
            align="center"
            variant="body2"
            fontFamily="poppinsSemiBold">
            Click here to chat with coach
          </Typography>
        </TouchableOpacity>
      </LinearGradient>
      <View style={styles.triangle} />
    </View>
  ) : null;
};

export {BottomPopup};
