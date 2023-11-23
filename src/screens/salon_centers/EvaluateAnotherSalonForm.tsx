import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {
  Image,
  Platform,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import KeyboardContainer from '../../components/KeyboardContainer';
import InputEvaluate from '../../components/SalonCentre/InputEvaluate';
import Text from '../../components/Text';
import {APP_COLORS} from '../../themes/colors';
import {APP_IMAGES} from '../../themes/images';
import {HIT_SLOP, IS_ANDROID, SCREEN_WIDTH} from '../../utils/constants';

const IMAGES = [APP_IMAGES.icAvatar, APP_IMAGES.icAvatar, APP_IMAGES.icAvatar];

type EvaluateAnotherSalonFormProps = NativeStackScreenProps<
  RootStackParamList,
  'EvaluateAnotherSalonForm'
>;

const EvaluateAnotherSalonForm = ({}: EvaluateAnotherSalonFormProps) => {
  const [content, setContent] = useState('');
  const [images, setImages] = useState(IMAGES || []);

  const handleTextChange = (text: string) => {
    setContent(text);
  };

  const removeImage = (index: number) => {
    let currentImages = [...images];
    currentImages.splice(index, 1);
    setImages([...currentImages]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardContainer style={styles.keyboardContainer}>
        <View style={styles.formCard}>
          <View style={styles.titleView}>
            <Text type="bold-16" style={styles.titleTxt}>
              Thông tin người đánh giá
            </Text>
            <Text type="regular-12"> Thông tin người đánh giá sẽ được ẩn</Text>
          </View>

          <View>
            <InputEvaluate
              placeholder={'Tên người đánh giá *'}
              onChangeText={() => {}}
              value={''}
            />
            <InputEvaluate
              placeholder={'Số điện thoại *'}
              onChangeText={() => {}}
              value={''}
            />
            <InputEvaluate
              placeholder={'Địa chỉ người đánh giá *'}
              onChangeText={() => {}}
              value={''}
            />
          </View>
          <View style={styles.titleView}>
            <Text type="bold-16" style={styles.titleTxt}>
              Thông tin cơ sở
            </Text>
          </View>
          <View>
            <InputEvaluate
              placeholder={'Tên cơ sở *'}
              onChangeText={() => {}}
              value={''}
            />
            <InputEvaluate
              placeholder={'Địa chỉ cơ sở *'}
              onChangeText={() => {}}
              value={''}
            />

            <View style={styles.inputContent}>
              <TextInput
                onChangeText={handleTextChange}
                multiline
                placeholder="Vui lòng nhập nội dung mà bạn muốn góp ý, đánh giá về cơ sở này"
                placeholderTextColor={APP_COLORS.placeholderText}
                style={styles.inputMultiline}
              />
              <Text style={styles.numberCharacter}>{content?.length}/255</Text>
            </View>

            {images.length > 0 && (
              <View style={styles.imageReviewView}>
                {images.map((image, i) => {
                  return (
                    <View style={styles.imageView} key={i}>
                      <Image source={image} style={styles.imageReview} />
                      <TouchableOpacity
                        hitSlop={HIT_SLOP}
                        style={styles.icCloseBtn}
                        onPress={() => removeImage(i)}>
                        <Image source={APP_IMAGES.icClose} />
                      </TouchableOpacity>
                    </View>
                  );
                })}
              </View>
            )}
            <TouchableOpacity onPress={() => {}} style={styles.uploadImageBtn}>
              <Image source={APP_IMAGES.icUpload} style={styles.icUpload} />
              <Text>Tải hình ảnh</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardContainer>
    </SafeAreaView>
  );
};

export default EvaluateAnotherSalonForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardContainer: {
    padding: 12,
  },
  formCard: {
    padding: 12,
    backgroundColor: APP_COLORS.white,
    borderRadius: 12,
    overflow: IS_ANDROID ? 'hidden' : undefined,
    borderWidth: 1,
    borderColor: APP_COLORS.greyL6,
    shadowColor: APP_COLORS.shadowColor,
    shadowOffset: {width: 1, height: 2},
    shadowOpacity: 1,
    shadowRadius: 5,
    width: SCREEN_WIDTH - 36,
    ...Platform.select({
      android: {
        elevation: 3,
      },
    }),
  },
  textInputStyle: {
    padding: 8,
    borderColor: APP_COLORS.borderInput,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 12,
  },
  titleView: {
    marginBottom: 12,
  },
  titleTxt: {
    lineHeight: 22,
  },
  inputContent: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    marginVertical: 18,
    borderColor: APP_COLORS.borderInput,
    minHeight: 107,
    lineHeight: 20,
  },
  numberCharacter: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    marginTop: 10,
    color: APP_COLORS.placeholderText,
  },
  inputMultiline: {
    marginBottom: 30,
  },
  imageReviewView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  imageReview: {
    width: 66,
    height: 66,
  },
  imageView: {
    marginRight: 12,
  },
  icCloseBtn: {
    position: 'absolute',
    backgroundColor: APP_COLORS.white,
    padding: 2,
    borderRadius: 10,
    right: 4,
    top: 4,
  },
  uploadImageBtn: {
    flexDirection: 'row',
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: APP_COLORS.borderInput,
    width: SCREEN_WIDTH / 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icUpload: {
    marginRight: 4,
  },
});
