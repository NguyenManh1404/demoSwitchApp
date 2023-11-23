import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import ButtonAwareKeyboard from '../../components/ButtonAwareKeyboard';
import KeyboardContainer from '../../components/KeyboardContainer';

type EvaluateAnotherSalonProps = NativeStackScreenProps<
  RootStackParamList,
  'EvaluateAnotherSalon'
>;

const EvaluateAnotherSalon = ({navigation}: EvaluateAnotherSalonProps) => {
  const EvaluateAnotherSalonForm = () => {
    navigation.navigate('EvaluateAnotherSalonForm', {});
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardContainer style={styles.keyboardContainer}>
        {/* <EvaluateAnotherSalonCard /> */}
      </KeyboardContainer>
      <ButtonAwareKeyboard
        label={'Gửi đánh giá'}
        onPress={EvaluateAnotherSalonForm}
      />
    </SafeAreaView>
  );
};

export default EvaluateAnotherSalon;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardContainer: {
    padding: 12,
  },
});
