import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {APP_COLORS} from '../../themes/colors';
import {HIT_SLOP} from '../../utils/constants';
import Text from '../Text';

const ActionItem: React.FC<IActionItem> = ({
  item,
  isSelected,
  index,
  onPress,
}) => {
  const handlePress = () => {
    onPress?.(item);
  };
  return (
    <TouchableOpacity onPress={handlePress} key={index} hitSlop={HIT_SLOP}>
      <Text
        style={styles.actionSheetItem}
        type={isSelected ? 'bold-14' : 'regular-14'}
        color={isSelected ? APP_COLORS.primary : APP_COLORS.neutral2}>
        {item?.name}
      </Text>
    </TouchableOpacity>
  );
};

export default ActionItem;

const styles = StyleSheet.create({
  actionSheetItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: APP_COLORS.border,
  },
});
