import React from 'react'

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import ProductScreen from '../screens/ProductScreen';
import LoginScreen from '../screens/LoginScreen';
import ManageStockScreen from '../screens/ManageStockScreen';

const Stack = createNativeStackNavigator();

const AppRoutes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" options={{ header: () => null }} component={LoginScreen} />
        <Stack.Screen name="Home" options={{ header: () => null }} component={HomeScreen} />
        <Stack.Screen name="Manage" options={{ header: () => null }} component={ManageStockScreen} />
        <Stack.Screen name="Product" options={{ header: () => null }} component={ProductScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppRoutes