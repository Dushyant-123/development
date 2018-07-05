import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  AsyncStorage,
  ActivityIndicator,
  TouchableOpacity,  
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';

class FooterComponent extends Component {
    render(){
        return (
            <View style={{ flexDirection: 'row'}}>
                <TouchableOpacity style={{ flex:1, flexDirection: 'column', alignItems: 'center' }} onPress={() => Actions.search()}>
                    <Icon color="gray" name="search" size={18} />
                    <Text style={{color: "black", fontSize: 12, marginBottom: 5 }}>Search Karna Hai</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ flex:1, flexDirection: 'column', alignItems: 'center' }} onPress={() => Actions.message()}>
                    <Icon color="gray" name="wechat" size={18} />
                    <Text style={{color: "black", fontSize: 12, marginBottom: 5 }}>Message</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ flex:1, flexDirection: 'column', alignItems: 'center' }} onPress={() => Actions.excursions()}>
                    <Icon color="gray" name="briefcase" size={18} />
                    <Text style={{color: "black", fontSize: 12, marginBottom: 5 }}>Rentals</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ flex:1, flexDirection: 'column', alignItems: 'center' }} onPress={() => Actions.favorite()}>
                    <Icon color="gray" name="heart" size={18} />
                    <Text style={{color: "black", fontSize: 12, marginBottom: 5 }}>Favorites</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ flex:1, flexDirection: 'column', alignItems: 'center' }} onPress={() => Actions.myProfile()}>
                    <Icon color="gray" name="user" size={18} />
                    <Text style={{color: "black", fontSize: 12, marginBottom: 5 }}>Profile</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default FooterComponent;
