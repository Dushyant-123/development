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
import Message from '../ownerTabs/message';
import { headerBackgroundColor } from '../styles';

class FooterOwnerComponent extends Component {
    render(){
        return (
            <View style={{ flexDirection: 'row', backgroundColor: headerBackgroundColor }}>
                <TouchableOpacity style={{ flex:1, flexDirection: 'column', alignItems: 'center' }} onPress={() => Actions.ownerMessage()}>
                    <Icon color="white" name="wechat" size={18} />
                    <Text style={{color: "white", fontSize: 12, marginBottom: 5 }}>Message</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ flex:1, flexDirection: 'column', alignItems: 'center' }} onPress={() => Actions.ownerTool()}>
                    <Icon color="white" name="briefcase" size={18} />
                    <Text style={{color: "white", fontSize: 12, marginBottom: 5 }}>Tool</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ flex:1, flexDirection: 'column', alignItems: 'center' }} onPress={() => Actions.ownerCalendar()}>
                    <Icon color="white" name="calendar" size={18} />
                    <Text style={{color: "white", fontSize: 12, marginBottom: 5 }}>Calendar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ flex:1, flexDirection: 'column', alignItems: 'center' }} onPress={() => Actions.ownerProfile()}>
                    <Icon color="white" name="user" size={18} />
                    <Text style={{color: "white", fontSize: 12, marginBottom: 5 }}>My Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ flex:1, flexDirection: 'column', alignItems: 'center' }} onPress={() => Actions.ownerEarnings()}>
                    <Icon color="white" name="heart" size={18} />
                    <Text style={{color: "white", fontSize: 12, marginBottom: 5 }}>Earnings</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default FooterOwnerComponent;
