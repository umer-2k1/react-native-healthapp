import {
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  ViewStyle,
  ScrollView,
} from 'react-native';
import React from 'react';
import {isIOS} from '@src/utils';

interface KeyboardSafeViewProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

const KeyboardSafeView = ({children, style}: KeyboardSafeViewProps) => {
  return (
    <KeyboardAvoidingView style={style} behavior={isIOS ? 'padding' : 'height'}>
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        keyboardShouldPersistTaps="handled">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          {children}
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export {KeyboardSafeView};
