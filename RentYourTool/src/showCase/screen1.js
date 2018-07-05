import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  Picker,
  Button,
  Alert,
  ImageBackground,
} from 'react-native';

import {Actions} from 'react-native-router-flux';   //Actions Used for navigation
import Icon from 'react-native-vector-icons/FontAwesome';   //For Icon Used for back step as pop.
import { Header } from 'react-native-elements';    //For Header.
import { headerBackgroundColor, buttonBackgroundColor } from '../styles';  //common BackgroundColor style for Header.

export default class ShowcaseYourToolPage extends Component {
  render () {
    
    //for Header in Left Side
    const LeftComponent = () => {
      return(
          <Icon.Button size={20} name="chevron-left" backgroundColor="transparent" onPress={() => Actions.pop()}/>
      )
    }

    //for Header in Right Side, But Now it is blank.
    const RightComponent = () => {
      return(
        <View style={{ flexDirection: 'row' }} />
      )
    }
    return (
      <View style={styles.parentContainer}>
        <Header
          outerContainerStyles={{ height: 55 }}
          backgroundColor={headerBackgroundColor}
          placement="left"
          leftComponent={<LeftComponent />}
          centerComponent={{ text: '', style: { color: '#fff', fontWeight: 'bold', fontSize:18 } }}
          rightComponent={<RightComponent/>}
        />
        <ImageBackground source={require('../images/screen1.png')} style={styles.imageStyle}>
          <View style={styles.container}>
            <Text style= {{ fontSize: 25, color: "#fff", marginTop: 20 ,fontWeight: 'bold'}}>SHOWCASE YOUR TOOL</Text>
          </View>
          <View style={styles.MainContainer}>
            <Text style={styles.logoText}>Showcase your tool to the viewers and increase the chances of it being chosen.</Text>
          </View>
          <View style={styles.loginButton}>
            <TouchableOpacity onPress={() => Actions.ShowcaseSkip()}>
              <Text style= {{ fontSize: 15, color: "#fff"}}>Things to Know before you Start</Text>
            </TouchableOpacity>          
          </View>
          <View style={styles.skiptext}>
            <TouchableOpacity onPress={() => Actions.Thingsyourneed()}>
              <Text style= {{ fontSize: 20, color: "#fff" }}>Skip></Text>
            </TouchableOpacity>          
          </View>
        </ImageBackground>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
  },
  container: {
    flex: 1,  
  },
  MainContainer : {
    justifyContent: 'center',
    alignItems: 'center', 
    flex:13
  },
   logoText : {
    marginLeft:10,  
    width: 330, 
    fontSize:20,
    color:'#fff'
  },
  loginButton: {
    flex:1, 
    height:45,
    backgroundColor: buttonBackgroundColor,
    bottom: 60,  
    width: 300,
    justifyContent: 'center', 
    alignItems: 'center', 
  },
  skiptext: {
    flex:1, 
    height:45,
    bottom: 60,  
    width: 300,
    justifyContent: 'center', 
    alignItems: 'center',
  },
  imageStyle: {
    flex: 1,
    alignItems:'center',
  },
  toolbar: {
    height: 56,
    backgroundColor: '#4883da',
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 44,
    width: 200,
    backgroundColor: '#4883da',
    alignSelf: 'center',
    justifyContent: 'center'
  },
});