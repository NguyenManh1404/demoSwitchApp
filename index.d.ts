declare module '*.png';
// screen props
type DocumentProps = {};
type MapViewProps = {};
type BeautySalonDetailProps = {};
type BeautySalonsProps = {};
type MainNavigatorProps = {};
type EvaluateAnotherSalonProps = {};
type EvaluateAnotherSalonFormProps = {};

interface ISalonCenter {
  id: string;
  BusinessName: string;
  BusinessOwner: string;
  BusinessType: string;
  City: string;
  FormattedAddress: string;
  Geolocation: string;
  Index: string;
  Lat: string;
  Long: string;
  Number: string;
  PhoneNumber: string;
  Street: string;
  Ward: string;
  IsClinic: boolean;
  LogoURL: string;
}

interface IMakerItem {
  index: number;
  item: ISalonCenter;
  isSelected: boolean;
  onPress: (item: ISalonCenter, index: number) => void;
}

interface ITabBarItem {
  title: string;
  logo: ImageSourcePropType;
  color: string;
  onPress?: () => void;
}

interface ISalonCard {
  item: ISalonCenter;
  index?: number;
  isShowValuation?: boolean;
  isShowAddress?: boolean;
  isFromMapView?: boolean;
  onPress?: (item: ISalonCenter) => void;
}

type RootStackParamList = {
  Document: undefined;
  MapView: undefined;
  BeautySalonDetail: {
    item: ISalonCenter;
  };
  BeautySalons: ISalonCenter[];
  BeautySalonReview: undefined;
  EvaluateAnotherSalon: undefined;
  EvaluateAnotherSalonForm: undefined;
};

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'MapView'
>;

type ScreenNavigationProp<T> = NativeStackNavigationProp<RootStackParamList, T>;
type ScreenRouteProp<T> = RouteProp<RootStackParamList, T>;

type BeautySalonDetailRouteProp = RouteProp<
  RootStackParamList,
  'BeautySalonDetail'
>;

type FontTypes = 'semiBold' | 'bold' | 'regular';

interface IInfoDetailSalonItem {
  title: string;
  content: string;
}

interface IRatingItem {
  id: string;
  images?: string[];
  time: string;
  content: string;
}

interface IBeautySalonReview {
  item: ISalonCenter;
}

interface IBottomActionSheetProp {
  isVisible: boolean;
  filterSelected: IActionSheetItem;
  onClose: () => void;
  onActionPress: (e: IActionSheetItem) => void;
}

interface IInputEvaluate {
  placeholder: string;
  onChangeText: (e: string) => void;
  value: string;
}

interface IActionSheetItem {
  id: number;
  name: string;
}
