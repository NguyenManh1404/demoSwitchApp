import {Dimensions, Platform} from 'react-native';

const {height, width} = Dimensions.get('window');

const SCREEN_WIDTH = width;
const SCREEN_HEIGHT = height;
const PLATFORM = Platform.OS;
const IS_IOS = PLATFORM === 'ios';
const IS_ANDROID = PLATFORM === 'android';
const EMPTY_STRING = '';
const HIT_SLOP = {top: 10, right: 10, bottom: 10, left: 10};

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
  EMPTY_STRING,
  HIT_SLOP,
  IS_ANDROID,
  IS_IOS,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
};
