import React, {useCallback, useEffect, useRef} from 'react';
import {Animated, Keyboard, SafeAreaView, ViewStyle} from 'react-native';

interface FooterAwareKeyboardProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

const AnimatedSafeAreaView = Animated.createAnimatedComponent(SafeAreaView);

const FooterAwareKeyboard: React.FC<FooterAwareKeyboardProps> = ({
  children,
  ...props
}) => {
  const animated = useRef<Animated.Value>(new Animated.Value(0));

  const handleKeyboardWillShow = useCallback((e: any) => {
    Animated.spring(animated.current, {
      toValue: -e.endCoordinates.height,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleKeyboardWillHide = useCallback(() => {
    Animated.spring(animated.current, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    const subscriptions = [
      Keyboard.addListener('keyboardWillShow', handleKeyboardWillShow),
      Keyboard.addListener('keyboardWillHide', handleKeyboardWillHide),
    ];

    return () => {
      subscriptions.forEach(subscription => subscription.remove());
    };
  }, [handleKeyboardWillHide, handleKeyboardWillShow]);

  return (
    <AnimatedSafeAreaView
      {...props}
      style={[{transform: [{translateY: animated.current}]}]}>
      {children}
    </AnimatedSafeAreaView>
  );
};

export default FooterAwareKeyboard;
