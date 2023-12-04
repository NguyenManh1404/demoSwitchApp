import firestore from '@react-native-firebase/firestore';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useCallback, useEffect, useRef, useState} from 'react';
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
  const [actuallyComments, setActuallyComments] = useState<number>(0);
  const [isLoading, setLoading] = useState<boolean>(false);

  const flatListRef = useRef<FlatList<IReviewAnotherItem> | null>(null);

  const fetchReview = useCallback(async () => {
    try {
      setLoading(true);
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

      setActuallyComments(salonCentreData?.length);

      const sortData = salonCentreData.sort(
        (a, b) => b.createdAt.seconds - a.createdAt.seconds,
      );

      setSalonComments(sortData.slice(0, 10));
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReview();
  }, [fetchReview]);

  useRefreshOnFocus({
    refetch: () => {
      fetchReview();
      scrollToIndex();
    },
  });

  const EvaluateAnotherSalonForm = () => {
    navigation.navigate('EvaluateAnotherSalonForm', {
      title: 'Gửi góp ý, đánh giá',
      commentLength: actuallyComments,
    });
  };

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

  const scrollToIndex = (offset = 0) => {
    flatListRef.current?.scrollToOffset({offset, animated: true});
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={salonComments || []}
        renderItem={renderReviewItem}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        contentContainerStyle={styles.contentContainerStyle}
        ListEmptyComponent={
          <ListEmptyComponent
            image={APP_IMAGES.icNoData}
            title={'Chưa có dữ liệu'}
            loading={isLoading}
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
