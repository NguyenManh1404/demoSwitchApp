import React from 'react';
import {Image, Modal, StyleSheet, TouchableOpacity, View} from 'react-native';
import {APP_COLORS} from '../themes/colors';
import {APP_IMAGES} from '../themes/images';
import {ACTION_ITEM, HIT_SLOP} from '../utils/constants';
import Text from './Text';

const BottomActionSheet: React.FC<IBottomActionSheetProp> = ({
  isVisible,
  onClose,
  onActionPress,
  filterSelected,
}) => {
  const handlePress = (item: IActionSheetItem) => {
    onActionPress(item);
    onClose();
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={onClose}
        style={styles.modalContainer}>
        <View style={styles.actionSheetContainer}>
          <View style={styles.actionSheetHeader}>
            <View style={styles.viewTamp} />
            <Text type={'bold-18'}>Loại cơ sở</Text>
            <TouchableOpacity onPress={onClose} hitSlop={HIT_SLOP}>
              <Image source={APP_IMAGES.icCloseModal} />
            </TouchableOpacity>
          </View>
          {ACTION_ITEM.map((item, index) => {
            const isSelected = filterSelected?.id === item?.id;
            return (
              <TouchableOpacity
                onPress={() => handlePress(item)}
                key={index}
                hitSlop={HIT_SLOP}>
                <Text
                  style={styles.actionSheetItem}
                  type={isSelected ? 'bold-14' : 'regular-14'}
                  color={isSelected ? APP_COLORS.primary : APP_COLORS.neutral2}>
                  {item?.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default BottomActionSheet;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: APP_COLORS.actionSheetModal,
  },
  actionSheetContainer: {
    backgroundColor: APP_COLORS.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 16,
  },
  actionSheetItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: APP_COLORS.border,
  },
  actionSheetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  viewTamp: {
    width: 14,
    height: 14,
  },
});
