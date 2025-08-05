import {Typography} from '@components/common';
import {Colors} from '@constants';
import React, {useState} from 'react';
import {
  TextInput,
  TextInputProps,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {styles} from './styles';

interface TextInputFieldProps extends Omit<TextInputProps, 'style'> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  labelStyle?: TextStyle;
  errorStyle?: TextStyle;
  showDisableColor?: boolean;
}

const TextInputField = ({
  label,
  error,
  leftIcon,
  rightIcon,
  containerStyle,
  inputStyle,
  labelStyle,
  errorStyle,
  secureTextEntry,
  editable = true,
  showDisableColor = !editable,
  ...props
}: TextInputFieldProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Typography variant="body2" style={[styles.label, labelStyle || {}]}>
          {label}
        </Typography>
      )}
      <View
        style={[
          styles.inputContainer,
          !!error && styles.errorInput,
          isFocused && !showDisableColor && {borderColor: Colors.primary.main},
          {
            backgroundColor:
              !editable && showDisableColor
                ? Colors.input.disabled
                : 'transparent',
          },
        ]}>
        {leftIcon && <View style={styles.icon}>{leftIcon}</View>}
        <TextInput
          {...props}
          editable={editable}
          style={[
            styles.input,
            inputStyle,
            {
              color:
                !editable && showDisableColor
                  ? Colors.text.disabled
                  : Colors.text.primary,
            },
          ]}
          placeholderTextColor={Colors.text.disabled}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          secureTextEntry={secureTextEntry}
        />
        {rightIcon && (
          <TouchableOpacity style={styles.icon}>{rightIcon}</TouchableOpacity>
        )}
      </View>
      <Typography variant="caption" style={[styles.error, errorStyle || {}]}>
        {error}
      </Typography>
    </View>
  );
};

export {TextInputField};
