/**
 * Zyric App
 * React Native Application with Splash and Home Screen
 *
 * @format
 */

import React from 'react';
import {StatusBar} from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import Toast from 'react-native-toast-message';

function App(): React.JSX.Element {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#5B6FED" />
      <AppNavigator />
      <Toast />
    </>
  );
}

export default App;
