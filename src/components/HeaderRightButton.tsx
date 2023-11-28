import React from 'react';
import {Image, TouchableOpacity} from 'react-native';
import {APP_IMAGES} from '../themes/images';

const HeaderRightButton: React.FC<HeaderRightButtonProps> = ({onPress}) => {
  const onPressInfo = () => {
    onPress?.();
  };
  return (
    <TouchableOpacity onPress={onPressInfo}>
      <Image source={APP_IMAGES.icInfo} />
    </TouchableOpacity>
  );
};

export default HeaderRightButton;
