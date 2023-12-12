import storage from '@react-native-firebase/storage';
import {useState} from 'react';
import {Linking} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

const useMediaPicker = ({
  setValue,
  imageFolderStorage,
  imageState,
}: IUseMediaPickerProps) => {
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    try {
      setLoading(true);
      const image = await ImagePicker.openPicker({
        width: 300,
        height: 400,
        // cropping: true,
      });

      const imageRef = await `${imageFolderStorage}/${new Date().getTime()}`;

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
    } finally {
      setLoading(false);
    }
  };
  return {
    pickImage,
    loading,
  };
};

export {useMediaPicker};
