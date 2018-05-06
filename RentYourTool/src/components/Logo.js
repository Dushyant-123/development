import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
   Image 
} from 'react-native';

export default class Logo extends Component {
	render(){
		return(
			<View style={styles.container}>
				<Image style={{width: 100, height: 100}}
          			source={require('../images/icon.png')}/>
                <Text style={styles.logoText}>WELCOME!</Text>
                <Text style={styles.logoText}>Please choose the following </Text>
                <Text style={styles.logoText}> options to continue</Text>
                
      			</View>
			)
	}
}

const styles = StyleSheet.create({
  container : {
    flexGrow: 1,
    justifyContent:'flex-end',
    alignItems: 'center',
    justifyContent: 'center'
  },
  logoText : {
  	marginTop: 10,
  	fontSize:18,
  	color:'#fff'
  }
});