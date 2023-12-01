import firestore from '@react-native-firebase/firestore';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import React, {useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {
  Image,
  Modal,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {handleSyncReview} from '../../api/syncReview';
import ButtonAwareKeyboard from '../../components/ButtonAwareKeyboard';
import KeyboardContainer from '../../components/KeyboardContainer';
import InputEvaluate from '../../components/SalonCentre/InputEvaluate';
import Text from '../../components/Text';
import {useMediaPicker} from '../../hooks/useMediaPicker';
import {APP_COLORS} from '../../themes/colors';
import {APP_IMAGES} from '../../themes/images';
import {
  EMPTY_STRING,
  HIT_SLOP,
  IS_ANDROID,
  SCREEN_WIDTH,
} from '../../utils/constants';

type EvaluateAnotherSalonFormProps = NativeStackScreenProps<
  RootStackParamList,
  'EvaluateAnotherSalonForm'
>;

const EvaluateAnotherSalonForm = ({
  navigation,
}: EvaluateAnotherSalonFormProps) => {
  const [isModalVisible, setModalVisible] = useState<boolean>(false);

  const [uploadSuccess, setUploadSuccess] = useState<boolean>(true);
  const {
    control,
    handleSubmit,
    formState: {errors},
    setValue,
    watch,
  } = useForm<IReviewAnotherItem>({
    defaultValues: {
      idReview: new Date().getTime(),
      reviewerName: EMPTY_STRING,
      reviewerPhone: EMPTY_STRING,
      reviewerAddress: EMPTY_STRING,
      title: EMPTY_STRING,
      salonName: EMPTY_STRING,
      salonAddress: EMPTY_STRING,
      content: EMPTY_STRING,
      images: [],
      createdAt: firestore.FieldValue.serverTimestamp(),
    },
  });

  const content = watch('content');
  const images = watch('images');

  const {pickImage} = useMediaPicker({
    setValue: setValue,
    imageState: images,
    imageFolderStorage: 'anotherSalonReviews',
  });

  const isAddImage = images?.length >= 3;

  const onSubmit = async (data: IReviewAnotherItem) => {
    const commentRef = firestore().collection('AnotherSalonComments');

    const formatImages = data?.images?.map(url => ({
      url: url,
    }));

    const syncReviewData = {
      linhVucId: '22', // hard code
      tenDayDu: data?.reviewerName,
      email: 'EmailHardCode', // hard code
      soDienThoai: data?.reviewerPhone,
      tieuDe: data?.title,
      noiDungYKien: data?.content,
      noiDienRa: data?.salonAddress,
      nguonGopY: 'SoKHDT', //hard code
      hinhAnhs: formatImages,
    };

    try {
      await commentRef.add(data);

      //syncReviewData with smart city

      await handleSyncReview({postData: syncReviewData});

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

  const onPickImage = async () => {
    pickImage();
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
        <View style={styles.formCard}>
          <View style={styles.titleView}>
            <Text type="bold-16" style={styles.titleTxt}>
              Thông tin người đánh giá
            </Text>
            <Text type="regular-12" color={APP_COLORS.neutral2}>
              Thông tin người đánh giá sẽ được bảo mật.
            </Text>
          </View>

          <View>
            <Controller
              name="reviewerName"
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <InputEvaluate
                  placeholder={'Tên người đánh giá *'}
                  onChangeText={onChange}
                  value={value}
                  onBlur={onBlur}
                  placeholderTextColor={
                    errors?.reviewerName
                      ? APP_COLORS.errorDefault
                      : APP_COLORS.placeholderText
                  }
                />
              )}
            />

            <Controller
              name="reviewerPhone"
              control={control}
              rules={{
                required: 'Vui lòng nhập số điện thoại',
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <>
                  <InputEvaluate
                    placeholder={'Số điện thoại *'}
                    onChangeText={onChange}
                    value={value}
                    onBlur={onBlur}
                    keyboardType="numeric"
                    placeholderTextColor={
                      errors?.reviewerPhone
                        ? APP_COLORS.errorDefault
                        : APP_COLORS.placeholderText
                    }
                  />
                </>
              )}
            />

            <Controller
              name="reviewerAddress"
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <InputEvaluate
                  placeholder={'Địa chỉ người đánh giá *'}
                  onChangeText={onChange}
                  value={value}
                  onBlur={onBlur}
                  placeholderTextColor={
                    errors?.reviewerAddress
                      ? APP_COLORS.errorDefault
                      : APP_COLORS.placeholderText
                  }
                />
              )}
            />
          </View>
          <View style={styles.titleView}>
            <Text type="bold-16" style={styles.titleTxt}>
              Thông tin cơ sở
            </Text>
          </View>
          <View>
            <Controller
              name="title"
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <InputEvaluate
                  maxLength={55}
                  placeholder={'Tiêu đề *'}
                  onChangeText={onChange}
                  value={value}
                  onBlur={onBlur}
                  placeholderTextColor={
                    errors?.title
                      ? APP_COLORS.errorDefault
                      : APP_COLORS.placeholderText
                  }
                />
              )}
            />
            <Controller
              name="salonName"
              control={control}
              render={({field: {onChange, onBlur, value}}) => (
                <InputEvaluate
                  placeholder={'Tên cơ sở'}
                  onChangeText={onChange}
                  value={value}
                  onBlur={onBlur}
                  placeholderTextColor={
                    errors?.salonName
                      ? APP_COLORS.errorDefault
                      : APP_COLORS.placeholderText
                  }
                />
              )}
            />

            <Controller
              name="salonAddress"
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <InputEvaluate
                  placeholder={'Địa chỉ cơ sở *'}
                  onChangeText={onChange}
                  value={value}
                  placeholderTextColor={
                    errors?.salonAddress
                      ? APP_COLORS.errorDefault
                      : APP_COLORS.placeholderText
                  }
                  onBlur={onBlur}
                />
              )}
            />

            <View style={styles.inputContent}>
              <Controller
                name="content"
                control={control}
                rules={{
                  required: true,
                }}
                render={({field: {onChange, onBlur, value}}) => (
                  <TextInput
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    multiline
                    maxLength={255}
                    placeholderTextColor={
                      errors?.content
                        ? APP_COLORS.errorDefault
                        : APP_COLORS.placeholderText
                    }
                    placeholder="Vui lòng nhập nội dung mà bạn muốn góp ý, đánh giá về cơ sở này *"
                    style={styles.inputMultiline}
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
              onPress={onPickImage}
              disabled={isAddImage}>
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
        </View>
      </KeyboardContainer>
      <ButtonAwareKeyboard label="Gửi" onPress={handleSubmit(onSubmit)} />
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

export default EvaluateAnotherSalonForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardContainer: {
    padding: 12,
    alignItems: 'center',
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
    marginBottom: 12,
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
});
