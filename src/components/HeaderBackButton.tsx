import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, TouchableOpacity} from 'react-native';
import {APP_IMAGES} from '../themes/images';

const HeaderBackButton = ({canGoBack, onGoBack}: any) => {
  const {goBack} = useNavigation();

  const onPress = () => {
    if (typeof onGoBack === 'function') {
      onGoBack?.();
    } else {
      goBack();
    }
  };

  return (
    <TouchableOpacity disabled={!canGoBack} onPress={onPress}>
      <Image
        source={APP_IMAGES.icChevronLeft}
        width={26}
        height={26}
        tintColor={'white'}
      />
    </TouchableOpacity>
  );
};

export default HeaderBackButton;
