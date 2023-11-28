import React from 'react';
import {StyleSheet, TextInput} from 'react-native';
import {APP_COLORS} from '../../themes/colors';

const InputEvaluate: React.FC<IInputEvaluate> = ({
  placeholder,
  onChangeText,
  value,
  onBlur,
  ...props
}) => {
  return (
    <TextInput
      {...props}
      placeholder={placeholder}
      onChangeText={onChangeText}
      onBlur={onBlur}
      value={value}
      style={styles.textInputStyle}
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
