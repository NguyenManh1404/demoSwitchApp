import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {SafeAreaView, StatusBar, StyleSheet, View} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import Carousel from 'react-native-snap-carousel';
import BottomTab from '../components/BottomTab';
import MakerItem from '../components/MapView/MakerItem';
import SalonCard from '../components/SalonCard';
import {HomeScreenNavigationProp} from '../navigation/type';
import {APP_COLORS} from '../themes/colors';
import {IS_ANDROID, SCREEN_HEIGHT, SCREEN_WIDTH} from '../utils/constants';
import mapStyle from '../utils/mapStyle.json';

export interface ISalonCenter {
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
}

const ASPECT_RATIO = SCREEN_WIDTH / SCREEN_HEIGHT;
const LATITUDE_DELTA = 0.004;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const MapViewScreen = () => {
  const {navigate} = useNavigation<HomeScreenNavigationProp>();
  const mapRef = useRef<MapView>(null);

  const carouselRef = useRef<any>(null);

  const [indexItemSelected, setIndexItemSelected] = useState<number | null>(
    null,
  );

  const [dataCenter, setDataCenter] = useState<ISalonCenter[]>([]);

  const salonCentreRef = firestore().collection('BeautySalons');

  const fetchBeautySalonCentre = useCallback(async () => {
    try {
      const querySnapshot = await salonCentreRef.get();
      const salonCentreData: ISalonCenter[] = [];

      querySnapshot.forEach(documentSnapshot => {
        salonCentreData.push({
          id: documentSnapshot.id,
          ...documentSnapshot.data(),
        } as ISalonCenter);
      });

      setDataCenter(salonCentreData);
    } catch (error) {
      console.error('Error fetching data', error);
    }
  }, [salonCentreRef]); // Add dependencies as needed

  useEffect(() => {
    fetchBeautySalonCentre();
  }, [fetchBeautySalonCentre]);

  const renderItem = ({item, index}: {item: ISalonCenter; index: number}) => {
    return (
      <SalonCard
        key={index}
        item={item}
        index={index}
        onPress={() => navigateToSalonDetail(item)}
      />
    );
  };

  const onCarouselSnapToIndex = useCallback((index = 0) => {
    carouselRef?.current?.snapToItem(index);
  }, []);

  const onMarkerPress = (index: number) => {
    setIndexItemSelected(index);
    onCarouselSnapToIndex(index);
  };

  const onSnapToItem = (index: number) => {
    const currentItem = dataCenter[index];

    setIndexItemSelected(index);

    mapRef?.current?.animateToRegion({
      latitude: Number(currentItem.Lat),
      longitude: Number(currentItem.Long),
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    });
  };

  const navigateToSalonDetail = (item: ISalonCenter) => {
    navigate('SalonDetail', {item: item});
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        animated={true}
        backgroundColor={APP_COLORS.primary}
        barStyle={'light-content'}
      />
      <View style={styles.mapContent}>
        <MapView
          ref={mapRef}
          cacheEnabled={!IS_ANDROID}
          customMapStyle={mapStyle}
          provider={PROVIDER_GOOGLE}
          showsUserLocation
          style={styles.map}
          initialRegion={{
            latitude: 16.07688, // Replace with the actual latitude for Hải Châu, Đà Nẵng, Việt Nam
            longitude: 108.22415, // Replace with the actual longitude for Hải Châu, Đà Nẵng, Việt Nam
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}>
          {dataCenter?.map((item, index) => {
            return (
              <MakerItem
                coordinate={{
                  latitude: Number(item.Lat),
                  longitude: Number(item.Long),
                }}
                key={index}
                isClinic={item.IsClinic}
                isLocationSelected={index === indexItemSelected}
                onPress={() => onMarkerPress(index)}
              />
            );
          })}
        </MapView>
        <View style={styles.cardContent}>
          <Carousel
            ref={carouselRef}
            data={dataCenter || []}
            renderItem={renderItem}
            keyExtractor={(item: ISalonCenter, index: number) =>
              `${item.id}${index}`
            }
            onEndReachedThreshold={0.1}
            containerCustomStyle={styles.contentCardContainer}
            sliderWidth={SCREEN_WIDTH}
            itemWidth={SCREEN_WIDTH - 60}
            onSnapToItem={onSnapToItem}
            layout={'default'}
            showsVerticalScrollIndicator={false}
            removeClippedSubviews={false}
          />
        </View>
      </View>
      <BottomTab />
    </SafeAreaView>
  );
};

export default MapViewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  mapContent: {
    flex: 1,
  },
  map: {
    flex: 1,
  },

  contentCardContainer: {},

  cardContent: {
    position: 'absolute',
    bottom: 12,
  },
});
