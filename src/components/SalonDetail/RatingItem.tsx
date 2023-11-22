import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  TextLayoutEventData,
  TouchableOpacity,
  View,
} from 'react-native';
import {APP_COLORS} from '../../themes/colors';
import {HIT_SLOP, SCREEN_WIDTH} from '../../utils/constants';
import Text from '../Text';

const RatingItem = ({item, index}: {item: IRatingItem; index: number}) => {
  const [textShown, setTextShown] = useState(-1);
  const [showBottom, setShowBottom] = useState(false);

  const toggleNumberOfLines = (indexItem: number) => {
    setTextShown(prevIndex => (prevIndex === indexItem ? -1 : indexItem));
  };

  const onTextLayOut = async (e: {nativeEvent: TextLayoutEventData}) => {
    if (e.nativeEvent.lines.length >= 3) {
      await setShowBottom(true);
    }
  };

  return (
    <View>
      <View style={styles.headerItem}>
        <Text type="bold-14">Mã góp ý: {item?.id}</Text>
        <Text color={APP_COLORS.gray2} type="regular-13">
          {item?.time}
        </Text>
      </View>

      <View style={styles.contentItem}>
        <Text
          color={APP_COLORS.neutral2}
          numberOfLines={textShown === index ? undefined : 3}
          onTextLayout={onTextLayOut}>
          {item?.content}
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
        {item?.images?.map((image, i) => {
          return <Image source={image} style={styles.imageReview} key={i} />;
        })}
      </View>
      <View style={styles.divder} />
    </View>
  );
};

export default RatingItem;

const styles = StyleSheet.create({
  headerItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  contentItem: {
    marginTop: 8,
    marginBottom: 12,
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
  divder: {
    height: 1,
    width: SCREEN_WIDTH - 60,
    backgroundColor: APP_COLORS.gray2,
    marginVertical: 12,
  },
});
