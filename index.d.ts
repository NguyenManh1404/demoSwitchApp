declare module '*.png';
declare module '*.pdf';

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
  DisplayPDF: OptionalTitle;
  Document: OptionalTitle;
  MapView: OptionalTitle;
  BeautySalonDetail: OptionalTitle & {
    item: ISalonCenter;
  };
  BeautySalons: OptionalTitle;
  BeautySalonReview: OptionalTitle & {
    item: ISalonCenter;
    commentLength: number;
  };
  EvaluateAnotherSalon: OptionalTitle;
  EvaluateAnotherSalonForm: OptionalTitle & {
    commentLength: number;
  };
};

type FontTypes = 'semiBold' | 'bold' | 'regular';

interface IInfoDetailSalonItem {
  title: string;
  content: string;
}

interface IRatingItem {
  id: string;
  images?: ImageSourcePropType[];
  createdAt: firebase.firestore.Timestamp;
  content: string;
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
  onBlur: (e) => void;
  value: string;
  placeholderTextColor: string;
  keyboardType?: KeyboardTypeOptions;
  maxLength?: number;
}

interface IActionSheetItem {
  id: number;
  name: string;
}

interface IDocumentCardProps {
  item: IDocumentItem;
  onPress?: () => void;
}

interface IDocumentItem {
  id?: string;
  Link: string;
  STT: string;
  content: string;
  name: string;
}

interface IListEmptyComponentProps {
  image: ImageSourcePropType;
  title: string;
  containerStyle?: ViewStyle;
  loading?: boolean;
}

interface IActionItem {
  item: IActionSheetItem;
  isSelected: boolean;
  index: number;
  onPress: (item: IActionSheetItem) => void;
}

interface IReviewSalon {
  id?: string;
  idSalon: string;
  idReview: string;
  title: string;
  content: string;
  images: string[];
  createdAt: firebase.firestore.Timestamp;
  formattedTime?: firebase.firestore.Timestamp;
}

interface IRatingItemProps {
  item: IReviewSalon;
}

interface IReviewAnotherItem {
  id?: string;
  idReview: string | number;
  reviewerName: string;
  reviewerPhone: string;
  reviewerAddress: string;
  title: string;
  salonName: string;
  salonAddress: string;
  content: string;
  images: ImageSourcePropType[];
  createdAt: firebase.firestore.Timestamp;
  formattedTime?: firebase.firestore.Timestamp;
}

interface IEvaluateAnotherSalonCard {
  item: IReviewAnotherItem;
  index: number;
}

interface HeaderRightButtonProps {
  onPress?: () => void;
}

interface IInfoModalProps {
  isModalVisible: boolean;
  toggleModal: () => void;
  closeModal: () => void;
}

type ImageError = {code: PickerErrorCode};

interface IUseMediaPickerProps {
  setValue: any;
  imageFolderStorage?: string;
  imageState?: string[];
}

interface ISyncReviewData {
  linhVucId: string;
  tenDayDu: string; //hardcode
  email: string; //hardcode
  soDienThoai: string; //hardcode
  tieuDe: string;
  noiDungYKien: string;
  noiDienRa: string;
  nguonGopY: string; //hardcode
  hinhAnhs: {url: string}[];
}
