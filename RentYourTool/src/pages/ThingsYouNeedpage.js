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
export default class ThingsYouNeedpage extends Component<Props> {

Thingsyourneed() {
  console.log("hello call");
    Actions.Thingsyourneed()
  }
  render () {
    _navigator = this.props.navigator;
    return (
      <View style={styles.parentContainer}>
        <ToolbarAndroid
          title='THINGS YOU NEED BEFORE YOU START'
          navIcon={require('../images/arrowback.png')}
          onIconClicked={() => this.props.navigator.pop()}
          style={styles.toolbar}
          titleColor='white'
        />
       <ImageBackground source={require('../images/666.png')} style={styles.imageStyle}>
       <View style={styles.container}>
        <Text style= {{ fontSize: 25, color: "#fff",marginLeft:15, marginTop: 20 ,fontWeight: 'bold'}}>THINGS YOU NEED BEFORE YOU START</Text>
           
      </View>
      <View style={styles.MainContainer}>
           <Text style= {{ fontSize: 15, color: "#fff", marginTop: 100, width:300}}>•Label your tool </Text>
           <Text style= {{ fontSize: 15, color: "#fff", marginTop: 8, width:300}}>•Keep the Make, Model and Year of the tool  if applicable </Text>
           <Text style= {{ fontSize: 15, color: "#fff", marginTop: 8, width:300}}>•Use prexisting photos and videos of your  tool or create using the app.</Text>
           <Text style= {{ fontSize: 15, color: "#fff", marginTop: 8, width:300}}>•Decide the key selling points of your tool  to better market it.
</Text>
          </View>
       <View style={styles.loginButton}>
            <TouchableHighlight>
              <Text style= {{ fontSize: 15, color: "#fff"}}>Things to Know before you Start</Text>
            </TouchableHighlight>          
           </View>
            <View style={styles.skiptext}>
            <TouchableHighlight onPress={this.Thingsyourneed}>
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



