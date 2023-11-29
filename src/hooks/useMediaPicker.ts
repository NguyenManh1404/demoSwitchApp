import storage from '@react-native-firebase/storage';
import {Linking} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

const useMediaPicker = ({
  setValue,
  imageFolderStorage,
  imageState,
}: IUseMediaPickerProps) => {
  const pickImage = async () => {
    try {
      const image = await ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
      });

      const imageRef = `${imageFolderStorage}/${new Date().getTime()}`;

      if (image.path) {
        const response = await storage().ref(imageRef).putFile(image.path);
        if (response) {
          const url = await storage().ref(imageRef).getDownloadURL();
          setValue('images', [...(imageState as string[]), url]);
        }
      }
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
  return {
    pickImage,
  };
};

export {useMediaPicker};
