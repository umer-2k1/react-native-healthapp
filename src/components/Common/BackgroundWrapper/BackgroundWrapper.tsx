import React from 'react';
import {ImageBackground, StyleSheet} from 'react-native';
import BgImage from '@assets/decim-bg.png';

interface BackgroundWrapperProps {
  children: React.ReactNode;
}

const BackgroundWrapper = ({children}: BackgroundWrapperProps) => {
  return (
    <ImageBackground
      source={BgImage}
      style={styles.background}
      resizeMode="cover">
      {children}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});

export {BackgroundWrapper};
