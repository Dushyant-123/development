/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  StatusBar ,
  View
} from 'react-native';

import Routes from './src/Routes';
import SplashScreen from 'react-native-splash-screen'
// import NavigationTest from './src/test';


export default class App extends Component<{}> {


   componentDidMount() {
        SplashScreen.hide();
    }
  render() {
    return (
      <View style={styles.container}>
        <StatusBar
           backgroundColor="#1c313a"
           barStyle="light-content"
         />
        <Routes/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container : {
    flex: 1,
  }
});

/*
<View style={styles.container}>
        <StatusBar
           backgroundColor="#1c313a"
           barStyle="light-content"
         />
        <Routes/>
      </View>
*/
