import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class RatingComponent extends Component {
  render(){
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 5, marginLeft: 15, marginRight: 15 }}>
        <Icon name="heart-o" color='black' size={25} backgroundColor="white" />
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ fontSize: 20 }}>5.00 </Text>
          <Icon name="star" color='#e8820d' size={25} />
          <Icon name="star" color='#e8820d' size={25} />
          <Icon name="star" color='#e8820d' size={25} />
          <Icon name="star" color='#e8820d' size={25} />
          <Icon name="star" color='#e8820d' size={25} />
        </View>
      </View>
    )
  }
}