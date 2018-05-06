import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  TouchableHighlight,
  ScrollView,
  Image,
  TextInput,
  Picker,
  Button,
  Alert,
  ToolbarAndroid,
   ImageBackground,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
var _navigator;
export default class ShowcaseYourToolPage extends Component {

ShowcaseSkip() {
    Actions.ShowcaseSkip()
  }
  render () {
    _navigator = this.props.navigator;
    return (
      <View style={styles.parentContainer}>
        <ToolbarAndroid
          title='SHOWCASE YOUR TOOL'
          navIcon={require('../images/arrowback.png')}
          onIconClicked={() => this.props.navigator.pop()}
          style={styles.toolbar}
          titleColor='white'
        />
       <ImageBackground source={require('../images/666.png')} style={styles.imageStyle}>
       <View style={styles.container}>
        <Text style= {{ fontSize: 25, color: "#fff", marginTop: 20 ,fontWeight: 'bold'}}>SHOWCASE YOUR TOOL</Text>
           
      </View>
      <View style={styles.MainContainer}>
        <Text style={styles.logoText}>Showcase your tool to the viewers and increase the chances of it being chosen.
</Text>
     </View>
       <View style={styles.loginButton}>
            <TouchableHighlight>
              <Text style= {{ fontSize: 15, color: "#fff"}}>Things to Know before you Start</Text>
            </TouchableHighlight>          
           </View>
            <View style={styles.skiptext}>
            <TouchableHighlight onPress={this.ShowcaseSkip}>
              <Text style= {{ fontSize: 20, color: "#fff"}}>Skip>></Text>
            </TouchableHighlight>          
           </View>
        </ImageBackground>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
  },
  container: {
    flex: 1,  
    
  },
   
  MainContainer :{
 

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
   backgroundColor:'#ed742f',
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
  }
});



