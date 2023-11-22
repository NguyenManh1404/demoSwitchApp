import React, {ReactNode, useMemo} from 'react';
import {Text as RNText, StyleProp, TextProps, TextStyle} from 'react-native';
import {APP_COLORS} from '../themes/colors';
import {FONT_TYPES} from '../themes/fonts';

const styleByType = (type: string = 'regular-14') => {
  const detectValue = type.split('-');

  return {
    fontFamily: FONT_TYPES[(detectValue[0] || 'regular') as FontTypes],
    fontSize: +detectValue[1] || 14,
  };
};

interface IText extends TextProps {
  children?: ReactNode;
  style?: StyleProp<TextStyle>;
  type?: string;
  textAlign?: 'auto' | 'center' | 'justify' | 'left' | 'right';
  textDecorationLine?:
    | 'none'
    | 'underline'
    | 'line-through'
    | 'underline line-through';
  color?: string;
}

const Text = ({
  children,
  style,
  type,
  textAlign,
  textDecorationLine,
  color = APP_COLORS.black,
  ...props
}: IText) => {
  const textStyle = useMemo(() => {
    return {
      textAlign,
      textDecorationLine,
      color,
    };
  }, [textAlign, textDecorationLine, color]);

  return (
    <RNText
      {...props}
      allowFontScaling={false}
      suppressHighlighting={true}
      style={[styleByType(type), textStyle, style]}>
      {children}
    </RNText>
  );
};

export default Text;
