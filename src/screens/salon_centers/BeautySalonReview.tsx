import {useRoute} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  Image,
  Modal,
  Platform,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import ButtonAwareKeyboard from '../../components/ButtonAwareKeyboard';
import KeyboardContainer from '../../components/KeyboardContainer';
import SalonCard from '../../components/SalonCard';
import Text from '../../components/Text';
import {APP_COLORS} from '../../themes/colors';
import {APP_IMAGES} from '../../themes/images';
import {HIT_SLOP, IS_ANDROID, SCREEN_WIDTH} from '../../utils/constants';

const IMAGES = [APP_IMAGES.icAvatar, APP_IMAGES.icAvatar, APP_IMAGES.icAvatar];

const BeautySalonReview: React.FC<IBeautySalonReview> = () => {
  const route = useRoute<any>();
  const {item} = route?.params;
  const [reviewValue, setReviewValue] = useState('');
  const [images, setImages] = useState(IMAGES || []);
  const [isModalVisible, setModalVisible] = useState(false);

  const handleTextChange = (text: string) => {
    setReviewValue(text);
  };

  const removeImage = (index: number) => {
    let currentImages = [...images];
    currentImages.splice(index, 1);
    setImages([...currentImages]);
    // formik.setFieldValue('images', images);
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const closeModal = () => {
    setModalVisible(false);
  };
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardContainer style={styles.keyboardContainer}>
        <SalonCard item={item} />

        <View style={styles.inputReview}>
          <Text type={'bold-16'}>
            Nội dung góp ý, đánh giá
            <Text type={'bold-16'} color={APP_COLORS.errorDefault}>
              {' '}
              *
            </Text>
          </Text>
          <View style={styles.inputView}>
            <TextInput
              onChangeText={handleTextChange}
              multiline
              placeholder="Vui lòng nhập nội dung mà bạn muốn góp ý, đánh giá về cơ sở này"
              placeholderTextColor={APP_COLORS.placeholderText}
              style={styles.input}
            />
            <Text style={styles.numberCharacter}>
              {reviewValue?.length}/255
            </Text>
          </View>
          {images.length > 0 && (
            <View style={styles.imageReviewView}>
              {images.map((image, i) => {
                return (
                  <View style={styles.imageView}>
                    <Image source={image} style={styles.imageReview} key={i} />
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
      </KeyboardContainer>
      <ButtonAwareKeyboard label={'Gửi'} onPress={toggleModal} />
      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={toggleModal}>
        <TouchableOpacity style={styles.modalContainer} onPress={closeModal}>
          <View style={styles.modalView}>
            <Image source={APP_IMAGES.icFails} />
            <Text color={APP_COLORS.white} type="bold-18">
              Thông báo
            </Text>
            <Text
              color={APP_COLORS.white}
              textAlign="center"
              style={styles.modalMessage}>
              Gửi góp ý, đánh giá không thành công. Vui lòng thử lại.
            </Text>
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
};

export default BeautySalonReview;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardContainer: {
    padding: 12,
  },
  avatar: {
    width: 56,
    height: 56,
    marginRight: 12,
  },
  nameAddressView: {
    flex: 1,
  },
  reviewView: {
    flexDirection: 'row',
    marginVertical: 8,
  },
  nameText: {
    lineHeight: 24,
  },
  icLocation: {
    width: 18,
    height: 18,
    marginRight: 7,
  },
  addressView: {
    flexDirection: 'row',
    marginTop: 8,
  },
  FormattedAddressTxt: {
    flex: 1,
  },

  inputReview: {
    marginTop: 18,
    padding: 12,
    width: SCREEN_WIDTH - 36,
    backgroundColor: APP_COLORS.white,
    borderRadius: 12,
    overflow: IS_ANDROID ? 'hidden' : undefined,
    borderWidth: 1,
    borderColor: APP_COLORS.greyL6,
    shadowColor: APP_COLORS.shadowColor,
    shadowOffset: {width: 1, height: 2},
    shadowOpacity: 1,
    shadowRadius: 5,
    marginBottom: 20,
    ...Platform.select({
      android: {
        elevation: 3,
      },
    }),
  },
  inputView: {
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
  input: {
    marginBottom: 30,
  },
  textInputView: {},
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: 'rgba(36, 31, 31, 0.78)',
    padding: 12,
    borderRadius: 10,
    width: SCREEN_WIDTH - 100,
    alignItems: 'center',
  },
  modalMessage: {
    width: SCREEN_WIDTH / 2,
    lineHeight: 22,
  },
});