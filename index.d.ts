declare module '*.png';
// screen props
type DocumentProps = {};
type MapViewProps = {};
type BeautySalonDetailProps = {};
type BeautySalonsProps = {};
type MainNavigatorProps = {};

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
  index: number;
  onPress: (item: ISalonCenter) => void;
}

type RootStackParamList = {
  Document: undefined;
  MapView: undefined;
  BeautySalonDetail: {
    item: ISalonCenter;
  };
  BeautySalons: undefined;
  BeautySalonReview: undefined;
};

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'MapView'
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
