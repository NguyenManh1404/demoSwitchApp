import React from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {APP_COLORS} from '../../themes/colors';
import {convertIsoDateToFormattedString} from '../../themes/helpers';

import ViewMoreText from 'react-native-view-more-text';
import {HIT_SLOP, IS_ANDROID, SCREEN_WIDTH} from '../../utils/constants';
import Text from '../Text';

const EvaluateAnotherSalonCard: React.FC<IEvaluateAnotherSalonCard> = ({
  item,
}) => {
  const renderViewMore: (handlePress: () => void) => JSX.Element = onPress => (
    <TouchableOpacity
      style={styles.moreLessBtn}
      hitSlop={HIT_SLOP}
      onPress={onPress}>
      <Text type="bold-13">Xem thêm</Text>
    </TouchableOpacity>
  );
  const renderViewLess: (handlePress: () => void) => JSX.Element = onPress => (
    <TouchableOpacity
      style={styles.moreLessBtn}
      hitSlop={HIT_SLOP}
      onPress={onPress}>
      <Text type="bold-13">Thu gọn</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.evaluateAnotherCard}>
      <View>
        <Text type="bold-14" style={styles.titleTxt}>
          {item?.title}
        </Text>
      </View>
      <View style={styles.headerItem}>
        <Text color={APP_COLORS.gray2}>Mã góp ý: {item?.idReview}</Text>
        <Text color={APP_COLORS.gray2} type="regular-13">
          {convertIsoDateToFormattedString(item?.formattedTime)}
        </Text>
      </View>
      <View style={styles.field}>
        <Text type="bold-14">Tên cơ sở</Text>
        <Text style={styles.infoField}>{item?.salonName}</Text>
      </View>
      <View style={styles.field}>
        <Text type="bold-14">Địa chỉ cơ sở</Text>
        <Text style={styles.infoField}>{item?.salonAddress}</Text>
      </View>
      <View style={styles.field}>
        <Text type="bold-14" style={styles.titleContent}>
          Nội dung góp ý, đánh giá
        </Text>
        <ViewMoreText
          numberOfLines={3}
          renderViewMore={renderViewMore}
          renderViewLess={renderViewLess}
          style={styles.contentItem}>
          <Text style={styles.contextTxt}>{item?.content}</Text>
        </ViewMoreText>
      </View>

      <View style={styles.imageReviewView}>
        {item?.images?.map((image, i) => {
          return (
            <Image source={{uri: image}} style={styles.imageReview} key={i} />
          );
        })}
      </View>
    </View>
  );
};

export default EvaluateAnotherSalonCard;

const styles = StyleSheet.create({
  evaluateAnotherCard: {
    padding: 12,
    backgroundColor: APP_COLORS.white,
    borderRadius: 12,
    marginBottom: 12,
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
  headerItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  titleContent: {
    lineHeight: 22,
  },
  moreLessBtn: {
    alignSelf: 'flex-end',
    marginBottom: 12,
  },
  imageReviewView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  imageReview: {
    width: 66,
    height: 66,
    borderRadius: 4,
    marginRight: 5,
  },
  field: {
    marginBottom: 8,
  },
  infoField: {
    lineHeight: 22,
  },
  titleTxt: {
    lineHeight: 22,
  },
  contentItem: {
    marginTop: 8,
    marginBottom: 12,
  },
  contextTxt: {
    lineHeight: 22,
  },
});
