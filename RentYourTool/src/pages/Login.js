import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar ,
  TouchableOpacity,
  ImageBackground,
  Platform
} from 'react-native';

import Logo from '../components/Logo';
import Form from '../components/Form';
import CreateButton from '../components/CreateButton';
import FacebookButton from '../components/FacebookButton';
import {Actions} from 'react-native-router-flux';


export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      
    };
  }

  componentDidMount() {
    console.log("Did Mount called");
  }

	signup() {
		Actions.signup()
	}

	render() {
		return(
       <ImageBackground source={require('../images/backimage.png')} style={styles.container}>
       <View style={styles.container}>
				<Logo/>
         <CreateButton type=" Create New Account"/>
         <Text style={styles.logoText}>or Connect with</Text>
          <FacebookButton/>
			  <View style={styles.signupTextCont}>
					<Text style={styles.signupText}>Already have an account? Then </Text>
					<TouchableOpacity onPress={this.signup}><Text style={styles.signupButton}> Sign in!</Text></TouchableOpacity>
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
    justifyContent :'center',
    },
   signupTextCont : {
  	flexGrow: 1,
    alignItems:'flex-end',
    justifyContent :'center',
    paddingVertical:16,
    flexDirection:'row'
  },
  signupText: {
  	color:'rgba(255,255,255,0.6)',
  	fontSize:16
  },
  signupButton: {
    color: '#fcb752',
  	fontSize:16,    
  	fontWeight:'500'
  },
   logoText : {
    marginVertical: 10,
    fontSize:18,
    color: '#fff'
  }
});
