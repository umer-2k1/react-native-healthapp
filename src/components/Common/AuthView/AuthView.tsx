import {View, ViewStyle} from 'react-native';
import React from 'react';
import {createAppViewStyles} from './styles';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';

interface AuthViewProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

const AuthView = ({children, style}: AuthViewProps) => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{flex: 1}} edges={['top', 'left', 'right']}>
        <View style={[createAppViewStyles.container, style]}>{children}</View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export {AuthView};
