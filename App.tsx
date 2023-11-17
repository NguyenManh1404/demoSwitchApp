/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {Platform} from 'react-native';
import HeaderBackButton from './src/components/HeaderBackButton';
import {RootStackParamList} from './src/navigation/type';
import DocumentScreen from './src/screens/DocumentScreen';
import MapViewScreen from './src/screens/MapViewScreen';
import SalonCentreScreen from './src/screens/SalonCentreScreen';
import SalonDetailScreen from './src/screens/SalonDetailScreen';
import {APP_COLORS} from './src/themes/colors';
import {FONT_TYPES} from './src/themes/fonts';

const Stack = createNativeStackNavigator<RootStackParamList>();

const SCREEN_OPTION = {
  headerBackTitleVisible: false,
  orientation: 'portrait',
  headerBackButtonMenuEnabled: false,
  headerBackVisible: false,
  headerLeft: props => {
    return <HeaderBackButton {...props} />;
  },
  headerTitleStyle: {
    fontFamily: FONT_TYPES.bold,
    fontSize: 18,
  },
  headerShadowVisible: true,
  headerTitleAlign: 'center',
  gestureEnabled: true,
  animation: Platform.select({
    android: 'fade_from_bottom',
    ios: 'default',
  }),
};

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MapView" screenOptions={SCREEN_OPTION}>
        <Stack.Screen
          name="MapView"
          component={MapViewScreen}
          options={{
            title: 'Bản đồ',
            headerTitleStyle: {
              color: 'white', // Set the color you want
            },
            headerStyle: {
              backgroundColor: APP_COLORS.primary,
            },
          }}
        />
        <Stack.Screen
          name="SalonCentre"
          component={SalonCentreScreen}
          options={{
            title: 'Cơ sở thẩm mỹ',
            headerTitleStyle: {
              color: 'white', // Set the color you want
            },
            headerStyle: {
              backgroundColor: APP_COLORS.primary,
            },
          }}
        />

        <Stack.Screen
          name="Document"
          component={DocumentScreen}
          options={{
            title: 'Văn bản quy định',
            headerTitleStyle: {
              color: 'white', // Set the color you want
            },
            headerStyle: {
              backgroundColor: APP_COLORS.primary,
            },
          }}
        />

        <Stack.Screen
          name="SalonDetail"
          component={SalonDetailScreen}
          options={{
            title: 'Văn bản quy định',
            headerTitleStyle: {
              color: 'white', // Set the color you want
            },
            headerStyle: {
              backgroundColor: APP_COLORS.primary,
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
