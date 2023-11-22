import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import ButtonAwareKeyboard from '../../components/ButtonAwareKeyboard';
import KeyboardContainer from '../../components/KeyboardContainer';
import EvaluateAnotherSalonCard from '../../components/SalonCentre/EvaluateAnotherSalonCard';

const EvaluateAnotherSalon: React.FC<EvaluateAnotherSalonProps> = ({}) => {
  const {navigate} = useNavigation<HomeScreenNavigationProp>();
  const EvaluateAnotherSalonForm = () => {
    navigate('EvaluateAnotherSalonForm', {});
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardContainer style={styles.keyboardContainer}>
        <EvaluateAnotherSalonCard />
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
