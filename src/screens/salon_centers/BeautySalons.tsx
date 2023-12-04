import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';

import {DefaultTheme} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useRef, useState} from 'react';
import {
  FlatList,
  Image,
  ListRenderItem,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import BottomActionSheet from '../../components/BottomActionSheet';
import HeaderRightButton from '../../components/HeaderRightButton';
import InfoModal from '../../components/InfoModal';
import ListEmptyComponent from '../../components/ListEmptyComponent';
import SalonCard from '../../components/SalonCard';
import Text from '../../components/Text';
import {useHeaderOptions} from '../../hooks/useHeaderOptions';
import {APP_COLORS} from '../../themes/colors';
import {normalizeString} from '../../themes/helpers';
import {APP_IMAGES} from '../../themes/images';
import {
  ACTION_ITEM,
  EMPTY_STRING,
  HIT_SLOP,
  QUALIFIED,
  SCREEN_WIDTH,
  UNQUALIFIED,
} from '../../utils/constants';

type BeautySalonsProps = NativeStackScreenProps<
  RootStackParamList,
  'BeautySalons'
>;

const BeautySalons = ({navigation}: BeautySalonsProps) => {
  const [filterSelected, setFilterSelected] = useState(ACTION_ITEM[0]);

  const flatListRef = useRef<FlatList<ISalonCenter> | null>(null);

  const [centres, setCenters] = useState<ISalonCenter[]>([]);
  const [searchText, setSearchText] = useState<string>(EMPTY_STRING);
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);

  const salonCentreRef = firestore().collection('BeautySalons');

  useEffect(() => {
    const fetchCentres = async () => {
      try {
        setLoading(true);
        let query: FirebaseFirestoreTypes.Query = salonCentreRef;

        switch (filterSelected.id) {
          case 2:
            query = query.where('IsClinic', '==', true);
            break;
          case 3:
            query = query
              .where('IsClinic', '==', false)
              .where('BusinessType', '==', QUALIFIED);
            break;
          case 4:
            query = query
              .where('IsClinic', '==', false)
              .where('BusinessType', '==', UNQUALIFIED);
            break;
          default:
            break;
        }

        const querySnapshot = await query.get();

        const salonCentreData: ISalonCenter[] = [];
        querySnapshot.forEach(documentSnapshot => {
          salonCentreData.push({
            id: documentSnapshot.id,
            ...documentSnapshot.data(),
          } as ISalonCenter);
        });

        if (filterSelected?.id === 1) {
          salonCentreData.sort((a, b) => {
            if (a.BusinessType === QUALIFIED && b.BusinessType !== QUALIFIED) {
              return -1; // a comes first
            } else if (
              a.BusinessType !== QUALIFIED &&
              b.BusinessType === QUALIFIED
            ) {
              return 1; // b comes first
            } else {
              return 0; // no change in order
            }
          });
        }

        if (searchText?.length > 0) {
          const searchItems = salonCentreData?.filter(e =>
            normalizeString(e.BusinessName.toLowerCase()).includes(
              normalizeString(searchText.toLowerCase()),
            ),
          );
          setCenters(searchItems);
        } else {
          setCenters(salonCentreData);
        }
        scrollToIndex();
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    fetchCentres();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterSelected.id, searchText]);

  const scrollToIndex = (offset = 0) => {
    // flatListRef.current.scrollToIndex({index, animated: true});
    flatListRef.current?.scrollToOffset({offset, animated: true});
  };

  useHeaderOptions({
    options: {
      headerTitle: `Cơ sở thẩm mỹ (${centres?.length})`,
      // eslint-disable-next-line react/no-unstable-nested-components
      headerRight: () => <HeaderRightButton onPress={toggleModal} />,
    },
  });

  const navigateToEvaluateAnotherSalon = () => {
    navigation.navigate('EvaluateAnotherSalon', {
      title: 'Đánh giá về cơ sở khác',
    });
  };
  const navigateToSalonDetail = (item: ISalonCenter) => {
    navigation.navigate('BeautySalonDetail', {item: item});
  };

  const renderItem: ListRenderItem<ISalonCenter> = ({item, index}) => {
    return (
      <View key={index} style={styles.salonItemContainer}>
        <SalonCard
          item={item}
          index={index}
          onPress={navigateToSalonDetail}
          isShowValuation={true}
        />
      </View>
    );
  };

  const [isActionSheetVisible, setActionSheetVisible] = useState(false);

  const showActionSheet = () => {
    setActionSheetVisible(true);
  };

  const hideActionSheet = () => {
    setActionSheetVisible(false);
  };

  const handleActionPress = (item: IActionSheetItem) => {
    setFilterSelected(item);
  };

  const onChangeText = (text: string) => {
    setSearchText(text);
  };

  const handleClear = () => {
    setSearchText(EMPTY_STRING);
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.flex}>
      <FlatList
        ref={flatListRef}
        data={centres || []}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        stickyHeaderIndices={[0]}
        contentContainerStyle={styles.contentContainerStyle}
        ListEmptyComponent={
          <ListEmptyComponent
            image={APP_IMAGES.icSearchNoResult}
            title={'Rất tiếc, không có dữ liệu hiển thị'}
            containerStyle={styles.listEmptyComponentStyle}
            loading={isLoading}
          />
        }
        ListHeaderComponent={
          <View style={styles.headerContainer}>
            <View style={styles.searchAndFilter}>
              <View style={styles.searchView}>
                <Image source={APP_IMAGES.icSearch} style={styles.icSearch} />
                <TextInput
                  onChangeText={text => onChangeText(text)}
                  placeholder="Tìm kiếm cơ sở thẩm mỹ"
                  placeholderTextColor={APP_COLORS.placeholderText}
                  style={styles.textInput}
                  value={searchText}
                />
                {searchText.length > 0 && (
                  <TouchableOpacity onPress={handleClear} hitSlop={HIT_SLOP}>
                    <Image source={APP_IMAGES.icCloseText} />
                  </TouchableOpacity>
                )}
              </View>
              <TouchableOpacity
                style={styles.filterBtn}
                onPress={showActionSheet}>
                <Text
                  type="bold-12"
                  color={APP_COLORS.primary}
                  numberOfLines={1}
                  style={styles.filterTxt}>
                  {filterSelected?.name}
                </Text>
                <Image source={APP_IMAGES.icDown} />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.anotherSalonBtn}
              onPress={navigateToEvaluateAnotherSalon}>
              <Text type="bold-16">Đánh giá về cơ sở khác</Text>
              <Image source={APP_IMAGES.icChevronRight} />
            </TouchableOpacity>
          </View>
        }
      />

      <SafeAreaView />
      <BottomActionSheet
        isVisible={isActionSheetVisible}
        onClose={hideActionSheet}
        onActionPress={handleActionPress}
        filterSelected={filterSelected}
      />
      <InfoModal
        isModalVisible={isModalVisible}
        toggleModal={toggleModal}
        closeModal={closeModal}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  contentContainerStyle: {
    flexGrow: 1,
  },

  listEmptyComponentStyle: {
    marginBottom: 150,
  },
  anotherSalonBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: APP_COLORS.white,
    padding: 12,
    borderRadius: 12,
    marginTop: 18,
  },
  searchAndFilter: {
    flexDirection: 'row',
  },
  searchView: {
    width: SCREEN_WIDTH / 2 + 20,
    borderWidth: 1,
    padding: 12,
    flexDirection: 'row',
    borderRadius: 8,
    borderColor: APP_COLORS.borderInputSearch,
    backgroundColor: APP_COLORS.white,
    alignItems: 'center',
  },
  icSearch: {
    marginRight: 8,
  },
  filterBtn: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 10,
    backgroundColor: APP_COLORS.white,
    padding: 11,
    borderRadius: 8,
  },
  textInput: {
    paddingVertical: 0,
    flex: 1,
  },
  filterTxt: {
    flex: 1,
  },
  headerContainer: {
    padding: 18,
    backgroundColor: DefaultTheme.colors.background,
  },
  salonItemContainer: {
    alignItems: 'center',
  },
});

export default BeautySalons;
