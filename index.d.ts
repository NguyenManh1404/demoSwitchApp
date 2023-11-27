declare module '*.png';

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
  Industry?: string;
  LicensetoOperate?: string;
  IssueDate?: string;
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
  isFromDetail?: boolean;
  onPress?: (item: ISalonCenter) => void;
}

type OptionalTitle = {
  title?: string;
};
type RootStackParamList = {
  Document: OptionalTitle;
  MapView: OptionalTitle;
  BeautySalonDetail: OptionalTitle & {
    item: ISalonCenter;
  };
  BeautySalons: OptionalTitle;
  BeautySalonReview: OptionalTitle & {
    item: ISalonCenter;
  };
  EvaluateAnotherSalon: OptionalTitle;
  EvaluateAnotherSalonForm: OptionalTitle;
};

type FontTypes = 'semiBold' | 'bold' | 'regular';

interface IInfoDetailSalonItem {
  title: string;
  content: string;
}

interface IRatingItem {
  id: string;
  images?: ImageSourcePropType[];
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

interface IDocumentCardProps {
  item: IDocumentItem;
}

interface IDocumentItem {
  id?: string;
  Link: string;
  STT: string;
  content: string;
  name: string;
}

interface IEvaluateAnotherSalonCardProps {}

interface IEvaluateAnotherItem {
  idReview: string;
  createdAt: string;
  centerName: string;
  address: string;
  reviewContent: string;
  images: ImageSourcePropType[];
}

interface IListEmptyComponentProps {
  image: ImageSourcePropType;
  title: string;
  containerStyle?: ViewStyle;
}

interface IActionItem {
  item: IActionSheetItem;
  isSelected: boolean;
  index: number;
  onPress: (item: IActionSheetItem) => void;
}

interface IEvaluateAnotherSalonCard {
  item: IEvaluateAnotherItem;
  index: number;
}
