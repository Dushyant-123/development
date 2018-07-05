import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar ,
  TouchableOpacity,
  ImageBackground
} from 'react-native';

import Logo from '../components/Logo';
import Form from '../components/Form';
import FacebookButton from '../components/FacebookButton';
import {Actions} from 'react-native-router-flux';

export default class Signup extends Component {
  goBack() {
    Actions.pop();
  }
  forgot() {
    Actions.forgot()
  }
  render() {
    console.log(this.props, 'DATA')
    return(
      <ImageBackground source={require('../images/login.jpg')} style={styles.container}>
        <View style={styles.container}>
          <Logo/>
          <Form type="Log In" changePassword={this.props.oldPassword} email={this.props.userEmail}/>
          <Text style={styles.logoText}>or Sign In with</Text>
          <FacebookButton/>
          {
            this.props.oldPassword === undefined && 
            <View>
              <View style={styles.signupTextCont}>
                <Text style={styles.signupText}>Already have an account? Then </Text>
                <TouchableOpacity onPress={this.goBack}><Text style={styles.signupButton}>Sign In!</Text></TouchableOpacity>
              </View>
            </View>
          } 
        </View>
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  container : {
    flex: 1,
    alignItems:'center',
    justifyContent :'center',
  },
  signupTextCont : {
    //flexGrow: 1,
    alignItems:'flex-end',
    justifyContent :'center',
    flexDirection:'row',
  },
   forgotTextCont : {
    alignItems:'flex-end',
    justifyContent :'center',
    flexDirection:'row'
  },
  signupText: {
    color:'rgba(255,255,255,0.6)',
    fontSize:16
  },
  signupButton: {
    color: '#c48383',
    fontSize:16,
  },
   logoText : {
    fontSize:18,
    color: 'rgba(255, 255, 255, 1.0)',
  }
});