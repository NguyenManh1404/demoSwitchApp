import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import ButtonAwareKeyboard from '../../components/ButtonAwareKeyboard';
import ListEmptyComponent from '../../components/ListEmptyComponent';
import EvaluateAnotherSalonCard from '../../components/SalonCentre/EvaluateAnotherSalonCard';
import {APP_IMAGES} from '../../themes/images';

const ReviewData = [
  {
    idReview: '1',
    createdAt: '25/04/2005',
    centerName: 'Thẩm mỹ viện Molina',
    address:
      '291 Nguyễn Văn Linh, Phường Thạc Gián, Quận Thanh Khê, TP Đà Nẵng',
    reviewContent:
      'Tôi đã trải qua trải nghiệm không dễ dàng tại cơ sở thẩm mỹ này. ôi đã trải qua trải nghiệm không dễ dàng tại cơ sở thẩm mỹ này. ôi đã trảiqua trải nghiệm không dễ dàng tại cơ sở thẩm mỹ này. ôi đã trải qua trải nghiệm không dễ dàng tại cơ sở thẩm mỹ này.',
    images: [APP_IMAGES.icAvatar, APP_IMAGES.icAvatar, APP_IMAGES.icAvatar],
  },
  {
    idReview: '2',
    createdAt: '25/04/2005',
    centerName: 'Thẩm mỹ viện Molina',
    address:
      '291 Nguyễn Văn Linh, Phường Thạc Gián, Quận Thanh Khê, TP Đà Nẵng',
    reviewContent:
      'Tôi đã trải qua trải nghiệm không dễ dàng tại cơ sở thẩm mỹ này. ôi đã trải qua trải nghiệm không dễ dàng tại cơ sở thẩm mỹ này. ôi đã trảiqua trải nghiệm không dễ dàng tại cơ sở thẩm mỹ này. ôi đã trải qua trải nghiệm không dễ dàng tại cơ sở thẩm mỹ này.',
    images: [APP_IMAGES.icAvatar, APP_IMAGES.icAvatar, APP_IMAGES.icAvatar],
  },
  {
    idReview: '3',
    createdAt: '25/04/2005',
    centerName: 'Thẩm mỹ viện Molina',
    address:
      '291 Nguyễn Văn Linh, Phường Thạc Gián, Quận Thanh Khê, TP Đà Nẵng',
    reviewContent:
      'Tôi đã trải qua trải nghiệm không dễ dàng tại cơ sở thẩm mỹ này. ôi đã trải qua trải nghiệm không dễ dàng tại cơ sở thẩm mỹ này. ôi đã trảiqua trải nghiệm không dễ dàng tại cơ sở thẩm mỹ này. ôi đã trải qua trải nghiệm không dễ dàng tại cơ sở thẩm mỹ này.',
    images: [APP_IMAGES.icAvatar, APP_IMAGES.icAvatar, APP_IMAGES.icAvatar],
  },
  {
    idReview: '4',
    createdAt: '25/04/2005',
    centerName: 'Thẩm mỹ viện Molina',
    address:
      '291 Nguyễn Văn Linh, Phường Thạc Gián, Quận Thanh Khê, TP Đà Nẵng',
    reviewContent:
      'Tôi đã trải qua trải nghiệm không dễ dàng tại cơ sở thẩm mỹ này. ôi đã trải qua trải nghiệm không dễ dàng tại cơ sở thẩm mỹ này. ôi đã trảiqua trải nghiệm không dễ dàng tại cơ sở thẩm mỹ này. ôi đã trải qua trải nghiệm không dễ dàng tại cơ sở thẩm mỹ này.',
    images: [APP_IMAGES.icAvatar, APP_IMAGES.icAvatar, APP_IMAGES.icAvatar],
  },
  {
    idReview: '5',
    createdAt: '25/04/2005',
    centerName: 'Thẩm mỹ viện Molina',
    address:
      '291 Nguyễn Văn Linh, Phường Thạc Gián, Quận Thanh Khê, TP Đà Nẵng',
    reviewContent:
      'Tôi đã trải qua trải nghiệm không dễ dàng tại cơ sở thẩm mỹ này. ôi đã trải qua trải nghiệm không dễ dàng tại cơ sở thẩm mỹ này. ôi đã trảiqua trải nghiệm không dễ dàng tại cơ sở thẩm mỹ này. ôi đã trải qua trải nghiệm không dễ dàng tại cơ sở thẩm mỹ này.',
    images: [APP_IMAGES.icAvatar, APP_IMAGES.icAvatar, APP_IMAGES.icAvatar],
  },
];

type EvaluateAnotherSalonProps = NativeStackScreenProps<
  RootStackParamList,
  'EvaluateAnotherSalon'
>;

const EvaluateAnotherSalon = ({navigation}: EvaluateAnotherSalonProps) => {
  const EvaluateAnotherSalonForm = () => {
    navigation.navigate('EvaluateAnotherSalonForm', {});
  };

  const renderReviewItem: React.FC<IEvaluateAnotherSalonCard> = ({
    item,
    index,
  }) => {
    return (
      <View style={styles.itemView} key={index}>
        <EvaluateAnotherSalonCard item={item} index={index} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={ReviewData || []}
        renderItem={renderReviewItem}
        keyExtractor={(__, index) => `${index}`}
        contentContainerStyle={styles.contentContainerStyle}
        ListEmptyComponent={
          <ListEmptyComponent
            image={APP_IMAGES.icSearchNoResult}
            title={'Rất tiếc, không có dữ liệu hiển thị'}
          />
        }
      />

      <ButtonAwareKeyboard
        label={'Gửi đánh giá'}
        onPress={EvaluateAnotherSalonForm}
      />
    </View>
  );
};

export default EvaluateAnotherSalon;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 18,
  },
  contentContainerStyle: {
    flexGrow: 1,
  },
  itemView: {
    alignItems: 'center',
  },
});
