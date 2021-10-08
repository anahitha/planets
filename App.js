import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Home from './screens/home';
import Details from './screens/details';

export default function App() {
  return (
    <AppContainer/>
  );
}

const appStackNavigator = createStackNavigator({
  Home: {screen: Home, navigationOptions: {headerShown: false}},
  Details: {screen: Details, navigationOptions: {headerShown: false}}
}, {initialRouteName: "Home"})
const AppContainer = createAppContainer(appStackNavigator)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
