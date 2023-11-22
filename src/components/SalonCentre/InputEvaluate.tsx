import React from 'react';
import {StyleSheet, TextInput} from 'react-native';
import {APP_COLORS} from '../../themes/colors';

const InputEvaluate: React.FC<IInputEvaluate> = ({
  placeholder,
  onChangeText,
  value,
}) => {
  return (
    <TextInput
      placeholder={placeholder}
      onChangeText={onChangeText}
      value={value}
      style={styles.textInputStyle}
      placeholderTextColor={APP_COLORS.placeholderText}
    />
  );
};

export default InputEvaluate;

const styles = StyleSheet.create({
  textInputStyle: {
    padding: 8,
    borderColor: APP_COLORS.borderInput,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 12,
  },
});
