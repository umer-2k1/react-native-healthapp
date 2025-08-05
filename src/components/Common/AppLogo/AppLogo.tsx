import {View, Image} from 'react-native';
import React from 'react';
import {AppLogoStyles, getAlignment} from './styles';
import logo from '@assets/logo.png';

interface AppLogoProps {
  height?: number;
  width?: number;
  size?: number;
  align?: 'left' | 'center' | 'right';
}

const AppLogo = ({height, width, size, align = 'left'}: AppLogoProps) => {
  return (
    <View style={[AppLogoStyles.container, getAlignment(align)]}>
      <Image
        source={logo}
        style={{
          height: size || height || 50,
          width: size ? size * 2 : width || 100,
        }}
        resizeMode="contain"
      />
    </View>
  );
};

export {AppLogo};
