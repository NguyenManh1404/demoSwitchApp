import React, {useState} from 'react';
import {
  Image,
  ImageSourcePropType,
  Platform,
  StyleSheet,
  TextLayoutEventData,
  TouchableOpacity,
  View,
} from 'react-native';
import {APP_COLORS} from '../../themes/colors';

import {HIT_SLOP, IS_ANDROID, SCREEN_WIDTH} from '../../utils/constants';
import Text from '../Text';

const EvaluateAnotherSalonCard = ({
  item,
  index,
}: {
  item: IEvaluateAnotherItem;
  index: number;
}) => {
  const [textShown, setTextShown] = useState(-1);
  const [showBottom, setShowBottom] = useState(false);

  const toggleNumberOfLines = (indexItem: number) => {
    setTextShown(prevIndex => (prevIndex === indexItem ? -1 : indexItem));
  };

  const onTextLayOut = async (e: {nativeEvent: TextLayoutEventData}) => {
    if (e.nativeEvent.lines.length > 3) {
      await setShowBottom(true);
    }
  };
  return (
    <View style={styles.evaluateAnotherCard}>
      <View style={styles.headerItem}>
        <Text type="bold-14">Mã góp ý: {item?.idReview}</Text>
        <Text color={APP_COLORS.gray2} type="regular-13">
          {item?.timeCreated}
        </Text>
      </View>
      <View style={styles.field}>
        <Text type="bold-14">Tên cơ sở</Text>
        <Text style={styles.infoField}>{item?.centerName}</Text>
      </View>
      <View style={styles.field}>
        <Text type="bold-14">Địa chỉ cơ sở</Text>
        <Text style={styles.infoField}>{item?.address}</Text>
      </View>
      <View style={styles.field}>
        <Text type="bold-14">Nội dung góp ý, đánh giá</Text>
        <Text
          style={styles.infoField}
          numberOfLines={textShown === index ? undefined : 3}
          onTextLayout={onTextLayOut}>
          {item?.reviewContent}
        </Text>
      </View>

      {showBottom && (
        <TouchableOpacity
          style={styles.moreLessBtn}
          hitSlop={HIT_SLOP}
          onPress={() => toggleNumberOfLines(index)}>
          <Text type="bold-13">
            {textShown === index ? 'Thu gọn' : 'Xem thêm'}
          </Text>
        </TouchableOpacity>
      )}

      <View style={styles.imageReviewView}>
        {item?.images?.map((image: ImageSourcePropType, i: number) => {
          return <Image source={image} style={styles.imageReview} key={i} />;
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
    marginBottom: 8,
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
});
