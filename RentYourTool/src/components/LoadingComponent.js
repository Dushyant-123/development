import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,  
} from 'react-native';


const LoadingComponent = () => {
    return (
        <View style={{ alignItems: 'center', alignSelf: 'center'}}>
            <ActivityIndicator size="large" />
        </View>
    )
}

export default LoadingComponent;


