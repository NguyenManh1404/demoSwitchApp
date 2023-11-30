import React, {useMemo} from 'react';
import {Animated, Image} from 'react-native';
import {Marker} from 'react-native-maps';
import {APP_IMAGES} from '../../themes/images';
import {QUALIFIED} from '../../utils/constants';

const MakerItem: React.FC<IMakerItem> = ({
  index,
  item,
  isSelected,
  onPress,
}) => {
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
      {item?.BusinessType === QUALIFIED ? (
        <Image
          source={APP_IMAGES.icHaiChauActive}
          style={[
            {
              transform: [{scale: isSelected ? 1 : 0.75}],
            },
          ]}
        />
      ) : (
        <Animated.Image
          source={APP_IMAGES.icMakerActive}
          style={[
            {
              transform: [{scale: isSelected ? 1 : 0.75}],
            },
          ]}
          resizeMode="contain"
        />
      )}
    </Marker>
  );
};

export default MakerItem;
