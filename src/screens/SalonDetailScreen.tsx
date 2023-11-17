import {useRoute} from '@react-navigation/native';
import React from 'react';
import {
  Image,
  Platform,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Text from '../components/Text';
import {useHeaderOptions} from '../hooks/useHeaderOptions';
import {APP_COLORS} from '../themes/colors';
import {APP_IMAGES} from '../themes/images';
import {IS_ANDROID, SCREEN_WIDTH} from '../utils/constants';

const SalonDetailScreen = () => {
  const route = useRoute();
  const {item}: any = route?.params;

  useHeaderOptions({
    options: {
      headerTitle: item.BusinessName,
    },
  });
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.cardDetailSalon}>
        <Image source={APP_IMAGES.icAvatar} style={styles.avatar} />
        <View style={styles.nameAddressView}>
          <Text numberOfLines={3} type="bold-16" style={styles.nameText}>
            {item?.BusinessName}
          </Text>
          <View style={styles.reviewView}>
            <Image source={APP_IMAGES.icCheck} style={styles.icCheck} />
            <Text numberOfLines={2} type="regular-13">
              Đã đủ điều kiện
            </Text>
          </View>
          <TouchableOpacity style={styles.btnReview}>
            <Text type="semiBold-13">Gửi đánh giá</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.titleCard}>
        <Text color={APP_COLORS.titleCard} type="bold-14">
          Thông tin cơ sở
        </Text>
      </View>
      <View style={styles.infoOffice}>
        <Text>dmo</Text>
      </View>
    </SafeAreaView>
  );
};

export default SalonDetailScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 18,
    paddingVertical: 18,
  },
  cardDetailSalon: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: APP_COLORS.white,
    borderRadius: 12,
    width: SCREEN_WIDTH - 36,
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
  reviewView: {
    flexDirection: 'row',
    marginVertical: 8,
  },

  nameText: {
    lineHeight: 24,
  },
  icCheck: {width: 18, height: 18, marginRight: 5},
  btnReview: {
    backgroundColor: APP_COLORS.grayBtnReview,
    paddingHorizontal: 12,
    paddingVertical: 8,
    width: SCREEN_WIDTH / 3.5,
    borderRadius: 8,
  },
  titleCard: {},
  infoOffice: {},
});
