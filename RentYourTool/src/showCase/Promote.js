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

import moment from 'moment';
import {Actions} from 'react-native-router-flux';   //Actions Used for navigation
import Icon from 'react-native-vector-icons/FontAwesome';   //For Icon Used for back step as pop.
import { Header } from 'react-native-elements';    //For Header.
import { headerBackgroundColor, buttonBackgroundColor } from '../styles';  //common BackgroundColor style for Header.
import TextInputMask from 'react-native-text-input-mask';

import StdBtn from '../components/StdBtn';
import { height, width, isIphoneX } from '../common/confignew';
var _navigator;

export default class Promote extends Component {
  constructor(props){
    super(props);
    console.log(props.data, 'rana')
    this.state = {
      PickerValueHolder : '', 
      promoteToolDetail : {},
      toolDiscription : props.data === undefined ? '' : props.data.toolDsc,
      warningDescription: props.data === undefined ? '* Please enter a minimum of 50 characters.' : '',
      warningUsage: props.data === undefined ? '* Please enter a minimum of 50 characters.' : '',
      warningHourly: props.data === undefined ? '* Required field.' : '',
      warningDaily: props.data === undefined ? '* Required field.' : '',
      toolRentCategory : '',
      toolUsageRules: props.data === undefined ? '' : props.data.toolUseRule,     
      toolcurrency : '',
      toolAdComment : props.data === undefined ? '' : props.data.toolAdditionalComment,
      warningComment: '',
      toolHourlyRate: props.data === undefined ? '' : props.data.hourlyRate,
      toolDailyRate : props.data === undefined ? '' : props.data.dalyRate,
    }
  }

  componentDidMount(){
    //this.redirectToolAvailability();
  }

  redirectToolAvailability(){
    const { toolDiscription, toolRentCategory, toolHourlyRate, toolAdComment, toolUsageRules } = this.state;

    if(toolDiscription === ''){
      this.setState({
        warningDescription : '* Please enter a minimum of 50 characters.'
      })
    } else if( toolDiscription.length < 50) {
      this.setState({
        warningDescription : '* Please enter a minimum of 50 characters.'
      })
    }else if(toolUsageRules === ''){
      this.setState({
        warningUsage : '* Please enter a minimum of 50 characters.'
      })
    } else if( toolUsageRules.length < 50){
      this.setState({
        warningUsage : '* Please enter a minimum of 50 characters.'
      })
     } else {
      var ToolDetails = {};
      AsyncStorage.getItem("ToolDetails").then((value) => {
        ToolDetails = JSON.parse(value);
        ToolDetails.toolDiscription = this.state.toolDiscription;
        ToolDetails.toolRentCategory = this.state.toolRentCategory;
        ToolDetails.toolUsageRules = this.state.toolUsageRules;
        ToolDetails.toolcurrency = this.state.toolHourlyRate;
        ToolDetails.toolHourlyRate = this.state.toolHourlyRate;
        ToolDetails.toolDailyRate = this.state.toolDailyRate;
        ToolDetails.toolAdComment = this.state.toolAdComment;
        AsyncStorage.setItem('ToolAvailableData', JSON.stringify(ToolDetails));
        this.props.data === undefined ? Actions.TOOLAVAILABILITY() : Actions.push('TOOLAVAILABILITY', { data : this.props.data } );
      });
    }
  }

  ShowcaseSkip() {
    Actions.ShowcaseSkip()
  }

  render () {
    //for Header in Left Side
    console.log(this.state.toolHourlyRate.length, 'TT')
    var apna = '';
    if(this.state.toolHourlyRate.length < 3){
        apna = "[0].[00]"
    } else if(this.state.toolHourlyRate.length < 4) {
      apna = "[00].[00]"
    } else if(this.state.toolHourlyRate.length < 5){
        apna = "[000].[00]"
      
    } else {
        apna = "[000].[00]"
    }
    
    console.log(this.state.toolDailyRate.length, 'daily')
    var daily = '';
    if(this.state.toolDailyRate.length < 3){
        daily = "[0].[00]"
    } else if(this.state.toolDailyRate.length < 4) {
      daily = "[00].[00]"
    } else if(this.state.toolDailyRate.length < 5){
        daily = "[000].[00]"
      
    } else {
        daily = "[000].[00]"
    }

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
          outerContainerStyles={{ height: 56 }}
          backgroundColor={headerBackgroundColor}
          placement="left"
          leftComponent={<LeftComponent />}
          centerComponent={{ text: 'PROMOTE YOUR TOOL', style: { color: '#fff', fontWeight: 'bold', fontSize:18, } }}
          rightComponent={<RightComponent/>}
        />

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{alignItems:'center', backgroundColor:'rgba(255,255,2550,1)'}}>
          <ImageBackground source={require('../images/screen5.png')} style={{height:130,width:'100%',}}>
            <Text style= {{ textAlign: 'center',fontSize: 25, color: "#fff",marginLeft:10, marginTop: 45}}>PROMOTE YOUR TOOL</Text>
          </ImageBackground>

          <View style={{backgroundColor:'rgba(255,255,2550,1)', marginLeft: 10, marginTop: 10, justifyContent:'space-between', paddingBottom:Platform.OS=='ios' ? isIphoneX() ? 0:50:0}}>
            <Text style= {{ fontSize: 20, color: "#000", marginTop: 10, width:300}}>
              TOOL DESCRIPTION
            </Text>
            <View style={styles.sectionStyle}>
              <TextInput
                underlineColorAndroid="transparent"
                placeholder="Enter Text here..."
                selectionColor="#000"
                keyboardType="email-address"
                style={{ backgroundColor: 'white' }}
                multiline = {true}
                selectionColor="lightgray"
                returnKeyType="next" 
                value = {this.state.toolDiscription}
                onChangeText={toolDiscription=> {
                  this.setState({toolDiscription: toolDiscription })
                  if(toolDiscription === ''){
                    this.setState({ warningDescription : '* Required field.' })
                  }else{
                    this.setState({ warningDescription : '' })
                  }
                }}
              />
            </View>
            <Text style={{ color: 'red', marginBottom: 20 }}>{this.state.warningDescription}</Text>


            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={{ flex: 1 }}>
                <Text style={{ fontWeight: 'bold'}}>HOURLY RATE</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                    <Text>$ </Text>
                    <TextInputMask
                      placeholder="000.00"
                      style={{ textAlign: 'right', height: 40, width: 100, borderColor: 'black', borderWidth: .5}}
                      onChangeText={(hourlyRate) => {
                        this.setState({
                          toolHourlyRate : hourlyRate
                        })
                          if(hourlyRate === ''){
                            this.setState({ warningHourly : '* Required Field.' })
                          }else{
                            this.setState({ warningHourly : '' })
                          }
                      }}
                      value={this.state.toolHourlyRate}
                      maxLength={6}
                      underlineColorAndroid="transparent"
                      mask={apna}
                      onEndEditing={() => {
                        const total = this.state.toolHourlyRate;
                        console.log(total, 'Total')
                          var floatvalue = Number.parseFloat(total).toFixed(2)
                          console.log(floatvalue, 'FV')
                          
                          if(total === ''){
                            this.setState({
                              warningHourly: '* Required Field.'
                            })
                          } else {
                            console.log(floatvalue, 'Last')
                            this.setState({
                              toolHourlyRate: floatvalue,
                            })
                          }
                      }}
                    />
                  </View>
                  <Text style={{ color: 'red', marginBottom: 20 }}>{this.state.warningHourly}</Text>
                  
              </View>
              <View style={{ flex: 1, marginLeft: 73 }}>
                <Text style={{ fontWeight: 'bold' }}>DAILY RATE</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                  <Text>$ </Text>
                  <TextInputMask
                    placeholder="000.00"
                    style={{ textAlign: 'right', height: 40, width: 100, borderColor: 'black', borderWidth: .5}}
                    onChangeText={(dailyRate) => this.setState({toolDailyRate : dailyRate})}
                    value={this.state.toolDailyRate}
                    maxLength={6}
                    underlineColorAndroid="transparent"
                    mask={daily}
                    onEndEditing={() => {
                      const total = this.state.toolDailyRate
                        var floatvalue = Number.parseFloat(total).toFixed(2)
                        
                        if(total === ''){
                          this.setState({
                            warningDaily: '* Required Field.'
                          })
                        } else {
                        this.setState({
                          toolDailyRate: floatvalue,
                          warningDaily: ''
                        })
                    }
                    }}
                  />
                  </View>
                  <Text style={{ color: 'red', marginBottom: 20 }}>{this.state.warningDaily}</Text>
              </View>
            </View>
 
  
            <Text style= {{ fontSize: 20, color: "#000", width:300}}>USAGE RULES</Text>
            <View style={styles.sectionStyle}>
              <TextInput
                placeholder="Enter Text here..."
                underlineColorAndroid="transparent"
                selectionColor="lightgray"
                selectionColor="#000"
                keyboardType="email-address" 
                returnKeyType="next"
                multiline = {true}
                value = {this.state.toolUsageRules}
                onChangeText={toolUsageRules=> {
                  this.setState({toolUsageRules: toolUsageRules })
                  if(toolUsageRules === ''){
                    this.setState({ warningUsage : '* Required field.' })
                  }else{
                    this.setState({ warningUsage : '' })
                  }
                }}
              
              />
            </View>
            <Text style={{ color: 'red', marginBottom: 10, left: 0 }}>{this.state.warningUsage}</Text>

            <Text style= {{ fontSize: 20, color: "#000", marginTop: 10, width:300}}>ADDITIONAL COMMENTS</Text>
            <View style={styles.sectionStyle}>
              <TextInput
                placeholder="Enter Text here..."
                underlineColorAndroid="transparent"
                selectionColor="lightgray"
                selectionColor="#000"
                keyboardType="email-address"
                returnKeyType="next"
                multiline = {true}
                value = {this.state.toolAdComment}
                onChangeText={toolAdComment => this.setState({toolAdComment})}
              />
            </View>

            <View style={{ marginTop: 30, marginBottom: 30}}>
              <TouchableOpacity style={styles.button} onPress={() =>this.redirectToolAvailability()} >
                <Text style={styles.buttonText}>
                  Next:Tool Availability
                </Text>
              </TouchableOpacity>
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
  MainContainer : {
    justifyContent: 'center',
    alignItems: 'center', 
    flex:13
  },
  picker: {
    width: 280,
    height: 40,
    color:'#000000',
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
    marginBottom:10 
  },
  buttonText: {
    fontSize: 20,
    fontWeight: '500',
    color: '#ffffff',
    textAlign: 'center',
  },
  sectionStyle: {
    width: 300,    
    height: 140,   
    borderColor: '#000000',
    borderWidth: 0.5,
  },
});
