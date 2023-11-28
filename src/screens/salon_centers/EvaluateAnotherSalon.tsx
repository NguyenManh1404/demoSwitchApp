import firestore from '@react-native-firebase/firestore';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, ListRenderItem, StyleSheet, View} from 'react-native';
import ButtonAwareKeyboard from '../../components/ButtonAwareKeyboard';
import ListEmptyComponent from '../../components/ListEmptyComponent';
import EvaluateAnotherSalonCard from '../../components/SalonCentre/EvaluateAnotherSalonCard';
import {useRefreshOnFocus} from '../../hooks/useRefreshOnFocus';
import {APP_IMAGES} from '../../themes/images';

type EvaluateAnotherSalonProps = NativeStackScreenProps<
  RootStackParamList,
  'EvaluateAnotherSalon'
>;

const commentSalonRef = firestore().collection('AnotherSalonComments');

const EvaluateAnotherSalon = ({navigation}: EvaluateAnotherSalonProps) => {
  const [salonComments, setSalonComments] = useState<IReviewAnotherItem[]>([]);

  const EvaluateAnotherSalonForm = () => {
    navigation.navigate('EvaluateAnotherSalonForm', {
      title: 'Gửi góp ý, đánh giá',
    });
  };

  const fetchReview = useCallback(async () => {
    try {
      const querySnapshot = await commentSalonRef.get();
      const salonCentreData: IReviewAnotherItem[] = [];

      querySnapshot.forEach(documentSnapshot => {
        const tamp = documentSnapshot?.data();

        salonCentreData.push({
          id: documentSnapshot.id,
          formattedTime: tamp?.createdAt?.toDate(),
          ...documentSnapshot.data(),
        } as IReviewAnotherItem);
      });

      const sortData = salonCentreData.sort(
        (a, b) => b.createdAt.seconds - a.createdAt.seconds,
      );

      setSalonComments(sortData.slice(0, 10));
    } catch (error) {}
  }, []);

  useEffect(() => {
    fetchReview();
  }, [fetchReview]);

  useRefreshOnFocus({refetch: fetchReview});

  const renderReviewItem: ListRenderItem<IReviewAnotherItem> = ({
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
        data={salonComments || []}
        renderItem={renderReviewItem}
        keyExtractor={(__, index) => `${index}`}
        contentContainerStyle={styles.contentContainerStyle}
        ListEmptyComponent={
          <ListEmptyComponent
            image={APP_IMAGES.icNoData}
            title={'Chưa có dữ liệu'}
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
