import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet, View} from 'react-native';

type DocumentProps = NativeStackScreenProps<RootStackParamList, 'Document'>;

const Document = ({}: DocumentProps) => {
  return <View style={styles.container} />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Document;
