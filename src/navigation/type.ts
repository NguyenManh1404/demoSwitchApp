import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ISalonCenter} from '../screens/MapViewScreen';

export type RootStackParamList = {
  MapView: undefined;
  SalonCentre: undefined;
  Document: undefined;
  SalonDetail: {
    item: ISalonCenter;
  };
};

export type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'MapView',
  'SalonCentre',
  'Document',
  'SalonDetail'
>;
