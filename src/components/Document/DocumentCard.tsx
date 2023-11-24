import React from 'react';
import {Linking, Platform, StyleSheet, TouchableOpacity} from 'react-native';
import {APP_COLORS} from '../../themes/colors';
import {IS_ANDROID, SCREEN_WIDTH} from '../../utils/constants';
import Text from '../Text';

const DocumentCard: React.FC<IDocumentCardProps> = ({item}) => {
  const openUrl = (link: string) => {
    Linking.openURL(link);
  };

  const handlePress = () => {
    openUrl(item?.Link);
  };

  return (
    <TouchableOpacity style={styles.documentCard} onPress={handlePress}>
      <Text type="bold-16">{item?.name}</Text>
      <Text style={styles.contentTxt} numberOfLines={3}>
        {item?.content}
      </Text>
    </TouchableOpacity>
  );
};

export default DocumentCard;

const styles = StyleSheet.create({
  documentCard: {
    flex: 1,
    padding: 12,
    backgroundColor: APP_COLORS.white,
    borderRadius: 12,
    overflow: IS_ANDROID ? 'hidden' : undefined,
    borderWidth: 1,
    width: SCREEN_WIDTH - 36,
    borderColor: APP_COLORS.greyL6,
    shadowColor: APP_COLORS.shadowColor,
    shadowOffset: {width: 1, height: 2},
    shadowOpacity: 1,
    shadowRadius: 5,
    marginBottom: 12,
    ...Platform.select({
      android: {
        elevation: 3,
      },
    }),
  },
  contentTxt: {
    lineHeight: 20,
  },
});
