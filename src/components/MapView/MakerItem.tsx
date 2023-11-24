import React, {useMemo} from 'react';
import {Image} from 'react-native';
import {Marker} from 'react-native-maps';
import {APP_IMAGES} from '../../themes/images';

const MakerItem: React.FC<IMakerItem> = ({
  index,
  item,
  isSelected,
  onPress,
}) => {
  const {IsClinic} = item || {};

  const coordinate = useMemo(() => {
    if (!item.Lat || !item.Long) {
      return null;
    }
    return {
      latitude: Number(item.Lat),
      longitude: Number(item.Long),
    };
  }, [item.Lat, item.Long]);

  const onPressItem = () => {
    onPress?.(item, index);
  };

  if (!coordinate) {
    return null;
  }

  return (
    <Marker coordinate={coordinate} onPress={onPressItem}>
      {IsClinic ? (
        <Image
          source={
            isSelected ? APP_IMAGES.icHaiChauActive : APP_IMAGES.icHaiChau
          }
        />
      ) : (
        <Image
          source={isSelected ? APP_IMAGES.icMakerActive : APP_IMAGES.icMaker}
        />
      )}
    </Marker>
  );
};

export default MakerItem;
