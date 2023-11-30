import firestore from '@react-native-firebase/firestore';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  ListRenderItem,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import ButtonAwareKeyboard from '../../components/ButtonAwareKeyboard';
import ListEmptyComponent from '../../components/ListEmptyComponent';
import SalonCard from '../../components/SalonCard';
import InfoDetailSalonItem from '../../components/SalonDetail/InfoDetailSalonItem';
import RatingItem from '../../components/SalonDetail/RatingItem';
import Text from '../../components/Text';
import {useHeaderOptions} from '../../hooks/useHeaderOptions';
import {useRefreshOnFocus} from '../../hooks/useRefreshOnFocus';
import {APP_COLORS} from '../../themes/colors';
import {APP_IMAGES} from '../../themes/images';
import {IS_ANDROID, QUALIFIED, SCREEN_WIDTH} from '../../utils/constants';

type BeautySalonDetailProps = NativeStackScreenProps<
  RootStackParamList,
  'BeautySalonDetail'
>;

const commentSalonRef = firestore().collection('BeautySalonComments');

const BeautySalonDetail = ({route, navigation}: BeautySalonDetailProps) => {
  const {item} = route?.params;

  const [salonComments, setSalonComments] = useState<IReviewSalon[]>([]);

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

  const fetchReview = useCallback(async () => {
    try {
      const querySnapshot = await commentSalonRef
        .where('idSalon', '==', item?.id)
        .get();
      const salonCentreData: IReviewSalon[] = [];

      querySnapshot.forEach(documentSnapshot => {
        const tamp = documentSnapshot?.data();

        salonCentreData.push({
          id: documentSnapshot.id,
          formattedTime: tamp?.createdAt?.toDate(),
          ...documentSnapshot.data(),
        } as IReviewSalon);
      });

      const sortData = salonCentreData.sort(
        (a, b) => b.createdAt.seconds - a.createdAt.seconds,
      );

      setSalonComments(sortData.slice(0, 10));
    } catch (error) {}
  }, [item?.id]);

  useEffect(() => {
    fetchReview();
  }, [fetchReview]);

  useRefreshOnFocus({refetch: fetchReview});

  const renderItem: ListRenderItem<IReviewSalon> = ({
    item: ratingItem,
    index,
  }) => {
    return <RatingItem item={ratingItem} key={index} />;
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={salonComments || []}
        renderItem={renderItem}
        keyExtractor={(__, index) => `${index}`}
        contentContainerStyle={styles.contentContainerStyle}
        ListEmptyComponent={
          <ListEmptyComponent
            image={APP_IMAGES.icNoData}
            title={'Chưa có dữ liệu'}
          />
        }
        ListHeaderComponent={
          <View>
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
                  title={'Số giấy phép hoạt động'}
                  content={item?.LicensetoOperate}
                />
              )}
              {item?.IssueDate && (
                <InfoDetailSalonItem
                  title={'Ngày cấp giấy phép hoạt động'}
                  content={item?.IssueDate}
                />
              )}

              {item?.BusinessType === QUALIFIED && item?.IsClinic === false ? (
                <View>
                  <View style={styles.divder} />
                  <Text color={APP_COLORS.neutral2}>
                    Cơ sở đủ điều kiện tự công bố đáp ứng điều kiện cung cấp
                    dịch vụ thẩm mỹ của Sở Y Tế
                  </Text>
                </View>
              ) : null}
            </View>
            <View style={styles.titleCard}>
              <Text color={APP_COLORS.titleCard} type="bold-14">
                Đánh giá
              </Text>
            </View>
          </View>
        }
      />

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

  titleCard: {
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
  contentContainerStyle: {padding: 18, flexGrow: 1},
  divder: {
    height: 1,
    width: SCREEN_WIDTH - 60,
    backgroundColor: APP_COLORS.gray2,
    marginVertical: 12,
  },
});
