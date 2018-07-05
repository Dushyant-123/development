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
import StdBtn from '../components/StdBtn';
import { height, width, isIphoneX } from '../common/confignew';
import { DatePickerDialog } from 'react-native-datepicker-dialog'; 
import config from '../common/config';
import Spinner from 'react-native-loading-spinner-overlay';

import moment from 'moment';    //used for date time releated property.
import {Actions} from 'react-native-router-flux';   //Actions Used for navigation
import Icon from 'react-native-vector-icons/FontAwesome';   //For Icon Used for back step as pop.
import { Header } from 'react-native-elements';    //For Header.
import { headerBackgroundColor, buttonBackgroundColor } from '../styles';  //common BackgroundColor style for Header.
import LoadingComponent from '../components/LoadingComponent';

var availableData;
export default class ToolAvailable extends Component {
  constructor(props){
    super(props);
    console.log(props.data, 'Here')
    this.state = {
      toolAdvanceData : props.data === undefined ? [ { toolAdvanceNoticeValue: 'Select Advance :', id: "0" } ] : [ { toolAdvanceNoticeValue: props.data.toolAdvanceNoticeValue, id: props.data.toolAdvanceNotice } ],
      toolShortestDurationData: props.data === undefined ?  [ { toolShortestDuration: 'Select Shortest Duration :', tsdID: "0" } ] : [ { toolShortestDuration: props.data.toolShortestDurationValue, tsdID: props.data.toolShortestDuration } ],
      toolLongestDurationData:  props.data === undefined ? [ { toolLongestDuration: 'Select Longest Duration :', tldID: "0" } ] : [ { toolLongestDuration: props.data.toolLongestDurationValue, tldID: props.data.toolLongestDuration } ],
      STime: '',
      LTime:'',
      SDateHolder: null,
      DateHolder: null,
      PickerValueHolder : props.data === undefined ? '' : props.data.toolAdvanceNotice,
      SPickerValueHolder : props.data === undefined ? '' : props.data.toolShortestDuration,
      LPickerValueHolder : props.data === undefined ? '' : props.data.toolLongestDuration,     
      warningPickerValueHolder : props.data === undefined ? '* Required field.' : '',
      warningSPickerValueHolder : props.data === undefined ? '* Required field.' : '',
      warningLPickerValueHolder : props.data === undefined ? '* Required field.' : '',   
    }
    AsyncStorage.getItem("userId").then((value) => {
      this.setState({
        userId : value
      })
    });
    AsyncStorage.getItem("token").then((value) => {
      this.setState({
        token : JSON.parse(value)
      })
      this.toolAdvanceNotice();
      this.toolShortestDuration();
      this.toolLongestDuration();      
    });
    AsyncStorage.getItem("ToolAvailableData").then((value) => {
      availableData = JSON.parse(value);
    });
  }

  submitToolRegistation(){
    const { PickerValueHolder, SPickerValueHolder, LPickerValueHolder} = this.state;
    console.log(this.state, "Complete State");
    console.log(availableData, 'AVAIL DATA')
    var dateTime = new Date();
    dateTime = moment(dateTime).format("YYYY-MM-DD hh:mm:ss");
    console.log(dateTime, 'Tool Created Time')
    if(PickerValueHolder  === ''){
      this.setState({ warningPickerValueHolder : '* Select Advance Notice Time.'})
    } else if(SPickerValueHolder === '') {
      this.setState({ warningSPickerValueHolder : '* Select Shortest Duration Time for the Tool.'})
    } else if(LPickerValueHolder === '') {
      this.setState({ warningLPickerValueHolder : '* Select Longest Duration Time for the Tool.'})
    } else {
      NetInfo.isConnected.fetch().then(isConnected => {
        if(isConnected) {
            this.setState({IsLoaderVisible: true})
            var URL = '';
            {
              this.props.data === undefined ? URL=config.BASE_URL+'ToolsConfiguration/RegisterTool?token='+this.state.token+'&CommandType=insert' :
              URL=config.BASE_URL+'ToolsConfiguration/RegisterTool?token='+this.state.token+'&CommandType=update';
            }
            
            var toolId = '';
            {
              this.props.data === undefined ? toolId = 0 : toolId = this.props.data.toolId;
            }

            console.log(URL, toolId, availableData.toolName, availableData.make, availableData.model,
              availableData.toolDiscription , availableData.toolAddress, availableData.zipcode, 
              availableData.toolUsageRules, availableData.toolAdComment, availableData.toolcondition,
              this.state.PickerValueHolder, this.state.SPickerValueHolder, this.state.LPickerValueHolder,
              availableData.toolHourlyRate, availableData.toolDailyRate, 'Data before Send')
  
          fetch(URL, {
              method: 'POST',
              headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              toolId: toolId,
                toolName: availableData.toolName,
                toolCatId: 1,  //fixed it later
                toolMake: availableData.make,
                toolModel: availableData.model,
                toolCondition: 1,         //id of tool Condition id
                toolDsc: availableData.toolDiscription,
                toolAddress: availableData.toolAddress,
                toolStreet: 'string',
                toolCity: 'string',
                toolSate: 'string',
                toolZip: '201512',
                userId: Number(this.state.userId),
                toolRentCurrencyValue: 0,
                toolRentType: 0,
                toolUseRule:availableData.toolUsageRules,
                toolAdditionalComment: availableData.toolAdComment,
                toolAdvanceNotice: this.state.PickerValueHolder,       //id of advance Notice
                toolShortestDuration: this.state.SPickerValueHolder,    //id of shortest Duration
                toolLongestDuration: this.state.LPickerValueHolder,     //id of Longest Duration
                toolSubCatId: 1,
                toolStatus: true,
                createdDate: dateTime,
                editDate: dateTime,
                editBy: 'sys',
                createdBy: 'sys',
                toolConditionValue: availableData.toolcondition,  // value of all the field
                toolAdvanceNoticeValue: this.state.PickerValueHolder,
                toolShortestDurationValue: this.state.SPickerValueHolder,
                toolLongestDurationValue: this.state.LPickerValueHolder,
                hourlyRate: availableData.toolHourlyRate,
                dalyRate: availableData.toolDailyRate,
              })
          }).then((response) => response.json()).then((responseJson) => {
              console.log(responseJson, 'ResponseJson Ankit')
              if(responseJson.success){
                this.setState({IsLoaderVisible: false})
                var data = responseJson.data;
                var toolInform = {};
                toolInform.toolRentCurrencyValue = data.toolRentCurrencyValue;
                toolInform.toolName = data.toolName;
                ToastAndroid.show('Your Tool Detail is Published !', ToastAndroid.SHORT);
                {
                  this.props.data === undefined ? Actions.push('photoVideo', { data : data } ) : Actions.push('updatePhoto', { data : data[0] } );
                }
              }
            }).catch((error) => {
              ToastAndroid.show('Your Tool Detail is not Published !', ToastAndroid.SHORT);
              });
              this.setState({IsLoaderVisible: false})
          }
          else {
           Alert.alert('Network not available');
          }
        });
    }
  }

  toolAdvanceNotice(){
    console.log(this.state.token, 'TOKEN CHECK')
    NetInfo.isConnected.fetch().then(isConnected => {
      if(isConnected) {
        this.setState({IsLoaderVisible: true})
        var URL=config.BASE_URL+'ToolsConfiguration/GetToolAdvanceNotice?token='+this.state.token;
        console.log(URL, 'URL')
      fetch(URL, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      }).then((response) => response.json()).then((responseJson) => {
        if(responseJson.success){
          responseJson.data.map((item)=> {
            this.setState({
              toolAdvanceData : [...this.state.toolAdvanceData, item],
              IsLoaderVisible: false
            })
          })
        } else{
          IsLoaderVisible: false
        }
        }).catch((error) => {
          this.setState({
            IsLoaderVisible: false,
          })
          });
      } else {
        Alert.alert('Network not available');

      }
    });
  }
  toolShortestDuration(){
    NetInfo.isConnected.fetch().then(isConnected => {
      if(isConnected) {
        this.setState({IsLoaderVisible: true})
        var URL=config.BASE_URL+'ToolsConfiguration/GetToolShortestDurationList?token='+this.state.token;
        console.log(URL, 'URL')
      fetch(URL, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      }).then((response) => response.json()).then((responseJson) => {
        if(responseJson.success){
          responseJson.data.map((item)=> {
            this.setState({
              toolShortestDurationData : [...this.state.toolShortestDurationData, item],
              IsLoaderVisible: false
            })
          })
        } else{
          IsLoaderVisible: false
        }
        }).catch((error) => {
          this.setState({
            IsLoaderVisible: false,
          })
          });
      } else {
        Alert.alert('Network not available');
      }
    });
  }
  toolLongestDuration(){
    NetInfo.isConnected.fetch().then(isConnected => {
      if(isConnected) {
        this.setState({IsLoaderVisible: true})
        var URL=config.BASE_URL+'ToolsConfiguration/GetToolLongestDurationList?token='+this.state.token;
        console.log(URL, 'URL')
      fetch(URL, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      }).then((response) => response.json()).then((responseJson) => {
        if(responseJson.success){
          responseJson.data.map((item)=> {
            this.setState({
              toolLongestDurationData : [...this.state.toolLongestDurationData, item],
              IsLoaderVisible: false
            })
          })
        } else{
          IsLoaderVisible: false
        }
        }).catch((error) => {
          this.setState({
            IsLoaderVisible: false,
          })
          });
      } else {
        Alert.alert('Network not available');

      }
    });
  }

  

  ShowcaseSkip() {
    Actions.ShowcaseSkip()
  }
  render () {
    console.log(this.state)
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

    if(this.state.IsLoaderVisible){
      return(
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <LoadingComponent />
        </View>
      )
    }

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
          outerContainerStyles={{ height: 56 }}
          backgroundColor={headerBackgroundColor}
          placement="left"
          leftComponent={<LeftComponent />}
          centerComponent={{ text: 'TOOL AVAILABILITY', style: { color: '#fff', fontWeight: 'bold', fontSize:18, } }}
          rightComponent={<RightComponent/>}
        />
     
        <ImageBackground source={require('../images/screen6.png')} style={{height:130,width:'100%',}}>
          <Text style= {{textAlign: 'center',fontSize: 25, color: "#fff",marginLeft:10, marginTop: 45}}>DEFINE AVAILABILITY RULES FOR YOUR TOOL</Text>
        </ImageBackground>
        <ScrollView>
          <View style={{backgroundColor:'rgba(255,255,2550,1)',justifyContent:'space-between', paddingLeft: 35, paddingBottom:Platform.OS=='ios' ? isIphoneX() ? 0:50:0}}>
            <Text style= {{ fontSize: 15, color: "#000", marginTop: 30, width:300 }}>
              HOW MUCH ADVANCE NOTICE DO YOU NEED TO CONFIRM THE RENT REQUEST?
            </Text>
            <View style={styles.sectionStyle1}>
              <View style={{ width:10, height:40, backgroundColor:'#00B0E8'}} />
              <View style={styles.sectionStyle}>
                
                <Picker style = { styles.picker }
                  selectedValue={this.state.PickerValueHolder}
                  onValueChange={(itemValue, itemIndex) => {
                    this.setState({ PickerValueHolder: itemValue, })
                    if(itemIndex > 0){
                      this.setState({
                        warningPickerValueHolder: '',
                      })
                    }else if( itemIndex === 0 ){
                      this.setState({
                        warningPickerValueHolder: '* Required field.'
                      })
                    }
                  }}
                >
                  {
                    this.state.toolAdvanceData && this.state.toolAdvanceData.map((key, index) => {
                      return <Picker.Item key={index} value={key.id} label={key.toolAdvanceNoticeValue} />
                    })
                  }
                </Picker>
              </View>
            </View>
            <Text style={{ color: 'red', marginBottom: 10 }}>{this.state.warningPickerValueHolder}</Text>

            <Text style= {{ fontSize: 15, color: "#000", marginTop: 10, width:300}}>
              Block requests that don’t give you enough advance notice
            </Text>

            <Text style= {{ fontSize: 15, color: "#000", marginTop: 30, width:300}}>
              WHAT SHOULD BE THE RENT DURATION FOR YOUR TOOL
            </Text>

            <View style={styles.sectionStyle1}>
              <View style={{width:10,height:40, backgroundColor:'#00B0E8'}} />
                <View style={styles.sectionStyle}>
                  <Picker style = { styles.picker }
                    selectedValue={this.state.SPickerValueHolder}
                    onValueChange={(itemValue, itemIndex) => {
                      this.setState({ SPickerValueHolder: itemValue, })
                      if(itemIndex > 0){
                        this.setState({
                          warningSPickerValueHolder: '',
                        })
                      }else if( itemIndex === 0 ){
                        this.setState({
                          warningSPickerValueHolder: '* Required field.'
                        })
                      }
                    }}
                  >
                    {
                    this.state.toolShortestDurationData && this.state.toolShortestDurationData.map((key, index) => {
                      return <Picker.Item key={index} value={key.tsdID} label={key.toolShortestDuration} />
                    })
                  }
                  </Picker>
                </View>
              </View>
              <Text style={{ color: 'red', marginBottom: 10 }}>{this.state.warningSPickerValueHolder}</Text>

              <View style={styles.sectionStyle1}>
                <View style={{width:10, height:40, backgroundColor:'#00B0E8'}} />
                <View style={styles.sectionStyle}>
                  <Picker style = { styles.picker }
                    selectedValue={this.state.LPickerValueHolder}
                    onValueChange={(itemValue, itemIndex) => {
                      this.setState({ LPickerValueHolder: itemValue })
                      if(itemIndex > 0){
                        this.setState({
                          warningLPickerValueHolder: '',
                        })
                      }else if( itemIndex === 0 ){
                        this.setState({
                          warningLPickerValueHolder: '* Required field.'
                        })
                      }
                    } }
                  >
                    {
                    this.state.toolLongestDurationData && this.state.toolLongestDurationData.map((key, index) => {
                      return <Picker.Item key={index} value={key.tldID} label={key.toolLongestDuration} />
                    })
                  }                 
                  </Picker>
                </View>
              </View> 
              <Text style={{ color: 'red', marginBottom: 10 }}>{this.state.warningLPickerValueHolder}</Text>
              {
                this.props.data === undefined ? 
                  <View style={{marginTop:10,justifyContent:'center',alignItems:'flex-start',}}>
                    <TouchableOpacity onPress={()=> this.submitToolRegistation()}  style={{backgroundColor: '#fe7a18', marginBottom : 30, height :50}} >
                     <View style={{width:width(80),height:width(12),alignItems:'center', flex : 1, justifyContent : 'center',  alignContent : 'center'}}>
                        <Text style={{fontSize : 18, color : '#fff', justifyContent : 'center', textAlign : 'center', alignContent : 'center'}}>
                          Next: Tool Photos/Videos
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View> :
                  <View style={{marginTop:10,justifyContent:'center',alignItems:'flex-start',}}>
                    <TouchableOpacity onPress={()=> this.submitToolRegistation()}  style={{backgroundColor: '#fe7a18', marginBottom : 30, height :50}} >
                      <View style={{width:width(80),height:width(12),alignItems:'center', flex : 1, justifyContent : 'center',  alignContent : 'center'}}>
                        <Text style={{fontSize : 18, color : '#fff', justifyContent : 'center', textAlign : 'center', alignContent : 'center'}}>
                          Update Tool Record
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
              }

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
    color:'black',
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
  sectionStyle1: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,    
    height: 40,    
    margin: 10,
    marginBottom:0,
  },
  sectionStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,    
    height: 40,    
    margin: 10,
    marginLeft: 0,
    borderBottomColor: '#000', 
    borderBottomWidth: 1,
  },
  inputBox: {
    width: 280,
    height: 40,
    color:'#000',
    borderBottomColor: '#000', 
    borderBottomWidth: 1,
  
  },
});
