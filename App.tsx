/**
 * Zyric App
 * React Native Application with Splash and Home Screen
 *
 * @format
 */

import React from 'react';
import {StatusBar} from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';

function App(): React.JSX.Element {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#5B6FED" />
      <AppNavigator />
    </>
  );
}

export default App;
