import {Alert} from 'react-native';
import Config from 'react-native-config';

const roundByteToMB = (bytes: number) => {
  return Math.round((bytes / 1000000 + Number.EPSILON) * 100) / 100;
};

const getMaxSize = (imagePayload: any) => {
  const isVideo =
    imagePayload?.mime?.startsWith('video') ||
    imagePayload?.type?.startsWith('video');
  const isImage = imagePayload?.mime?.startsWith('image');

  if (isVideo) {
    return {
      maxSize: 25,
      errorMessage: 'picker.invalidVideoType',
    };
  }
  if (isImage) {
    return {
      maxSize: 15,
      errorMessage: 'picker.invalidImageSize',
    };
  }
  return {
    maxSize: 10,
    errorMessage: 'picker.invalidFile',
  };
};

const showSystemAlert = ({
  title,
  message = 'Something went wrong',
  actions = [
    {
      text: 'Ok',
      onPress: () => {},
    },
  ],
}) => {
  return Alert.alert(title || Config.APP_NAME, message, actions);
};

export {getMaxSize, roundByteToMB, showSystemAlert};
