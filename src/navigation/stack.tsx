import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  HeaderBackButtonProps,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack/lib/typescript/src/types';
import React, {useMemo} from 'react';
import {Platform} from 'react-native';
import HeaderBackButton from '../components/HeaderBackButton';
import {APP_COLORS} from '../themes/colors';
import {FONT_TYPES} from '../themes/fonts';
import {ROUTES, ROUTE_NAMES} from './routes';

type Screen = keyof RootStackParamList;

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

export const MainNavigator: React.FC<MainNavigatorProps> = ({}) => {
  const STACKS = useMemo(() => {
    return [
      {
        name: ROUTE_NAMES.Document,
        component: ROUTES.Document,
        options: {
          title: 'Văn bản quy định',
        },
      },
      {
        name: ROUTE_NAMES.MapView,
        component: ROUTES.MapView,
        options: {
          title: 'Bản đồ',
        },
      },
      {
        name: ROUTE_NAMES.BeautySalons,
        component: ROUTES.BeautySalons,
        options: {
          title: 'Cơ sở thẩm mỹ',
        },
      },
      {
        name: ROUTE_NAMES.BeautySalonDetail,
        component: ROUTES.BeautySalonDetail,
        options: {
          title: 'Cơ sở thẩm mỹ',
        },
      },
      {
        name: ROUTE_NAMES.BeautySalonReview,
        component: ROUTES.BeautySalonReview,
        options: {
          title: 'Gửi góp ý, đánh giá',
        },
      },
    ];
  }, []);

  return (
    <Stack.Navigator
      initialRouteName={ROUTE_NAMES.MapView as Screen}
      screenOptions={screenOptions as NativeStackNavigationOptions}>
      {STACKS.map((e, index) => {
        return (
          <Stack.Screen
            key={index}
            name={e.name as Screen}
            component={e.component}
            options={{
              headerTitle: e.options.title,
              headerStyle: {
                backgroundColor: APP_COLORS.primary,
              },
              headerTitleStyle: {
                color: APP_COLORS.white,
              },
            }}
          />
        );
      })}
    </Stack.Navigator>
  );
};
