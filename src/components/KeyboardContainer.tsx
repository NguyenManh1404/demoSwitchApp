import React, {PropsWithChildren} from 'react';
import {
  KeyboardAwareScrollView,
  KeyboardAwareScrollViewProps,
} from 'react-native-keyboard-aware-scroll-view';

type KeyboardContainerProps = PropsWithChildren<KeyboardAwareScrollViewProps>;

const KeyboardContainer = (props: KeyboardContainerProps) => {
  return (
    <KeyboardAwareScrollView
      {...props}
      enableResetScrollToCoords={false}
      keyboardShouldPersistTaps={'handled'}>
      {props.children}
    </KeyboardAwareScrollView>
  );
};

export default KeyboardContainer;
