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
  NetInfo,
  AsyncStorage
} from 'react-native';

import {Actions} from 'react-native-router-flux';
import StdBtn from '../components/StdBtn';
import { height, width, isIphoneX } from '../common/confignew';
import { DatePickerDialog } from 'react-native-datepicker-dialog'; 
import moment from 'moment';
import config from '../common/config';
import Spinner from 'react-native-loading-spinner-overlay';

var _navigator;
export default class ToolDetailspage extends Component {
   constructor(props){
    super(props);
    this.state = {
      PickerValueHolder : '', 
      toolCategory : 'Select',
      toolName : 'Select',
      toolCatList : [],
      toolNameList : [],
      address : [],
      street : '',
      city : '',
      zipcode : '',
      state : '',
      make : '',
      model : '',
      toolcondition : '',
      toolCatID : 0,
      toolNameID : 0,
      token : ''
      
    }
    AsyncStorage.getItem("token").then((value) => {
      console.log("\n\n\n userIduserIduserIduserIduserId === ",JSON.parse(value));
      this.setState({
        token : JSON.parse(value)
      })
    });
  }

  TOOLAVAILABILITY() {
    Actions.TOOLAVAILABILITY()
  }

  ShowcaseSkip() {
    Actions.ShowcaseSkip()
  }
  toolDetailSubmit(){
    var yourToolDetail = {
      city : this.state.city,
      street : this.state.street,
      state : this.state.state,
      zipcode :  this.state.zipcode,
      model : this.state.model,
      make : this.state.make,
      toolNameID :this.state.toolNameID,
      toolCatID : this.state.toolCatID,
      toolcondition : this.state.toolcondition,
      toolName : this.state.toolName
    }
    
    console.log("city called",yourToolDetail);
    AsyncStorage.setItem('ToolDetails', JSON.stringify(yourToolDetail)); 
    Actions.PromoteYourTool()
  }

  componentDidMount(){
    console.log("Called Here...");
    AsyncStorage.getItem("Address").then((value) => {
      console.log("\n\n\n 1122334455 === ",JSON.parse(value));
      var addressDetail = JSON.parse(value);
      this.setState({
          address: value,
          street : addressDetail.streetName,
          city : addressDetail.locality,
          state : addressDetail.adminArea,
          zipcode : addressDetail.postalCode
      });

  });
  console.log("Called Here 2222...");
  
    this.fetchCategory();
  }

  fetchCategory(){
    NetInfo.isConnected.fetch().then(isConnected => 
    {
      console.log('\n\n\n 112233 First, is ' + (isConnected ? 'online' : 'offline'));
      if(isConnected)
      {
        this.setState({IsLoaderVisible: true})
        var URL=config.BASE_URL+'ToolsConfiguration/GetCategory?token='+this.state.token;
        console.log(URL);  
      fetch(URL,
      {
          method: 'GET',
          headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                  },
      }).then((response) => response.json())
        .then((responseJson) => 
        {
          
          console.log("JsonDATA",responseJson);
          this.setState({IsLoaderVisible: false})
          var data = responseJson.data;
          console.log("Data is == ",data);
          this.setState({
            toolCatList : data ,
            toolCategory : data[0].text,
            toolCatID :  data[0].value
          });
          this.fetchToolNames(data[0].text);
          //this.redirect();
        
        }).catch((error) => 
          {
              console.error(error);
          });

      }
      else 
      {
              alert('Network not available');
      }
    });
  }

fetchToolNames(catName){
    var catId = 0;
    for(var i=0; i< this.state.toolCatList.length; i++){
      if(this.state.toolCatList[i].text == catName){
          // this.setState({
          //     pickerValue : this.state.langListName[i].value
          // })
          // console.log("IFFFFFF this.state.langListName[i].languageName",this.state.langListName[i].languageName);
          catId = this.state.toolCatList[i].value;
      }
      else{
          console.log("ELSE   this.state.langListName[i].languageName",this.state.toolCatList);
      }

  }
  console.log("catIdcatId",catId,catName);
    NetInfo.isConnected.fetch().then(isConnected => 
    {
      console.log('\n\n\n 112233 First, is ' + (isConnected ? 'online' : 'offline'));
      if(isConnected)
      {
        this.setState({IsLoaderVisible: true})
        var URL=config.BASE_URL+'ToolsConfiguration/GetToolName?token='+this.state.token+'&catId='+catId;
        console.log(URL);  
      fetch(URL,
      {
          method: 'GET',
          headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                  },
      }).then((response) => response.json())
        .then((responseJson) => 
        {
          
          console.log("JsonDATA",responseJson);
          this.setState({IsLoaderVisible: false})
          var data = responseJson.data;
          console.log("Data is == ",data);
          this.setState({
            toolNameList : data,
            toolName : data[0].text,
            toolNameID :  data[0].value
            
          });
          //this.redirect();
        
        }).catch((error) => 
          {
              console.error(error);
          });

      }
      else 
      {
              alert('Network not available');
      }
    });
}


  render () {
   
    _navigator = this.props.navigator;
    return (
      <View style={styles.parentContainer}>
      <Spinner visible={this.state.IsLoaderVisible} />
      
        <ToolbarAndroid
          title='DETAILS ABOUT YOUR TOOL'
          navIcon={require('../images/arrowback.png')}
          onIconClicked={() => this.props.navigator.pop()}
          style={styles.toolbar}
          titleColor='white'/>
     
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{alignItems:'center',backgroundColor:'rgba(255,255,2550,1)'}}>
       <ImageBackground source={require('../images/1.png')} style={{height:130,width:'100%',}}>
            <Text style= {{ textAlign: 'center',fontSize: 25, color: "#fff",marginLeft:10, marginTop: 45}}>SHARE THE DETAILS ABOUT YOUR TOOL</Text>
          </ImageBackground>
             
             <View style={{backgroundColor:'rgba(255,255,2550,1)',justifyContent:'space-between',alignItems:'center',paddingBottom:Platform.OS=='ios' ? isIphoneX() ? 0:50:0}}>
             <Text style= {{ fontSize: 20, color: "#000", marginTop: 10, width:300}}>WHICH TOOL DO YOU OWN</Text>
            <View style={styles.sectionStyle} >
              <View style={{flex : 1, flexDirection : 'row'}}>
                <TextInput style={[styles.inputBox,{flex : .45}]}  placeholder="Tool Category" placeholderTextColor = '#8E8C90' selectionColor="#000" keyboardType="email-address" returnKeyType="next" onSubmitEditing={() => { this.toolname.focus(); }} onChangeText={toolcateogry => this.setState({toolcateogry})}/>
                <Text style={{flex : .4,justifyContent:'center',alignItems:'center', alignSelf : 'center', textAlign : 'right', fontSize : 11}}> {this.state.toolCategory}</Text>
                <Picker
                  selectedValue={this.state.toolCategory}
                  style={{ height: 50, width: 50, flex : .15, top :5 }}
                  onValueChange={(itemValue, itemIndex) => {
                    this.setState({toolCategory: itemValue});
                    this.fetchToolNames(itemValue);
                  }}>
                  {this.state.toolCatList.map((key, index) => {
                      return <Picker.Item key={index} value={key.text} label={key.text} />
                  })}
                </Picker>
              </View>
          </View>

          <View style={styles.sectionStyle} >
              <View style={{flex : 1, flexDirection : 'row'}}>
                <TextInput  style={[styles.inputBox,{flex : .55, }]} placeholder="Tool Name" placeholderTextColor = '#8E8C90' selectionColor="#000" keyboardType="email-address" returnKeyType="next" onSubmitEditing={() => { this.make.focus(); }} onChangeText={toolname => this.setState({toolname})}/>
                
                <Text style={{flex : .3,justifyContent:'center',alignItems:'center', alignSelf : 'center', textAlign : 'right', fontSize : 11}}> {this.state.toolName}</Text>
                <Picker
                  selectedValue={this.state.language}
                  style={{ height: 50, width: 50, alignSelf : 'center', flex : .15, }}
                  onValueChange={(itemValue, itemIndex) => this.setState({toolName: itemValue})}>
                  {this.state.toolNameList.map((key, index) => {
                      return <Picker.Item key={index} value={key.text} label={key.text} />
                  })}
                </Picker>
              </View>
          </View>

            <View style={styles.sectionStyle}>
          <TextInput style={styles.inputBox} underlineColorAndroid="transparent" placeholder="Make" placeholderTextColor = '#8E8C90' 
            selectionColor="#000" keyboardType="email-address" returnKeyType="next" onSubmitEditing={() => { this.model.focus(); }} 
            value={this.state.make} onChangeText={make => this.setState({make})}/>
           </View>
             <View style={styles.sectionStyle}>
          <TextInput style={styles.inputBox} underlineColorAndroid="transparent" placeholder="Model" placeholderTextColor = '#8E8C90' 
            selectionColor="#000" keyboardType="email-address" returnKeyType="next" onSubmitEditing={() => { this.toolcondition.focus(); }} 
            value={this.state.model} onChangeText={model => this.setState({model})}/>
           </View>

            <View style={styles.sectionStyle}>
          <TextInput style={styles.inputBox} underlineColorAndroid="transparent" placeholder="Tool Condition" placeholderTextColor = '#8E8C90' 
            selectionColor="#000" keyboardType="email-address" returnKeyType="next" onSubmitEditing={() => { this.address.focus(); }} 
            value={this.state.toolcondition} onChangeText={toolcondition => this.setState({toolcondition})}/>
           </View>
          
         <Text style= {{ fontSize: 15, color: "#000", marginTop: 45, width:300}}>YOUR LOCATION</Text>
    <View style={styles.sectionStyle}>
          <TextInput style={styles.inputBox} underlineColorAndroid="transparent" placeholder="Street Address" placeholderTextColor = '#8E8C90' 
            selectionColor="#000" keyboardType="email-address" returnKeyType="next" onSubmitEditing={() => { this.city.focus(); }}  
            value={this.state.street} onChangeText={street => this.setState({street})}/>
           </View> 

           <View style={styles.sectionStyle}>
          <TextInput style={styles.inputBox} underlineColorAndroid="transparent" placeholder="City" placeholderTextColor = '#8E8C90' 
            selectionColor="#000" keyboardType="email-address" returnKeyType="next" onSubmitEditing={() => { this.state.focus(); }} 
            value={this.state.city}  onChangeText={city => this.setState({city})}/>
           </View>   

           <View style={styles.sectionStyle}>
          <TextInput style={styles.inputBox} underlineColorAndroid="transparent" placeholder="State" placeholderTextColor = '#8E8C90' 
            selectionColor="#000" keyboardType="email-address" returnKeyType="next" onSubmitEditing={() => { this.zipcode.focus(); }} 
            value={this.state.state} onChangeText={state => this.setState({state})}/>
           </View> 

           <View style={styles.sectionStyle}>
          <TextInput style={styles.inputBox} underlineColorAndroid="transparent" placeholder="Zip Code" placeholderTextColor = '#8E8C90' 
            selectionColor="#000"  keyboardType="email-address" returnKeyType="next" onSubmitEditing={() => { this.toolname.focus(); }} 
            value={this.state.zipcode} onChangeText={zipcode => this.setState({zipcode})}/>
           </View> 
        <TouchableOpacity onPress={() =>this.toolDetailSubmit()}   style={styles.button}>
          <Text style={styles.buttonText} onPress={() =>this.toolDetailSubmit()}>Submit</Text>
        </TouchableOpacity>
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
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,    
    height: 40,    
    margin: 10,
    borderBottomColor: '#000', 
    borderBottomWidth: 1,
},
inputBox: {
    width: 280,
    height: 40,
    paddingHorizontal: 16,
     marginVertical: 10,
     color:'#000',
  },
});



