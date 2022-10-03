/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {type PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import AppRoutes from './src/router/AppRoutes';
import LoginScreen from './src/screens/LoginScreen';
import { store } from './src/redux/store';
import { Provider } from 'react-redux'


const App = () => {


  return (
    <Provider store={ store }>
      <AppRoutes />
    </Provider>
  );
};

const styles = StyleSheet.create({

});

export default App;
