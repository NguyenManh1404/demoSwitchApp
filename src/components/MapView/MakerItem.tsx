import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {Marker, MarkerPressEvent} from 'react-native-maps';
import {APP_IMAGES} from '../../themes/images';

interface IMakerItem {
  coordinate: {
    latitude: number;
    longitude: number;
  };
  isLocationSelected: boolean;
  isClinic: boolean;
  onPress: (event: MarkerPressEvent) => void;
}

const MakerItem: React.FC<IMakerItem> = ({
  coordinate,
  isLocationSelected,
  isClinic,
  onPress,
}) => {
  return (
    <Marker coordinate={coordinate} onPress={onPress}>
      {isClinic ? (
        <Image
          source={
            isLocationSelected
              ? APP_IMAGES.icHaiChau
              : APP_IMAGES.icHaiChauActive
          }
          style={
            isLocationSelected
              ? styles.markerHaiChau
              : styles.markerHaiChauActive
          }
        />
      ) : (
        <Image
          source={
            isLocationSelected ? APP_IMAGES.icMaker : APP_IMAGES.icMakerActive
          }
          style={isLocationSelected ? styles.marker : styles.markerActive}
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
