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
import {IS_ANDROID, QUALIFIED, SCREEN_WIDTH} from '../utils/constants';
import Text from './Text';

const SalonCard = ({
  item,
  index,
  isShowValuation = false,
  isShowAddress = true,
  isFromMapView = false,
  onPress,
  ...props
}: ISalonCard) => {
  const onPressItem = () => {
    onPress?.(item);
  };
  return (
    <TouchableOpacity
      {...props}
      key={index}
      style={[styles.salonCard, isFromMapView ? styles.styleFromMapView : {}]}
      onPress={onPressItem}>
      <Image
        source={item?.LogoURL ? item?.LogoURL : APP_IMAGES.icAvatar}
        style={styles.avatar}
      />
      <View style={styles.nameAddressView}>
        <Text
          numberOfLines={isFromMapView ? 2 : undefined}
          type="bold-16"
          style={styles.nameText}>
          {item?.BusinessName}
        </Text>
        {isShowValuation && (
          <View>
            {item?.BusinessType === QUALIFIED ? (
              <View style={styles.valuationView}>
                <Image source={APP_IMAGES.icCheck} style={styles.icCheck} />
                <Text numberOfLines={2} type="regular-13">
                  Đã đủ điều kiện
                </Text>
              </View>
            ) : (
              <View style={styles.valuationView}>
                <Image source={APP_IMAGES.icAlert} style={styles.icCheck} />
                <Text numberOfLines={2} type="regular-13">
                  Chưa đủ điều kiện
                </Text>
              </View>
            )}
          </View>
        )}

        {isShowAddress && (
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
        )}
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
    overflow: IS_ANDROID ? 'hidden' : undefined,
    borderWidth: 1,
    width: SCREEN_WIDTH - 36,
    borderColor: APP_COLORS.greyL6,
    shadowColor: APP_COLORS.shadowColor,
    shadowOffset: {width: 1, height: 2},
    shadowOpacity: 1,
    shadowRadius: 5,
    marginBottom: 12,
    ...Platform.select({
      android: {
        elevation: 3,
      },
    }),
  },

  styleFromMapView: {
    marginBottom: 0,
    width: SCREEN_WIDTH - 55,
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
  },

  nameText: {
    lineHeight: 24,
  },
  icLocationStyle: {width: 18, height: 18, marginRight: 5},
  addressTxt: {
    lineHeight: 18,
    flex: 1,
  },
  valuationView: {
    flexDirection: 'row',
    marginVertical: 8,
  },
  icCheck: {width: 18, height: 18, marginRight: 5},
});
