import React from 'react';
import {StyleSheet, View} from 'react-native';
import {APP_COLORS} from '../../themes/colors';
import Text from '../Text';

const InfoDetailSalonItem: React.FC<IInfoDetailSalonItem> = ({
  title,
  content,
}) => {
  return (
    <View style={styles.infoDetailSalonView}>
      <Text type="semiBold-16">{title}</Text>
      <Text color={APP_COLORS.neutral2} style={styles.detailItemTxt}>
        {content}
      </Text>
    </View>
  );
};

export default InfoDetailSalonItem;

const styles = StyleSheet.create({
  infoDetailSalonView: {
    marginBottom: 12,
  },
  detailItemTxt: {
    marginTop: 4,
    lineHeight: 22,
  },
});
