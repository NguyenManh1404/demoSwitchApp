import React, {useMemo} from 'react';
import {Image, StyleSheet} from 'react-native';
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
            isSelected ? APP_IMAGES.icHaiChau : APP_IMAGES.icHaiChauActive
          }
          style={isSelected ? styles.markerHaiChau : styles.markerHaiChauActive}
        />
      ) : (
        <Image
          source={isSelected ? APP_IMAGES.icMaker : APP_IMAGES.icMakerActive}
          style={isSelected ? styles.marker : styles.markerActive}
        />
      )}
    </Marker>
  );
};

const styles = StyleSheet.create({
  marker: {
    width: 21,
    height: 25,
  },
  markerActive: {
    width: 21,
    height: 30,
  },
  markerHaiChau: {
    width: 20,
    height: 25,
  },
  markerHaiChauActive: {
    width: 24,
    height: 30,
  },
});

export default MakerItem;
