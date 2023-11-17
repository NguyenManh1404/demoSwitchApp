/**
 * @format
 */
import React from 'react';
import {AppRegistry, StatusBar} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

<StatusBar barStyle={'light-content'} backgroundColor={'red'} animated />;

AppRegistry.registerComponent(appName, () => App);
