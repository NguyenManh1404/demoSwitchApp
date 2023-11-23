import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';

import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import BottomActionSheet from '../../components/BottomActionSheet';
import KeyboardContainer from '../../components/KeyboardContainer';
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
  SCREEN_WIDTH,
} from '../../utils/constants';

const BeautySalons: React.FC<BeautySalonsProps> = ({}) => {
  const {navigate} = useNavigation<HomeScreenNavigationProp>();
  const [filterSelected, setFilterSelected] = useState(ACTION_ITEM[0]);

  const [centres, setCenters] = useState<ISalonCenter[]>([]);
  const [searchText, setSearchText] = useState<string>(EMPTY_STRING);

  const salonCentreRef = firestore().collection('BeautySalons');

  useEffect(() => {
    const fetchCentres = async () => {
      try {
        let query: FirebaseFirestoreTypes.Query = salonCentreRef;

        switch (filterSelected.id) {
          case 2:
            query = query.where('IsClinic', '==', true);
            break;
          case 3:
            query = query
              .where('IsClinic', '==', false)
              .where('BusinessType', '==', 'Đã đủ điều kiện');
            break;
          case 4:
            query = query
              .where('IsClinic', '==', false)
              .where('BusinessType', '==', 'Chưa đủ điều kiện');
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

        if (searchText.length > 0) {
          const searchItems = await salonCentreData.filter(e =>
            normalizeString(e.BusinessName.toLowerCase()).includes(
              normalizeString(searchText.toLowerCase()),
            ),
          );
          setCenters(searchItems);
        } else {
          setCenters(salonCentreData);
        }
      } catch (error) {}
    };

    fetchCentres();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterSelected.id, searchText]);

  useHeaderOptions({
    options: {
      headerTitle: `Cơ sở thẩm mỹ (${centres?.length})`,
    },
  });

  const navigateToEvaluateAnotherSalon = () => {
    navigate('EvaluateAnotherSalon');
  };
  const navigateToSalonDetail = (item: ISalonCenter) => {
    navigate('BeautySalonDetail', {item: item});
  };

  const renderItem = ({item, index}: {item: ISalonCenter; index: number}) => {
    return (
      <SalonCard
        key={index}
        item={item}
        index={index}
        onPress={navigateToSalonDetail}
        isShowValuation={true}
      />
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
    // Clear the input value
    setSearchText(EMPTY_STRING);
  };

  return (
    <SafeAreaView style={styles.container}>
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
        <TouchableOpacity style={styles.filterBtn} onPress={showActionSheet}>
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
      <KeyboardContainer style={styles.keyboardContainer}>
        <TouchableOpacity
          style={styles.anotherSalonBtn}
          onPress={navigateToEvaluateAnotherSalon}>
          <Text type="bold-16">Đánh giá về cơ sở khác</Text>
          <Image source={APP_IMAGES.icChevronRight} />
        </TouchableOpacity>

        <FlatList
          data={centres || []}
          renderItem={renderItem}
          scrollEnabled={false}
        />
        <BottomActionSheet
          isVisible={isActionSheetVisible}
          onClose={hideActionSheet}
          onActionPress={handleActionPress}
          filterSelected={filterSelected}
        />
      </KeyboardContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  SalonCard: {
    marginBottom: 12,
  },
  container: {
    flex: 1,
  },
  keyboardContainer: {
    paddingHorizontal: 18,
  },
  anotherSalonBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: APP_COLORS.white,
    padding: 12,
    borderRadius: 12,
    marginBottom: 18,
  },
  searchAndFilter: {
    flexDirection: 'row',
    margin: 18,
  },
  searchView: {
    width: SCREEN_WIDTH / 2 + 20,
    borderWidth: 1,
    padding: 12,
    flexDirection: 'row',
    borderRadius: 8,
    borderColor: APP_COLORS.borderInputSearch,
    backgroundColor: APP_COLORS.white,
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
    flex: 1,
  },
  filterTxt: {
    flex: 1,
  },
});

export default BeautySalons;
