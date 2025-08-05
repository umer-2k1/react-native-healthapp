import {Typography} from '@components/common';
import {Icon} from '@icons';
import {useLayoutStore} from '@store/useLayoutStore';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {styles} from './styles';

const RecommendationPopup = () => {
  const {recommendationPopup, toggleRecommendationPopup} = useLayoutStore();

  if (!recommendationPopup) {
    return null;
  }

  return (
    <View style={styles.popupContainer}>
      <TouchableOpacity
        style={styles.closeIcon}
        onPress={toggleRecommendationPopup}>
        <Icon name="close" />
      </TouchableOpacity>
      <Typography variant="body2" style={styles.message} py={4}>
        Hey Stuart, you're making great progress—awesome work! Today, we’re
        focusing on two key actions: refining your sleep routine and cutting
        down screen time. Let’s take a look at your daily actions!
      </Typography>

      <Typography py={2}>
        you're making great progress—awesome work! Today, we’re focusing on two
        key actions: refining your sleep routine and cutting down screen time.
        Let’s take a look at your daily actions!
      </Typography>

      <View style={styles.triangle} />
    </View>
  );
};

export {RecommendationPopup};
