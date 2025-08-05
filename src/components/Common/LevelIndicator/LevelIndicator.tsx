import {Flex, Typography} from '@components/common';
import MaskedView from '@react-native-masked-view/masked-view';
import React from 'react';
import {View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {styles} from './styles';

interface LevelIndicatorProps {
  disable?: boolean;
  level: number;
}

const LevelIndicator = ({disable = false, level}: LevelIndicatorProps) => {
  return (
    <Flex gap={10}>
      <View style={styles.outerLevelBadge}>
        <View style={styles.levelBadge}>
          <MaskedView
            maskElement={
              <Typography
                variant="h4"
                fontFamily="montserratSemiBold"
                align="center">
                {disable ? '-' : level}
              </Typography>
            }>
            <LinearGradient
              colors={['#FDFDFD', '#FFDD64']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}>
              <Typography
                variant="h4"
                fontFamily="montserratSemiBold"
                align="center"
                style={[{opacity: 0}]}>
                {disable ? '-' : level}
              </Typography>
            </LinearGradient>
          </MaskedView>
        </View>
      </View>
      <Typography variant="h4" fontFamily="montserratSemiBold">
        {disable ? 'None' : `Level ${level}`}
      </Typography>
    </Flex>
  );
};

export {LevelIndicator};
