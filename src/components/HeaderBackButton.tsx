import {useNavigation} from '@react-navigation/native';
import {HeaderBackButtonProps} from '@react-navigation/native-stack/lib/typescript/src/types';
import React from 'react';
import {Image, TouchableOpacity} from 'react-native';
import {APP_COLORS} from '../themes/colors';
import {APP_IMAGES} from '../themes/images';

interface CustomHeaderBackButtonProps extends HeaderBackButtonProps {
  onGoBack?: () => void;
}

const HeaderBackButton: React.FC<CustomHeaderBackButtonProps> = ({
  canGoBack,
  onGoBack,
}) => {
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
        tintColor={APP_COLORS.white}
      />
    </TouchableOpacity>
  );
};

export default HeaderBackButton;
