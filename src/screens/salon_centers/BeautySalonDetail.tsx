import {useNavigation, useRoute} from '@react-navigation/native';
import React from 'react';
import {
  Image,
  Platform,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import ButtonAwareKeyboard from '../../components/ButtonAwareKeyboard';
import KeyboardContainer from '../../components/KeyboardContainer';
import InfoDetailSalonItem from '../../components/SalonDetail/InfoDetailSalonItem';
import RatingItem from '../../components/SalonDetail/RatingItem';
import Text from '../../components/Text';
import {useHeaderOptions} from '../../hooks/useHeaderOptions';
import {APP_COLORS} from '../../themes/colors';
import {APP_IMAGES} from '../../themes/images';
import {IS_ANDROID, SCREEN_WIDTH} from '../../utils/constants';

const DATA_REVIEW = [
  {
    id: '1',
    time: '25/04/2005',
    content:
      'Trách nhiệm trong việc bảo vệ tài sản và tuân thủ các quy trình bảo mật của Công ty đã được truyền đạt tới tất cả các đối tượng chưa? Nhân viên đã nắm được trách nhiệm, vai trò của mình trong việc bảo mật thông tin ở dự án hay chưa? Khi ký hợp đồng vớksjd',

    images: [APP_IMAGES.icAvatar, APP_IMAGES.icAvatar, APP_IMAGES.icAvatar],
  },
  {
    id: '2',
    time: '25/04/2005',
    content: 'Your long text goes here..',

    images: [APP_IMAGES.icAvatar, APP_IMAGES.icAvatar, APP_IMAGES.icAvatar],
  },
  {
    id: '3',
    time: '25/04/2005',
    content:
      'Your long text goes here... Your long text goes here... Your long text goes here... Your long text goes here... Your long text goes here... Your long text goes here... Your long text goes here... Your long text goes here... Your long text goes here... Your long text goes here... Your long text goes here... Your long text goes here... Your long text goes here... Your long text goes here...',

    images: [APP_IMAGES.icAvatar, APP_IMAGES.icAvatar, APP_IMAGES.icAvatar],
  },
  {
    id: '4',
    time: '25/04/2005',
    content:
      'Your long text goes here... Your long text goes here... Your long text goes here... Your long text goes here... Your long text goes here... Your long text goes here... Your long text goes here... Your long text goes here... Your long text goes here... Your long text goes here... Your long text goes here... Your long text goes here... Your long text goes here... Your long text goes here...',

    images: [APP_IMAGES.icAvatar, APP_IMAGES.icAvatar, APP_IMAGES.icAvatar],
  },
];

const BeautySalonDetail: React.FC<BeautySalonDetailProps> = () => {
  const route = useRoute();
  const {item} = route?.params;
  const {navigate} = useNavigation<HomeScreenNavigationProp>();

  useHeaderOptions({
    options: {
      headerTitle: item.BusinessName,
    },
  });

  const moveToBeautySalonReview = () => {
    navigate('BeautySalonReview', {item: item});
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardContainer style={styles.keyboardContainer}>
        <View style={styles.cardDetailSalon}>
          <Image
            source={item?.LogoURL ? item?.LogoURL : APP_IMAGES.icAvatar}
            style={styles.avatar}
          />
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
          </View>
        </View>

        <View style={styles.titleCard}>
          <Text color={APP_COLORS.titleCard} type="bold-14">
            Thông tin cơ sở
          </Text>
        </View>

        <View style={styles.infoSalonView}>
          {item?.FormattedAddress && (
            <InfoDetailSalonItem
              title={'Địa chỉ'}
              content={item?.FormattedAddress}
            />
          )}
          {item?.Industry && (
            <InfoDetailSalonItem
              title={'Dịch vụ đăng ký'}
              content={item?.Industry}
            />
          )}
          {item?.LicensetoOperate && (
            <InfoDetailSalonItem
              title={'Số đăng ký kinh doanh'}
              content={item?.LicensetoOperate}
            />
          )}
          {item?.IssueDate && (
            <InfoDetailSalonItem
              title={'Ngày cấp đăng ký kinh doanh'}
              content={item?.IssueDate}
            />
          )}

          {/* <InfoDetailSalonItem
          title={'Ngày kiểm tra'}
          content={'Chăm sóc sức khoẻ'}
        /> */}
          {/* <InfoDetailSalonItem title={'Ghi chú'} content={'Chăm sóc sức khoẻ'} /> */}

          <TouchableOpacity>
            <Text type="semiBold-16">Xem giấy chứng nhận</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.titleCard}>
          <Text color={APP_COLORS.titleCard} type="bold-14">
            Đánh giá
          </Text>
        </View>

        <View style={styles.infoSalonView}>
          {DATA_REVIEW?.map((itemReview, indexItem) => {
            return (
              <RatingItem item={itemReview} key={indexItem} index={indexItem} />
            );
          })}
        </View>
      </KeyboardContainer>
      <ButtonAwareKeyboard
        label={'Gửi đánh giá'}
        onPress={moveToBeautySalonReview}
      />
    </SafeAreaView>
  );
};

export default BeautySalonDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardContainer: {
    padding: 12,
  },
  cardDetailSalon: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: APP_COLORS.white,
    borderRadius: 12,
    overflow: IS_ANDROID ? 'hidden' : undefined,
    borderWidth: 1,
    borderColor: APP_COLORS.greyL6,
    shadowColor: APP_COLORS.shadowColor,
    shadowOffset: {width: 1, height: 2},
    shadowOpacity: 1,
    shadowRadius: 5,
    width: SCREEN_WIDTH - 36,
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
  titleCard: {
    marginTop: 18,
    marginBottom: 8,
  },
  infoOffice: {},
  detailItemTxt: {
    lineHeight: 22,
  },
  infoSalonView: {
    padding: 12,
    width: SCREEN_WIDTH - 36,
    backgroundColor: APP_COLORS.white,
    borderRadius: 12,
    overflow: IS_ANDROID ? 'hidden' : undefined,
    borderWidth: 1,
    borderColor: APP_COLORS.greyL6,
    shadowColor: APP_COLORS.shadowColor,
    shadowOffset: {width: 1, height: 2},
    shadowOpacity: 1,
    shadowRadius: 5,
    marginBottom: 20,
    ...Platform.select({
      android: {
        elevation: 3,
      },
    }),
  },
});
