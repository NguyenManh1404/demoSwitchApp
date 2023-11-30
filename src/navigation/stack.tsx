import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  HeaderBackButtonProps,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack/lib/typescript/src/types';
import React from 'react';
import {Platform} from 'react-native';
import HeaderBackButton from '../components/HeaderBackButton';
import {APP_COLORS} from '../themes/colors';
import {FONT_TYPES} from '../themes/fonts';
import {EMPTY_STRING} from '../utils/constants';
import {ROUTES} from './routes';

const screenOptions = {
  orientation: 'portrait',
  headerBackButtonMenuEnabled: false,
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
  headerBackVisible: false,
  headerLeft: (props: HeaderBackButtonProps) => {
    return <HeaderBackButton {...props} />;
  },
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const MainNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={'MapView'}
      screenOptions={({route}) => {
        return {
          ...screenOptions,
          headerTitle: route.params?.title || EMPTY_STRING,
          headerStyle: {
            backgroundColor: APP_COLORS.primary,
          },
          headerTitleStyle: {
            color: APP_COLORS.white,
          },
        } as NativeStackNavigationOptions;
      }}>
      <Stack.Screen
        name={'DisplayPDF'}
        component={ROUTES.DisplayPDF}
        options={{
          presentation: 'modal',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={'Document'}
        component={ROUTES.Document}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={'MapView'}
        component={ROUTES.MapView}
        options={{headerTitle: 'Bản đồ'}}
      />
      <Stack.Screen
        name={'BeautySalonDetail'}
        component={ROUTES.BeautySalonDetail}
      />
      <Stack.Screen
        name={'BeautySalonReview'}
        component={ROUTES.BeautySalonReview}
      />
      <Stack.Screen name={'BeautySalons'} component={ROUTES.BeautySalons} />
      <Stack.Screen
        name={'EvaluateAnotherSalon'}
        component={ROUTES.EvaluateAnotherSalon}
      />
      <Stack.Screen
        name={'EvaluateAnotherSalonForm'}
        component={ROUTES.EvaluateAnotherSalonForm}
      />
    </Stack.Navigator>
  );
};
