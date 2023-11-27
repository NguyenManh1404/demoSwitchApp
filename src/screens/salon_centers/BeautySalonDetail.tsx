import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {Platform, StyleSheet, TouchableOpacity, View} from 'react-native';
import ButtonAwareKeyboard from '../../components/ButtonAwareKeyboard';
import KeyboardContainer from '../../components/KeyboardContainer';
import SalonCard from '../../components/SalonCard';
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
    createdAt: '25/04/2005',
    content:
      'Trách nhiệm trong việc bảo vệ tài sản và tuân thủ các quy trình bảo mật của Công ty đã được truyền đạt tới tất cả các đối tượng chưa? Nhân viên đã nắm được trách nhiệm, vai trò của mình trong việc bảo mật thông tin ở dự án hay chưa? Khi ký hợp đồng vớksjd',

    images: [APP_IMAGES.icAvatar, APP_IMAGES.icAvatar, APP_IMAGES.icAvatar],
  },
  {
    id: '2',
    createdAt: '25/04/2005',
    content: 'Your long text goes here..',

    images: [APP_IMAGES.icAvatar, APP_IMAGES.icAvatar, APP_IMAGES.icAvatar],
  },
  {
    id: '3',
    createdAt: '25/04/2005',
    content:
      'Your long text goes here... Your long text goes here... Your long text goes here... Your long text goes here... Your long text goes here... Your long text goes here... Your long text goes here... Your long text goes here... Your long text goes here... Your long text goes here... Your long text goes here... Your long text goes here... Your long text goes here... Your long text goes here...',

    images: [APP_IMAGES.icAvatar, APP_IMAGES.icAvatar, APP_IMAGES.icAvatar],
  },
  {
    id: '4',
    createdAt: '25/04/2005',
    content:
      'Your long text goes here... Your long text goes here... Your long text goes here... Your long text goes here... Your long text goes here... Your long text goes here... Your long text goes here... Your long text goes here... Your long text goes here... Your long text goes here... Your long text goes here... Your long text goes here... Your long text goes here... Your long text goes here...',

    images: [APP_IMAGES.icAvatar, APP_IMAGES.icAvatar, APP_IMAGES.icAvatar],
  },
];

type BeautySalonDetailProps = NativeStackScreenProps<
  RootStackParamList,
  'BeautySalonDetail'
>;

const BeautySalonDetail = ({route, navigation}: BeautySalonDetailProps) => {
  const {item} = route?.params;

  useHeaderOptions({
    options: {
      headerTitle: item.BusinessName,
    },
  });

  const moveToBeautySalonReview = () => {
    navigation.navigate('BeautySalonReview', {
      item: item,
      title: 'Gửi góp ý, đánh giá',
    });
  };

  return (
    <View style={styles.container}>
      <KeyboardContainer style={styles.keyboardContainer}>
        <SalonCard item={item} isShowValuation={true} isFromDetail={true} />
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
    </View>
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
  titleCard: {
    marginTop: 18,
    marginBottom: 8,
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
