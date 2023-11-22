import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import Carousel from 'react-native-snap-carousel';
import BottomTab from '../../components/BottomTab';
import MakerItem from '../../components/MapView/MakerItem';
import SalonCard from '../../components/SalonCard';
import {APP_COLORS} from '../../themes/colors';
import {IS_ANDROID, SCREEN_HEIGHT, SCREEN_WIDTH} from '../../utils/constants';
import mapStyle from '../../utils/mapStyle.json';

const ASPECT_RATIO = SCREEN_WIDTH / SCREEN_HEIGHT;
const LATITUDE_DELTA = 0.004;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const salonCentreRef = firestore().collection('BeautySalons');

const MapViewCarousel: React.FC<MapViewProps> = ({}) => {
  const mapRef = useRef<MapView>(null);
  const carouselRef = useRef<Carousel<ISalonCenter>>(null);
  const {navigate} = useNavigation<HomeScreenNavigationProp>();

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const [centres, setCenters] = useState<ISalonCenter[]>([]);

  const onCarouselSnapToIndex = (index = 0) => {
    carouselRef?.current?.snapToItem(index, true);
  };

  const onMarkerPress = (_item: ISalonCenter, index: number) => {
    if (index !== selectedIndex) {
      setSelectedIndex(index);
      onCarouselSnapToIndex(index);
    }
  };

  const onSnapToItem = (index: number) => {
    const currentItem = centres[index];

    setSelectedIndex(index);

    mapRef?.current?.animateToRegion({
      latitude: Number(currentItem.Lat),
      longitude: Number(currentItem.Long),
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    });
  };

  const navigateToSalonDetail = (item: ISalonCenter) => {
    navigate('BeautySalonDetail', {item: item});
  };

  useEffect(() => {
    const fetchCentres = async () => {
      try {
        const querySnapshot = await salonCentreRef.get();
        const salonCentreData: ISalonCenter[] = [];

        querySnapshot.forEach(documentSnapshot => {
          salonCentreData.push({
            id: documentSnapshot.id,
            ...documentSnapshot.data(),
          } as ISalonCenter);
        });

        setCenters(salonCentreData);
      } catch (error) {}
    };

    fetchCentres();
  }, []);

  const renderItem = ({item, index}: {item: ISalonCenter; index: number}) => {
    return (
      <SalonCard
        key={index}
        item={item}
        index={index}
        onPress={navigateToSalonDetail}
        isFromMapView={true}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <MapView
          ref={mapRef}
          cacheEnabled={!IS_ANDROID}
          customMapStyle={mapStyle}
          provider={PROVIDER_GOOGLE}
          showsUserLocation
          style={styles.container}
          initialRegion={{
            latitude: 16.07688, // Replace with the actual latitude for Hải Châu, Đà Nẵng, Việt Nam
            longitude: 108.22415, // Replace with the actual longitude for Hải Châu, Đà Nẵng, Việt Nam
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}>
          {centres?.map((item, index) => {
            return (
              <MakerItem
                item={item}
                key={index}
                index={index}
                isSelected={index === selectedIndex}
                onPress={onMarkerPress}
              />
            );
          })}
        </MapView>
        <View style={styles.cardContent}>
          <Carousel
            initialNumToRender={150}
            horizontal
            directionalLockEnabled
            enableSnap
            ref={carouselRef}
            data={centres || []}
            renderItem={renderItem}
            keyExtractor={(item: ISalonCenter, index: number) =>
              `${item.id}${index}`
            }
            decelerationRate={'normal'}
            sliderWidth={SCREEN_WIDTH}
            itemWidth={SCREEN_WIDTH - 60}
            onSnapToItem={onSnapToItem}
            layout={'default'}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
      <BottomTab data={centres} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: APP_COLORS.white,
  },
  cardContent: {
    position: 'absolute',
    bottom: 12,
  },
});

export default MapViewCarousel;
