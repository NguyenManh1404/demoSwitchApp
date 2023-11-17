import {Dimensions, Platform} from 'react-native';

const {height, width} = Dimensions.get('window');

const SCREEN_WIDTH = width;
const SCREEN_HEIGHT = height;
const PLATFORM = Platform.OS;
const IS_IOS = PLATFORM === 'ios';
const IS_ANDROID = PLATFORM === 'android';
const EMPTY_STRING = '';
const HIT_SLOP = {top: 10, right: 10, bottom: 10, left: 10};

export {
  EMPTY_STRING,
  HIT_SLOP,
  IS_ANDROID,
  IS_IOS,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
};
