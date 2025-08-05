import React from 'react';
import {View, ViewStyle} from 'react-native';
import {createAppViewStyles} from './styles';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {Colors} from '@constants';

interface AppViewProps {
  children: React.ReactNode;
  style?: ViewStyle;
  backgroundColor?: string;
  safeAreaColor?: string;
}

const AppView = ({
  children,
  backgroundColor = 'white',
  safeAreaColor = Colors.primary.main,
  style,
}: AppViewProps) => {
  const styles = createAppViewStyles();
  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={{flex: 1, backgroundColor: safeAreaColor}}
        edges={['top', 'left', 'right']}>
        <View
          style={[styles.container, {backgroundColor: backgroundColor}, style]}>
          {children}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export {AppView};
