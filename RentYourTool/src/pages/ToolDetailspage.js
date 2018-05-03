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
export default class ToolDetailspage extends Component<Props> {

 

promoteyourtool() {
    Actions.promoteyourtool()
  }
   render() {
      _navigator = this.props.navigator;
    return(
      <View style={styles.parentContainer}>
       <ToolbarAndroid
          title='THINGS TO KNOW BEFORE YOU START'
          navIcon={require('../images/arrowback.png')}
          onIconClicked={() => this.props.navigator.pop()}
          style={styles.toolbar}
          titleColor='white'
        />
        <ScrollView contentContainerStyle={{alignItems:'center'}}>
        
          <ImageBackground source={require('../images/1.png')} style={styles.imageStyle}>
            <Text style= {{ fontSize: 25, color: "#fff",marginLeft:10, marginTop: 45}}>SHARE THE DETAILS ABOUT YOUR TOOL</Text>
          </ImageBackground>
        
          <Text style= {{ fontSize: 15, color: "#000", marginTop: 45, width:300}}>WHICH TOOL DO YOU OWN</Text>
           
          <View style={{width:300, height:40, backgroundColor:'#ffffff',flexDirection: 'row', marginTop: 10}}>
               <TextInput style={styles.inputBox} underlineColorAndroid="transparent" placeholder="Tool Category" placeholderTextColor = '#8E8C90' selectionColor="#000" keyboardType="email-address" returnKeyType="next" onSubmitEditing={() => { this.toolname.focus(); }} onChangeText={toolcateogry => this.setState({toolcateogry})}/>
          </View>
          <View style={{width:300, height:1, backgroundColor:'#8E8C90', marginTop: 0}}>
          </View>

          <View style={{width:300, height:40, backgroundColor:'#ffffff',flexDirection: 'row', marginTop: 10}}>
               <TextInput style={styles.inputBox} underlineColorAndroid="transparent" placeholder="Tool Name" placeholderTextColor = '#8E8C90' selectionColor="#000" keyboardType="email-address" returnKeyType="next" onSubmitEditing={() => { this.make.focus(); }} onChangeText={toolname => this.setState({toolname})}/>
          </View>
          <View style={{width:300, height:1, backgroundColor:'#8E8C90', marginTop: 0}}>
          </View>

          <View style={{width:300, height:40, backgroundColor:'#ffffff',flexDirection: 'row', marginTop: 10}}>
               <TextInput style={styles.inputBox} underlineColorAndroid="transparent" placeholder="Make" placeholderTextColor = '#8E8C90' selectionColor="#000" keyboardType="email-address" returnKeyType="next" onSubmitEditing={() => { this.model.focus(); }} onChangeText={make => this.setState({make})}/>
          </View>
          <View style={{width:300, height:1, backgroundColor:'#8E8C90', marginTop: 0}}>
          </View>

          <View style={{width:300, height:40, backgroundColor:'#ffffff',flexDirection: 'row', marginTop: 10}}>
               <TextInput style={styles.inputBox} underlineColorAndroid="transparent" placeholder="Model" placeholderTextColor = '#8E8C90' selectionColor="#000" keyboardType="email-address" returnKeyType="next" onSubmitEditing={() => { this.toolcondition.focus(); }} onChangeText={model => this.setState({model})}/>
          </View>
          <View style={{width:300, height:1, backgroundColor:'#8E8C90', marginTop: 0}}>
          </View>

          <View style={{width:300, height:40, backgroundColor:'#ffffff',flexDirection: 'row', marginTop: 10}}>
               <TextInput style={styles.inputBox} underlineColorAndroid="transparent" placeholder="Tool Condition" placeholderTextColor = '#8E8C90' selectionColor="#000" keyboardType="email-address" returnKeyType="next" onSubmitEditing={() => { this.streetaddress.focus(); }} onChangeText={toolcondition => this.setState({toolcondition})}/>
          </View>
          <View style={{width:300, height:1, backgroundColor:'#8E8C90', marginTop: 0}}>
          </View>
        <Text style= {{ fontSize: 15, color: "#000", marginTop: 45, width:300}}>YOUR LOCATION</Text>
          
            <View style={{width:300, height:40, backgroundColor:'#ffffff',flexDirection: 'row', marginTop: 10}}>
               <TextInput style={styles.inputBox} underlineColorAndroid="transparent" placeholder="Street Address" placeholderTextColor = '#8E8C90' selectionColor="#000" keyboardType="email-address" returnKeyType="next" onSubmitEditing={() => { this.city.focus(); }} onChangeText={streetaddress => this.setState({streetaddress})}/>
          </View>
          <View style={{width:300, height:1, backgroundColor:'#8E8C90', marginTop: 0}}>
          </View>

          <View style={{width:300, height:40, backgroundColor:'#ffffff',flexDirection: 'row', marginTop: 10}}>
               <TextInput style={styles.inputBox} underlineColorAndroid="transparent" placeholder="City" placeholderTextColor = '#8E8C90' selectionColor="#000" keyboardType="email-address" returnKeyType="next" onSubmitEditing={() => { this.state.focus(); }} onChangeText={city => this.setState({city})}/>
          </View>
          <View style={{width:300, height:1, backgroundColor:'#8E8C90', marginTop: 0}}>
          </View>

          <View style={{width:300, height:40, backgroundColor:'#ffffff',flexDirection: 'row', marginTop: 10}}>
               <TextInput style={styles.inputBox} underlineColorAndroid="transparent" placeholder="State" placeholderTextColor = '#8E8C90' selectionColor="#000" keyboardType="email-address" returnKeyType="next" onSubmitEditing={() => { this.zipcode.focus(); }} onChangeText={state => this.setState({state})}/>
          </View>
          <View style={{width:300, height:1, backgroundColor:'#8E8C90', marginTop: 0}}>
          </View>
          <View style={styles.loginButton}>
            <TouchableHighlight onPress={this.promoteyourtool}>
              <Text style= {{ fontSize: 15, color: "#fff"}}>Submit</Text>
            </TouchableHighlight>          
           </View>
        </ScrollView>
        </View>
        
      );
    }
}


const styles = StyleSheet.create({

   parentContainer: {
    flex: 1,
  },
  container : {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00A6EB',
  },

  subbottomView : {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00A6EB',
    height: 220,
  },

  imageStyle: {
     alignItems:'center',
     height:130,
     width:400,
   },

   signupText: {
    textAlign: 'center', 
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 200,
    width: 200,
    backgroundColor: 'yellow',
  },

  loginButton: {
   position:'absolute',
   bottom: 20,
   height:45,
   backgroundColor:'#ed742f',
   
   width: 300,
  
 },

 inputBox: {
    paddingHorizontal: 16,
    fontSize:16,
    color:'#000',
    borderBottomColor: '#000', 
    borderBottomWidth: 1,
  },
});