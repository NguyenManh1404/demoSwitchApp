import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import ViewMoreText from 'react-native-view-more-text';

import {APP_COLORS} from '../../themes/colors';
import {convertIsoDateToFormattedString} from '../../themes/helpers';
import {HIT_SLOP} from '../../utils/constants';
import Text from '../Text';

const RatingItem: React.FC<IRatingItemProps> = ({item}) => {
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
    <View style={styles.container}>
      <View>
        <Text style={styles.titleTxt} type="bold-14">
          {item?.title}
        </Text>
      </View>
      <View style={styles.headerItem}>
        <Text style={styles.idReviewTxt} color={APP_COLORS.gray2}>
          Mã đánh giá: {item?.idReview}
        </Text>
        <Text color={APP_COLORS.gray2} type="regular-13">
          {convertIsoDateToFormattedString(item?.formattedTime)}
        </Text>
      </View>
      <ViewMoreText
        numberOfLines={3}
        renderViewMore={renderViewMore}
        renderViewLess={renderViewLess}
        style={styles.contentItem}>
        <Text style={styles.contextTxt}>{item?.content}</Text>
      </ViewMoreText>
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

export default RatingItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: APP_COLORS.white,
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: APP_COLORS.borderInput,
  },
  headerItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleTxt: {
    lineHeight: 22,
  },
  idReviewTxt: {
    flex: 1,
    lineHeight: 22,
  },
  contentItem: {
    marginTop: 8,
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
  moreLessBtn: {
    alignSelf: 'flex-end',
    marginBottom: 12,
  },
  contextTxt: {
    lineHeight: 22,
  },
});
