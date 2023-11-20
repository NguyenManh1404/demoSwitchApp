import React from 'react';
import {StyleSheet, View} from 'react-native';

const Document: React.FC<DocumentProps> = ({}) => {
  return <View style={styles.container} />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Document;
