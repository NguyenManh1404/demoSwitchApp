import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import {APP_COLORS} from '../themes/colors';
import FooterAwareKeyboard from './FooterAwareKeyboard';
import Text from './Text';

interface ButtonAwareKeyboardProps {
  onPress: () => void;
  label?: string;
  disabled?: boolean;
  containerStyle?: object;
  btnStyle?: object;
  labelStyle?: object;
  loading?: boolean;
  loadingColor?: string;
}

const ButtonAwareKeyboard: React.FC<ButtonAwareKeyboardProps> = ({
  onPress,
  label,
  disabled = false,
  containerStyle,
  btnStyle,
  labelStyle,
  loading = false,
  loadingColor,
}) => {
  return (
    <FooterAwareKeyboard>
      <View style={[styles.footer, containerStyle]}>
        <TouchableOpacity
          style={[styles.btnSave, btnStyle]}
          onPress={onPress}
          disabled={disabled || loading}>
          {loading ? (
            <ActivityIndicator color={loadingColor || APP_COLORS.white} />
          ) : (
            <Text
              type={'semiBold-16'}
              color={APP_COLORS.white}
              style={[styles.label, labelStyle]}>
              {label || 'Save'}
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </FooterAwareKeyboard>
  );
};

export default ButtonAwareKeyboard;

const styles = StyleSheet.create({
  footer: {
    borderTopWidth: 1,
    borderColor: APP_COLORS.shadowColor,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: APP_COLORS.white,
  },
  btnSave: {
    borderRadius: 8,
    paddingVertical: 12,
    backgroundColor: APP_COLORS.primary,
  },
  label: {
    textAlign: 'center',
  },
});
