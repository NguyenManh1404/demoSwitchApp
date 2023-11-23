import React from 'react';
import {Image, SafeAreaView, StyleSheet, TouchableOpacity} from 'react-native';
import {APP_COLORS} from '../themes/colors';
import {APP_IMAGES} from '../themes/images';
import Text from './Text';

const TabBarItem: React.FC<ITabBarItem> = ({title, logo, color, onPress}) => {
  return (
    <TouchableOpacity style={styles.tabBarItem} onPress={onPress}>
      <Image source={logo} style={styles.icon} />
      <Text numberOfLines={2} color={color} textAlign="center">
        {title}
      </Text>
    </TouchableOpacity>
  );
};

type BottomTabProps = {
  onMoveToSalon?: () => void;
  onMoveToDocument?: () => void;
};

const BottomTab = ({onMoveToDocument, onMoveToSalon}: BottomTabProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <TabBarItem
        title="Bản đồ"
        logo={APP_IMAGES.icLocation}
        color={APP_COLORS.primary}
      />
      <TabBarItem
        title="Cở sở thẩm mỹ"
        logo={APP_IMAGES.icBuilding}
        color={APP_COLORS.gray2}
        onPress={onMoveToSalon}
      />
      <TabBarItem
        title="Văn bản quy định"
        logo={APP_IMAGES.icDocument}
        color={APP_COLORS.gray2}
        onPress={onMoveToDocument}
      />
    </SafeAreaView>
  );
};

export default BottomTab;

const styles = StyleSheet.create({
  container: {
    backgroundColor: APP_COLORS.white,
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
