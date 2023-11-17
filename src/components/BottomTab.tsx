import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  Image,
  ImageSourcePropType,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {HomeScreenNavigationProp} from '../navigation/type';
import {APP_COLORS} from '../themes/colors';
import {APP_IMAGES} from '../themes/images';
import Text from './Text';

interface ITabBarItem {
  title: string;
  logo: ImageSourcePropType;
  color: string;
  onPress: () => void;
}

const TabBarItem = ({title, logo, color, onPress}: ITabBarItem) => {
  return (
    <TouchableOpacity style={styles.tabBarItem} onPress={onPress}>
      <Image source={logo} style={styles.icon} />
      <Text numberOfLines={2} color={color} textAlign="center">
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const BottomTab = () => {
  const {navigate} = useNavigation<HomeScreenNavigationProp>();

  const navigateToSalonCenter = () => {
    navigate('SalonCentre');
  };

  const navigateToDocument = () => {
    navigate('Document');
  };

  return (
    <SafeAreaView style={styles.container}>
      <TabBarItem
        title="Bản đồ"
        logo={APP_IMAGES.icLocation}
        color={APP_COLORS.primary}
        onPress={() => {}}
      />
      <TabBarItem
        title="Cở sở thẩm mỹ"
        logo={APP_IMAGES.icBuilding}
        color={APP_COLORS.gray2}
        onPress={navigateToSalonCenter}
      />
      <TabBarItem
        title="Văn bản quy định"
        logo={APP_IMAGES.icDocument}
        color={APP_COLORS.gray2}
        onPress={navigateToDocument}
      />
    </SafeAreaView>
  );
};

export default BottomTab;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 18,
    paddingVertical: 16,
  },
  icon: {
    width: 24,
    height: 24,
    marginBottom: 6,
  },
  tabBarItem: {
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 24,
  },
});
