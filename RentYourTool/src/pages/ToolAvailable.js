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
  NetInfo,
  ImageBackground,
  AsyncStorage,
  ToastAndroid
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import StdBtn from '../components/StdBtn';
import { height, width, isIphoneX } from '../common/confignew';
import { DatePickerDialog } from 'react-native-datepicker-dialog'; 
import moment from 'moment';
import config from '../common/config';
import Spinner from 'react-native-loading-spinner-overlay';

var availableData;
var _navigator;
export default class ToolAvailable extends Component {

  constructor(props){
    super(props);
    this.state = {
      DateText: '',
      SDateText:'',
      SDateHolder: null,
      DateHolder: null,
    }
    AsyncStorage.getItem("userId").then((value) => {
      console.log("\n\n\n userIduserIduserIduserIduserId === ",JSON.parse(value));
      this.setState({
        userId : value
      })
    });
    AsyncStorage.getItem("token").then((value) => {
      console.log("\n\n\n userIduserIduserIduserIduserId === ",JSON.parse(value));
      this.setState({
        token : JSON.parse(value)
      })
    });
    AsyncStorage.getItem("ToolAvailableData").then((value) => {
      availableData = JSON.parse(value);
      console.log("\n\n\n yes you can call API === ",availableData);
    });
  }

  publishToolProfile(){

    console.log("\n\n\n availableData final called === ",availableData);
    console.log("\n\n\n publishToolProfile final called === ",this.state.dobDate);
    

    NetInfo.isConnected.fetch().then(isConnected => 
      {
        console.log('\n\n\n 112233 First, is ' + (isConnected ? 'online' : 'offline'));
        if(isConnected)
        {
          this.setState({IsLoaderVisible: true})
          var URL=config.BASE_URL+'ToolsConfiguration/RegisterTool?token='+this.state.token;
          console.log(URL);  
        fetch(URL,
        {
            method: 'POST',
            headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json',
                      
                    },
                    body: JSON.stringify(
                      {
                        toolName: availableData.toolName,
                        toolCatId: availableData.toolCatID,
                        toolMake: availableData.make,
                        toolModel: availableData.model,
                        toolCondition: availableData.toolcondition,
                        toolDsc: availableData.toolDiscription,
                        toolStreet: availableData.street,
                        toolCity: availableData.city,
                        toolSate: availableData.state,
                        toolZip: availableData.zipcode,
                        userId: this.state.userId,
                        toolRentCurrencyValue: availableData.toolcurrency,
                        toolRentType: 1,
                        toolUseRule:availableData.toolUsageRules,
                        toolAdditionalComment: availableData.toolAdComment,
                        toolAdvanceNotice: "1", // static we will change once API done
                        toolShortestDuration: this.state.dobDate,//"2018-05-05T06:59:18.452Z",
                        toolLongestDuration: this.state.dobDate2,//"2018-05-05T06:59:18.452Z",
                        toolSubCatId: availableData.toolNameID
                      })
        }).then((response) => response.json())
          .then((responseJson) => 
          {
            this.setState({IsLoaderVisible: false})
            var data = responseJson.data;

            var toolInform = {};
            toolInform.toolRentCurrencyValue = data.toolRentCurrencyValue;
            toolInform.toolName = data.toolName;
            
            ToastAndroid.show('Your Tool Detail is Published !', ToastAndroid.SHORT);
            Actions.Dashboard({toolInform : toolInform});
            
          }).catch((error) => 
            {
            ToastAndroid.show('Your Tool Detail is not Published !', ToastAndroid.SHORT);
                
                console.error("error",error);
            });

            

            this.setState({IsLoaderVisible: false})
            
        }
        else 
        {
                alert('Network not available');
        }
      });
  }

  SDatePickerMainFunctionCall = () => {
 
    let SDateHolder = this.state.SDateHolder;
 
    if(!SDateHolder || SDateHolder == null){
 
      SDateHolder = new Date();
      this.setState({
        SDateHolder: SDateHolder
      });
    }
      //To open the dialog
    this.refs.SDatePickerDialog.open({
 
      date: SDateHolder,
 
    });
 
  }

   SonDatePickedFunction = (date) => {
     console.log(date);
    this.setState({
      dobDate2: date,
      SDateText: moment(date).format('DD-MMM-YYYY')
    });
  }

  DatePickerMainFunctionCall = () => {
 
    let DateHolder = this.state.DateHolder;
 
    if(!DateHolder || DateHolder == null){
 
      DateHolder = new Date();
      this.setState({
        DateHolder: DateHolder
      });
    }
     //To open the dialog
    this.refs.DatePickerDialog.open({
 
      date: DateHolder,
 
    });
 
  }
  /**
   * Call back for dob date picked event
   *
   */
  onDatePickedFunction = (date) => {
    console.log("date ==== ",date);
    this.setState({
      dobDate: date,
      DateText: moment(date).format('DD-MMM-YYYY')
    });
  }

  ShowcaseSkip() {
    Actions.ShowcaseSkip()
  }
  render () {
    let data = [{
      value: '12 hrs',
    }, {
      value: '1 day',
    }, {
      value: '2 days',
    },
    {
      value: '5 days',
    },
    {
      value: '1 week',
    }];
    _navigator = this.props.navigator;
    return (
      <View style={styles.parentContainer}>
      <Spinner visible={this.state.IsLoaderVisible} />
      
        <ToolbarAndroid
          title='TOOL AVAILABILITY'
          navIcon={require('../images/arrowback.png')}
          onIconClicked={() => this.props.navigator.pop()}
          style={styles.toolbar}
          titleColor='white'/>
     
        <ImageBackground source={require('../images/1.png')} style={{height:130,width:'100%',}}>
            <Text style= {{textAlign: 'center',fontSize: 25, color: "#fff",marginLeft:10, marginTop: 45}}>DEFINE AVAILABILITY RULES FOR YOUR TOOL</Text>
          </ImageBackground>
          <View style={{backgroundColor:'rgba(255,255,2550,1)',justifyContent:'space-between',alignItems:'center',paddingBottom:Platform.OS=='ios' ? isIphoneX() ? 0:50:0}}>
          <Text style= {{ fontSize: 15, color: "#000", marginTop: 45, width:300}}>HOW MUCH ADVANCE NOTICE DO YOU NEED TO CONFIRM THE RENT REQUEST?</Text>
       <View style={styles.sectionStyle}>
      <Picker style = { styles.picker }
        selectedValue={this.state.PickerValueHolder}
        mode="dropdown"
        onValueChange={(itemValue, itemIndex) => this.setState({PickerValueHolder: itemValue})} >

        <Picker.Item label="Select Advance Notice" value="Select Advance Notice" />
        <Picker.Item label="12 hrs" value="12 hrs" />
        <Picker.Item label="1 day" value="1 day" />
        <Picker.Item label="2 days" value="2 days" />
        <Picker.Item label="5 days" value="5 days" />
        <Picker.Item label="1 week" value="1 week" />
    
 
      </Picker>
           </View>

           <Text style= {{ fontSize: 15, color: "#000", marginTop: 10, width:300}}>Block requests that don’t give you enough advance notice</Text>
            <Text style= {{ fontSize: 15, color: "#000", marginTop: 30, width:300}}>WHAT SHOULD BE THE RENT DURATION FOR YOUR TOOL</Text>
       
     
         <TouchableOpacity onPress={this.DatePickerMainFunctionCall.bind(this)} >
 
            <View style={styles.sectionStyle}>
 
              <Text style={styles.inputBox} placeholder="Select Shortest duration"placeholderTextColor = '#000000'>{this.state.DateText}</Text>
 
            </View>
 
          </TouchableOpacity>
            <DatePickerDialog ref="DatePickerDialog" onDatePicked={this.onDatePickedFunction.bind(this)} />
        
        <TouchableOpacity onPress={this.SDatePickerMainFunctionCall.bind(this)} >
 
            <View style={styles.sectionStyle}>
 
              <Text style={styles.inputBox}placeholder="Select Longest duration"placeholderTextColor = '#8E8C90'>{this.state.SDateText}</Text>
 
            </View>
 
          </TouchableOpacity>
            <DatePickerDialog ref="SDatePickerDialog" onDatePicked={this.SonDatePickedFunction.bind(this)} />
        
      

        <View style={{marginTop:10,justifyContent:'center',alignItems:'flex-start',}}>
          <TouchableOpacity onPress={()=> this.publishToolProfile()}  style={{backgroundColor: '#fe7a18', marginBottom : 30, height :50}} >
            <View style={{width:width(80),height:width(12),alignItems:'center', flex : 1, justifyContent : 'center',  alignContent : 'center'}}>
              <Text style={{fontSize : 18, color : '#fff', justifyContent : 'center', textAlign : 'center', alignContent : 'center'}}>Publish Tool Proﬁle</Text>
                {/* <StdBtn text="Publish Tool Proﬁle" onPress={()=> this.publishToolProfile()} backColor="#ED8038" textColor="white" withShadow={true}/> */}
            </View>
          </TouchableOpacity>
          
        </View>
      </View>
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
  sectionStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,    
    height: 40,    
    margin: 10
},
inputBox: {
    width: 280,
    height: 40,
    color:'#000',
    borderBottomColor: '#000', 
    borderBottomWidth: 1,
  
  },
});



