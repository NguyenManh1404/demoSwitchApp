import React from 'react';
import {ActivityIndicator, Image, StyleSheet, View} from 'react-native';
import {APP_COLORS} from '../themes/colors';
import Text from './Text';

const ListEmptyComponent: React.FC<IListEmptyComponentProps> = ({
  image,
  title,
  containerStyle,
  loading,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {loading ? (
        <ActivityIndicator size="small" color={APP_COLORS.primary} />
      ) : (
        <>
          <Image source={image} style={styles.icSearchNoResult} />
          <Text color={APP_COLORS.neutral3}>{title}</Text>
        </>
      )}
    </View>
  );
};

export default ListEmptyComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icSearchNoResult: {
    marginBottom: 8,
  },
});
