import React from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {APP_COLORS} from '../themes/colors';
import {APP_IMAGES} from '../themes/images';
import {IS_ANDROID, SCREEN_WIDTH} from '../utils/constants';
import Text from './Text';

const SalonCard = ({item, index, onPress}: ISalonCard) => {
  const onPressItem = () => {
    onPress?.(item);
  };
  return (
    <TouchableOpacity
      key={index}
      style={styles.salonCard}
      onPress={onPressItem}>
      <Image
        source={item?.LogoURL ? item?.LogoURL : APP_IMAGES.icAvatar}
        style={styles.avatar}
      />
      <View style={styles.nameAddressView}>
        <Text numberOfLines={3} type="bold-16" style={styles.nameText}>
          {item?.BusinessName}
        </Text>
        <View style={styles.addressView}>
          <Image
            source={APP_IMAGES.icLocation}
            tintColor={APP_COLORS.primary}
            style={styles.icLocationStyle}
          />
          <Text numberOfLines={2} type="regular-13" style={styles.addressTxt}>
            {item?.FormattedAddress}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default SalonCard;

const styles = StyleSheet.create({
  salonCard: {
    flexDirection: 'row',
    flex: 1,
    padding: 12,
    backgroundColor: APP_COLORS.white,
    borderRadius: 12,
    width: SCREEN_WIDTH - 55,
    overflow: IS_ANDROID ? 'hidden' : undefined,
    borderWidth: 1,
    borderColor: APP_COLORS.greyL6,
    shadowColor: APP_COLORS.shadowColor,
    shadowOffset: {width: 1, height: 2},
    shadowOpacity: 1,
    shadowRadius: 5,
    ...Platform.select({
      android: {
        elevation: 3,
      },
    }),
  },

  avatar: {
    width: 56,
    height: 56,
    marginRight: 12,
  },

  nameAddressView: {
    flex: 1,
  },
  addressView: {
    flexDirection: 'row',
    marginTop: 5,
    flex: 1,
  },

  nameText: {
    lineHeight: 24,
  },
  icLocationStyle: {width: 18, height: 18, marginRight: 5},
  addressTxt: {
    lineHeight: 18,
    flex: 1,
  },
});
