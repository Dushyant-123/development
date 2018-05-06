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
  AsyncStorage
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import StdBtn from '../components/StdBtn';
import { height, width, isIphoneX } from '../common/confignew';
import { DatePickerDialog } from 'react-native-datepicker-dialog'; 
import moment from 'moment';
var _navigator;
export default class Promote extends Component {
  constructor(props){
    super(props);
    this.state = {
      PickerValueHolder : '', 
      promoteToolDetail : {},
      toolDiscription : '',
      toolRentCategory : '',
      toolUsageRules: '',
      toolcurrency : '',
      toolAdComment : '',

    }
  }

  TOOLAVAILABILITY() {
    Actions.TOOLAVAILABILITY()
  }

  componentDidMount(){
    console.log("Called here ");
    //this.redirectToolAvailability();
  }

  redirectToolAvailability(){
    console.log("redirectToolAvailability called here ")
    var ToolDetails = {};
    

    AsyncStorage.getItem("ToolDetails").then((value) => {
      console.log("\n\n\n 1122334455 === ",JSON.parse(value));
      ToolDetails = JSON.parse(value);
      ToolDetails.toolDiscription = this.state.toolDiscription;
      ToolDetails.toolRentCategory = this.state.toolRentCategory;
      ToolDetails.toolUsageRules = this.state.toolUsageRules;
      ToolDetails.toolcurrency = this.state.toolcurrency;
      ToolDetails.toolAdComment = this.state.toolAdComment;

      AsyncStorage.setItem('ToolAvailableData', JSON.stringify(ToolDetails)); 
      console.log("\n\n\n Final Value here ",ToolDetails);
      this.TOOLAVAILABILITY();
    });
    
    
    //this.TOOLAVAILABILITY();
    
  }
  ShowcaseSkip() {
    Actions.ShowcaseSkip()
  }
  render () {
    _navigator = this.props.navigator;
    return (
      <View style={styles.parentContainer}>
        <ToolbarAndroid
          title='PROMOTE YOUR TOOL'
          navIcon={require('../images/arrowback.png')}
          onIconClicked={() => this.props.navigator.pop()}
          style={styles.toolbar}
          titleColor='white'/>
     
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{alignItems:'center',backgroundColor:'rgba(255,255,2550,1)'}}>
       <ImageBackground source={require('../images/1.png')} style={{height:130,width:'100%',}}>
            <Text style= {{ textAlign: 'center',fontSize: 25, color: "#fff",marginLeft:10, marginTop: 45}}>PROMOTE YOUR TOOL</Text>
          </ImageBackground>
             <View style={{backgroundColor:'rgba(255,255,2550,1)',justifyContent:'space-between',alignItems:'center',paddingBottom:Platform.OS=='ios' ? isIphoneX() ? 0:50:0}}>
             <Text style= {{ fontSize: 20, color: "#000", marginTop: 10, width:300}}>TOOL DESCRIPTION</Text>

          <View style={styles.sectionStyle}>
            <TextInput style={styles.inputBox} underlineColorAndroid="transparent"  
              selectionColor="#000" keyboardType="email-address" returnKeyType="next" 
              onSubmitEditing={() => { this.toolname.focus(); }}
              value = {this.state.toolDiscription} onChangeText={toolDiscription => this.setState({toolDiscription})}/>
          </View>

           <Text style= {{ fontSize: 20, color: "#000", marginTop: 10, width:300}}>RENT</Text>
           <View style={{ flexDirection:'row'}}>
              <View  pointerEvents="none">
                <TextInput style={{fontSize: 15, color: "#000", margin:10, width:15}} underlineColorAndroid="transparent" placeholder="$" 
                  placeholderTextColor = '#8E8C90' selectionColor="#000" keyboardType="email-address" returnKeyType="next" 
                  onSubmitEditing={() => { this.toolname.focus(); }}/>
              </View>

              <TextInput style={{ borderColor: '#000000',  borderWidth: 1, fontSize: 20, color: "#000", margin:10, width:100}} 
                  underlineColorAndroid="transparent" placeholder=""  placeholderTextColor = '#8E8C90' selectionColor="#000" 
                  keyboardType="email-address" returnKeyType="next" onSubmitEditing={() => { this.toolname.focus(); }} 
                  value = {this.state.toolcurrency} onChangeText={toolcurrency => this.setState({toolcurrency})}/>
    
              <View style={{ borderColor: '#000000',  borderWidth: 0.5, margin:10, width:100}}>
                  <Picker
                    selectedValue={this.state.toolRentCategory}
                    mode="dropdown"
                    onValueChange={(itemValue, itemIndex) => this.setState({toolRentCategory: itemValue})} >

                    <Picker.Item label="/Day" value="Day" />
                    <Picker.Item label="/Hour" value="Hour" />
                    <Picker.Item label="/Week" value="Week" />
                  </Picker>
              </View>
            </View>

         <Text style= {{ fontSize: 20, color: "#000", marginTop: 10, width:300}}>USAGE RULES</Text>
          <View style={styles.sectionStyle}>
          <TextInput style={styles.inputBox} underlineColorAndroid="transparent"  selectionColor="#000" keyboardType="email-address" 
            returnKeyType="next" onSubmitEditing={() => { this.toolname.focus(); }} value = {this.state.toolUsageRules}
            onChangeText={toolUsageRules => this.setState({toolUsageRules})}/>
           </View>
           <Text style= {{ fontSize: 20, color: "#000", marginTop: 10, width:300}}>ADDITIONAL COMMENTS</Text>
          <View style={styles.sectionStyle}>
          <TextInput style={styles.inputBox} underlineColorAndroid="transparent"  selectionColor="#000" keyboardType="email-address"
           returnKeyType="next" onSubmitEditing={() => { this.toolname.focus(); }} value = {this.state.toolAdComment}
           onChangeText={toolAdComment => this.setState({toolAdComment})}/>
           </View>
         <View style={{marginTop:30, marginBottom:width(1),justifyContent:'center',alignItems:'flex-start',}}>
         <View style={{width:width(80),height:width(12),alignItems:'center'}}>
         
         <TouchableOpacity style={styles.button} onPress={() =>this.redirectToolAvailability()} >
          <Text style={styles.buttonText} onPress={() =>this.redirectToolAvailability()}>Next:Tool Availability</Text>
        </TouchableOpacity>
           </View>
          </View>
        </View>
       </ScrollView>
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
 picker: {
    width: 280,
    height: 40,
    color:'#000000'  
  
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
 button : {
    width: 300,
    height: 50,
    backgroundColor: '#FC7100',
   
    paddingVertical: 13,
  },

  buttonText: {
    fontSize: 20,
    fontWeight: '500',
    color: '#ffffff',
    textAlign: 'center',
  },
 sectionStyle: {
    flexDirection: 'row',   
    alignItems: 'center',
    width: 300,    
    height: 140,   
    borderColor: '#000000',
    borderWidth: 0.5,
    flexDirection:'row', 
    margin: 10
},
inputBox: {
    width: 300,
    height: 140,  
    color:'#000',  
 
  },
});



