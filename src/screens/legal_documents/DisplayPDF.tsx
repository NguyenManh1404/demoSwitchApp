import {useNavigation} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Pdf from 'react-native-pdf';
import {APP_COLORS} from '../../themes/colors';
import {APP_IMAGES} from '../../themes/images';
import {HIT_SLOP} from '../../utils/constants';
import congvan3501 from './files/congvan3501.pdf';

type DisplayPDFProps = NativeStackScreenProps<RootStackParamList, 'DisplayPDF'>;

const DisplayPDF: React.FC<DisplayPDFProps> = () => {
  const {goBack} = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.closeModalBtn}
        hitSlop={HIT_SLOP}
        onPress={goBack}>
        <Image source={APP_IMAGES.icClosePdf} tintColor={APP_COLORS.neutral2} />
      </TouchableOpacity>
      <Pdf
        source={congvan3501}
        trustAllCerts={Platform.OS === 'ios'}
        style={styles.pdf}
      />
    </View>
  );
};

export default DisplayPDF;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: APP_COLORS.white,
  },
  pdf: {
    flex: 1,
    backgroundColor: APP_COLORS.white,

    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  closeModalBtn: {
    alignSelf: 'flex-end',
    marginRight: 30,
    marginVertical: 15,
  },
});
