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

export default class Signup extends Component<{}> {

  goBack() {
      Actions.pop();
  }
  forgot() {
    Actions.forgot()
  }

  render() {
    return(
        <ImageBackground source={require('../images/backimage.png')} style={styles.container}>
     
      <View style={styles.container}>
        <Logo/>
        <Form type="Log In"/>
       <Text style={styles.logoText}>or Sign In with</Text>
          <FacebookButton/>
        <View style={styles.signupTextCont}>
          <Text style={styles.signupText}>Don't have an account yet? Then </Text>
          <TouchableOpacity onPress={this.goBack}><Text style={styles.signupButton}>Sign Up!</Text></TouchableOpacity>
        </View>
        <View style={styles.forgotTextCont}>
          <Text style={styles.signupText}>Forgot </Text>
          <TouchableOpacity onPress={this.forgot}><Text style={styles.signupButton}>Password?</Text></TouchableOpacity>
        </View>

      </View> 
      </ImageBackground>
      
      )
  }
}

const styles = StyleSheet.create({
  container : {
   
    flex: 1,
    alignItems:'center',
    justifyContent :'center'
  },
  signupTextCont : {
    flexGrow: 1,
    alignItems:'flex-end',
    justifyContent :'center',
    flexDirection:'row'
  },
   forgotTextCont : {
    flexGrow: 1,
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
    fontWeight:'500'
  },
   logoText : {
    marginVertical: 10,
    fontSize:18,
    color: 'rgba(255, 255, 255, 1.0)',
  }
});
