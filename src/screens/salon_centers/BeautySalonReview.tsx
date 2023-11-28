import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {
  Image,
  Linking,
  Modal,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import ImagePicker, {PickerErrorCode} from 'react-native-image-crop-picker';
import ButtonAwareKeyboard from '../../components/ButtonAwareKeyboard';
import KeyboardContainer from '../../components/KeyboardContainer';
import SalonCard from '../../components/SalonCard';
import Text from '../../components/Text';
import {APP_COLORS} from '../../themes/colors';
import {APP_IMAGES} from '../../themes/images';
import {
  EMPTY_STRING,
  HIT_SLOP,
  IS_ANDROID,
  SCREEN_WIDTH,
} from '../../utils/constants';
type BeautySalonReviewProps = NativeStackScreenProps<
  RootStackParamList,
  'BeautySalonReview'
>;

type ImageError = {code: PickerErrorCode};

const BeautySalonReview = ({route, navigation}: BeautySalonReviewProps) => {
  const {item} = route?.params;
  const [isModalVisible, setModalVisible] = useState<boolean>(false);

  const [uploadSuccess, setUploadSuccess] = useState<boolean>(true);

  const {
    control,
    handleSubmit,
    formState: {errors},
    setValue,
    watch,
  } = useForm<IReviewSalon>({
    defaultValues: {
      idSalon: item?.id,
      idReview: new Date().getTime(),
      title: EMPTY_STRING,
      content: EMPTY_STRING,
      images: [],
      createdAt: firestore.FieldValue.serverTimestamp(),
    },
  });

  const content = watch('content');
  const images = watch('images');

  const isAddImage = images?.length >= 3;

  const onSubmit = async (data: IReviewSalon) => {
    const commentRef = firestore().collection('BeautySalonComments');

    try {
      await commentRef.add(data);
      setUploadSuccess(true);
      toggleModal();
      setTimeout(() => {
        navigation.goBack();
      }, 2000);
    } catch (error) {
      setUploadSuccess(false);
      toggleModal();
    }
  };

  const pickImage = async () => {
    try {
      const image = await ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
      });

      const imageRef = `reviews/${new Date().getTime()}`;

      if (image.path) {
        const response = await storage().ref(imageRef).putFile(image.path);
        if (response) {
          const url = await storage().ref(imageRef).getDownloadURL();

          let currentImages = [...images];

          currentImages.push(url);

          setValue('images', [...currentImages]);
        }
      }
      // Update the state with the selected image URI
    } catch (error: unknown) {
      const knownError = error as ImageError;
      switch (knownError.code) {
        case 'E_NO_LIBRARY_PERMISSION':
          Linking.openSettings();
          break;

        default:
          break;
      }
    }
  };

  const removeImage = (index: number) => {
    let currentImages = [...images];
    currentImages.splice(index, 1);
    setValue('images', [...currentImages]);
  };

  const toggleModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <KeyboardContainer contentContainerStyle={styles.keyboardContainer}>
        <SalonCard item={item} />
        <View style={styles.inputReview}>
          <Text type={'bold-16'} style={styles.titleTxt}>
            Nội dung góp ý, đánh giá
            <Text type={'bold-16'} color={APP_COLORS.errorDefault}>
              {' '}
              *
            </Text>
          </Text>
          <View style={styles.inputView}>
            <Controller
              name="title"
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  placeholderTextColor={
                    errors?.title
                      ? APP_COLORS.errorDefault
                      : APP_COLORS.placeholderText
                  }
                  placeholder="Tiêu đề *"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
          </View>
          <View style={styles.inputView}>
            <TextInput
              editable={false}
              placeholderTextColor={APP_COLORS.placeholderText}
              defaultValue={item?.FormattedAddress}
              multiline
            />
          </View>

          <View style={styles.multilineInputView}>
            <Controller
              name="content"
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  multiline
                  maxLength={255}
                  placeholder="Vui lòng nhập nội dung mà bạn muốn góp ý, đánh giá về cơ sở này *"
                  placeholderTextColor={
                    errors?.content
                      ? APP_COLORS.errorDefault
                      : APP_COLORS.placeholderText
                  }
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />

            <Text style={styles.numberCharacter}>{content?.length}/255</Text>
          </View>
          {images.length > 0 && (
            <View style={styles.imageReviewView}>
              {images.map((image, i) => {
                return (
                  <View style={styles.imageView} key={i}>
                    <Image source={{uri: image}} style={styles.imageReview} />
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

          <TouchableOpacity
            style={styles.uploadImageBtn}
            onPress={pickImage}
            disabled={isAddImage ? true : false}>
            <Image
              source={APP_IMAGES.icUpload}
              style={styles.icUpload}
              tintColor={
                isAddImage ? APP_COLORS.borderInput : APP_COLORS.blackText
              }
            />
            <Text
              color={
                isAddImage ? APP_COLORS.borderInput : APP_COLORS.blackText
              }>
              Tải hình ảnh
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardContainer>
      <ButtonAwareKeyboard label={'Gửi'} onPress={handleSubmit(onSubmit)} />
      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={toggleModal}>
        <TouchableOpacity style={styles.modalContainer} onPress={closeModal}>
          <View style={styles.modalView}>
            <Image
              source={
                uploadSuccess ? APP_IMAGES.icModalCheck : APP_IMAGES.icFails
              }
            />
            <Text color={APP_COLORS.white} type="bold-18">
              Thông báo
            </Text>
            <Text
              color={APP_COLORS.white}
              textAlign="center"
              style={styles.modalMessage}>
              {uploadSuccess
                ? ' Cảm ơn bạn đã góp ý, đánh giá'
                : 'Gửi góp ý, đánh giá không thành công. Vui lòng thử lại.'}
            </Text>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default BeautySalonReview;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardContainer: {
    padding: 12,
    alignItems: 'center',
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
    borderColor: APP_COLORS.borderInput,
    lineHeight: 20,
    marginBottom: 12,
  },
  multilineInputView: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    marginBottom: 18,
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
    borderRadius: 4,
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
    backgroundColor: APP_COLORS.modalBackground,
    padding: 12,
    borderRadius: 10,
    width: SCREEN_WIDTH - 100,
    alignItems: 'center',
  },
  modalMessage: {
    width: SCREEN_WIDTH / 1.5,
    lineHeight: 22,
  },
  titleTxt: {
    marginBottom: 20,
  },
});
