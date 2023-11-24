import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {APP_COLORS} from '../themes/colors';
import {SCREEN_HEIGHT} from '../utils/constants';
import Text from './Text';

const ListEmptyComponent: React.FC<IListEmptyComponentProps> = ({
  image,
  title,
}) => {
  return (
    <View style={styles.container}>
      <Image source={image} style={styles.icSearchNoResult} />
      <Text color={APP_COLORS.neutral3}>{title}</Text>
    </View>
  );
};

export default ListEmptyComponent;

const styles = StyleSheet.create({
  container: {
    marginTop: SCREEN_HEIGHT / 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icSearchNoResult: {
    marginBottom: 8,
  },
});
