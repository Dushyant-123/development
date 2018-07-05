import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,  
} from 'react-native';

const NoDataFoundComponent = (props) => {
    return (
        <View style={{ alignItems: 'center', alignSelf: 'center'}}>
          <Text style={{ textAlign : 'center', fontSize: 16 }}>No records available</Text>
        </View>
    )
}

export default NoDataFoundComponent;


