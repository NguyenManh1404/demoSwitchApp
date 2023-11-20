/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {MainNavigator} from './src/navigation/stack';
import {APP_COLORS} from './src/themes/colors';

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <StatusBar
          barStyle={'light-content'}
          backgroundColor={APP_COLORS.primary}
          animated
        />
        <MainNavigator />
      </SafeAreaProvider>
    </NavigationContainer>
  );
}

export default App;
