import {
  View,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  TextInputProps,
} from 'react-native';
import React, {useState} from 'react';
import {Icon} from '@icons';

interface PasswordInputProps extends Omit<TextInputProps, 'secureTextEntry'> {}

const PasswordField = (props: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TextInput
          {...props}
          secureTextEntry={!showPassword}
          style={{flex: 1}}
        />
        <TouchableOpacity onPress={togglePasswordVisibility}>
          {showPassword ? (
            <Icon name="eye-off-outline" size={20} />
          ) : (
            <Icon name="eye-outline" size={20} />
          )}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export {PasswordField};
