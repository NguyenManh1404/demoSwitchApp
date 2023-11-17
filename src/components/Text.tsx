import React, {useMemo} from 'react';
import {Text as RNText, StyleProp, TextProps, TextStyle} from 'react-native';
import {FONT_TYPES} from '../themes/fonts';
import {EMPTY_STRING} from '../utils/constants';

const styleByType = (type = EMPTY_STRING) => {
  const detectValue = type.split('-');

  return {
    fontFamily: FONT_TYPES[detectValue[0] || 'regular'],
    fontSize: +detectValue[1] || 14,
  };
};

interface IText extends TextProps {
  children?: string;
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
  color = 'black',
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
