import {Dimensions, Platform} from 'react-native';
import {PERMISSIONS} from 'react-native-permissions';

const {height, width} = Dimensions.get('window');

const SCREEN_WIDTH = width;
const SCREEN_HEIGHT = height;
const PLATFORM = Platform.OS;
const IS_IOS = PLATFORM === 'ios';
const IS_ANDROID = PLATFORM === 'android';
const EMPTY_STRING = '';
const HIT_SLOP = {top: 10, right: 10, bottom: 10, left: 10};

const CAMERA_PERMISSION_STRING = Platform.select({
  ios: PERMISSIONS.IOS.CAMERA,
  android: PERMISSIONS.ANDROID.CAMERA,
});

const PHOTO_PERMISSION_STRING = Platform.select({
  ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
  android: PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
});

const PICKER_METHOD = {
  CAMERA: 'camera',
  PHOTO: 'photo',
};

const DEFAULT_PICKER_OPTION = {
  forceJpg: true,
  cropping: false,
  compressImageQuality: Platform.select({
    ios: 0.8,
    android: 1,
  }),
};

const ACTION_ITEM: IActionSheetItem[] = [
  {
    id: 1,
    name: 'Tất cả',
  },
  {
    id: 2,
    name: 'Phòng khám chuyên khoa thẩm mỹ, da liễu',
  },
  {
    id: 3,
    name: 'Cơ sở dịch vụ thẩm mỹ đủ điều kiện',
  },
  {
    id: 4,
    name: 'Cơ sở dịch vụ thẩm mỹ không đủ điều kiện',
  },
];
export {
  ACTION_ITEM,
  CAMERA_PERMISSION_STRING,
  DEFAULT_PICKER_OPTION,
  EMPTY_STRING,
  HIT_SLOP,
  IS_ANDROID,
  IS_IOS,
  PHOTO_PERMISSION_STRING,
  PICKER_METHOD,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
};
