import React from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import KeyboardContainer from '../../components/KeyboardContainer';
import Text from '../../components/Text';
import {useHeaderOptions} from '../../hooks/useHeaderOptions';
import {APP_COLORS} from '../../themes/colors';
import {APP_IMAGES} from '../../themes/images';
import {SCREEN_WIDTH} from '../../utils/constants';

const BeautySalons: React.FC<BeautySalonsProps> = ({}) => {
  const salonNumber = 0;

  useHeaderOptions({
    options: {
      headerTitle: `Cơ sở thẩm mỹ (${salonNumber})`,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchAndFilter}>
        <View style={styles.searchView}>
          <Image source={APP_IMAGES.icSearch} style={styles.icSearch} />
          <TextInput
            placeholder="Tìm kiếm cơ sở thẩm mỹ"
            placeholderTextColor={APP_COLORS.placeholderText}
            style={styles.textInput}
          />
        </View>
        <TouchableOpacity style={styles.filterBtn}>
          <Text type="bold-12" color={APP_COLORS.primary}>
            Tất cả
          </Text>
          <Image source={APP_IMAGES.icDown} />
        </TouchableOpacity>
      </View>
      <KeyboardContainer></KeyboardContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 18,
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
});

export default BeautySalons;
