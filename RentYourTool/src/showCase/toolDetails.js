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
  ImageBackground,
  NetInfo,
  AsyncStorage,
  ToastAndroid
} from 'react-native';

import moment from 'moment';    //used for date time releated property.
import {Actions} from 'react-native-router-flux';   //Actions Used for navigation
import Icon from 'react-native-vector-icons/FontAwesome';   //For Icon Used for back step as pop.
import { Header } from 'react-native-elements';    //For Header.

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
 
const homePlace = { description: 'Home', geometry: { location: { lat: 48.8152937, lng: 2.4597668 } }};
const workPlace = { description: 'Work', geometry: { location: { lat: 48.8496818, lng: 2.2940881 } }};


import { headerBackgroundColor, buttonBackgroundColor } from '../styles';  //common BackgroundColor style for Header.

import config from '../common/config';
import StdBtn from '../components/StdBtn';
import { height, width, isIphoneX } from '../common/confignew';
import { DatePickerDialog } from 'react-native-datepicker-dialog'; 
import LoadingComponent from '../components/LoadingComponent';

export default class ToolDetailspage extends Component {

  constructor(props) {
    super(props);
    console.log(props.data, 'FRIST')
    this.state = {
      toolNameFinal: 'Inflators',
      toolCatList : [{ subCatList: [], text: 'Select Tool Category :', value: "0" }],
      toolNameList : [{ subCatList: [], text: 'Select Tool Sub-category :', value: "0" }],
      toolConditionData : [ { toolCondition: 'Select Tool Condition :', tcID: "0" } ],
      address : props.data === undefined ? '' : props.data.toolAddress,
      zipcode : '',
      make : props.data === undefined ? '' : props.data.toolMake,
      warningName: '* Required field.',
      warningCategory: '* Required field.',
      warningMake: props.data === undefined ? '* Required field' : '',
      warningModel: props.data === undefined ? '* Required field' : '',
      warningToolCondition: props.data === undefined ? '* Required field' : '',
      warningAddress: props.data === undefined ? '* Required field.' : '',
      model : props.data === undefined ? '' : props.data.toolModel,
      toolCondition : props.data === undefined ? '' : props.data.toolCondition,
      toolConditionId : props.data === undefined ? '' : props.data.toolCondition,
      toolCatID : props.data === undefined ? '' : props.data.toolCatId,
      toolNameID : props.data === undefined ? '' : props.data.toolSubCatId,
      IsLoaderVisible: false,
    }
    AsyncStorage.getItem("token").then((value) => {
      this.setState({
        token : JSON.parse(value)
      })
      this.toolConditionsList();
    });
  }

  //For Submit the tool details and go to the Promote.js file
  toolDetailSubmit() {
    const { zipcode, model, address, make, toolNameID, toolNameFinal, toolConditionId, toolCatID, toolCondition, toolName } = this.state;
    if( make === '' ){
      this.setState({
        warningMake: '* Required field.'
      })
    }else if( model === ''){
      this.setState({
        warningModel: '* Required field.'
      })
    } else if( address === null ){
      this.setState({
        warningAddress: '* Required field.'
      })
    } else {
      var yourToolDetail = {
        toolCatID : toolCatID,    
        toolName : toolNameFinal,
        toolNameID :toolNameID,
        make : make,
        model : model,
        toolcondition : toolCondition,
        toolconditionId : toolConditionId, 
        toolAddress: address,
        zipcode : zipcode,
      }
      AsyncStorage.setItem('ToolDetails', JSON.stringify(yourToolDetail)); 
      this.props.data === undefined ? Actions.PromoteYourTool() : Actions.push('PromoteYourTool', { data : this.props.data } );
    }
  }

  //For load the Google Address
  componentDidMount(){
    AsyncStorage.getItem("Address").then((value) => {
      var addressDetail = JSON.parse(value);
      this.setState({
        zipcode : addressDetail.postalCode
      });
    });
    this.fetchCategory();
  }

  //For Load the Tool Category.
  fetchCategory(){
    NetInfo.isConnected.fetch().then(isConnected => {
      if(isConnected) {
        this.setState({IsLoaderVisible: true})
        var URL=config.BASE_URL+'ToolsConfiguration/GetCategory?token='+this.state.token;
        fetch(URL, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        }).then((response) => response.json()).then((responseJson) => {
          const message = responseJson.message;
          if(responseJson.success){
            var data = responseJson.data;
            data.map((item)=> {
              this.setState({
                toolCatList : [...this.state.toolCatList, item],
              })
            })
            {
              this.props.data === undefined ? '' : this.setState({
                toolCategory : data[0].text,
                toolCatID :  data[0].value,
                warningCategory: ''
              });
            }
 
          }else{
            this.setState({IsLoaderVisible: false})
            if(!Platform.OS){ToastAndroid.show(message, ToastAndroid.SHORT)}
          }          
          this.fetchToolNames(data[0].text);
        }).catch((error) => {
          });
        } else {
          Alert.alert('Network not available');
        }
    });
  }

  fetchToolNames(catName){
    var catId = 0;
    for(var i=0; i< this.state.toolCatList.length; i++) {
      if(this.state.toolCatList[i].text == catName){        
        catId = this.state.toolCatList[i].value;
      } else{
      }
    }
    NetInfo.isConnected.fetch().then(isConnected => {
      if(isConnected) {
        this.setState({IsLoaderVisible: true})
        var URL=config.BASE_URL+'ToolsConfiguration/GetToolName?token='+this.state.token+'&catId='+catId;
      fetch(URL, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      }).then((response) => response.json())
        .then((responseJson) => {
          this.setState({IsLoaderVisible: false})
          var data = responseJson.data;
          data.map((item)=> {
            this.setState({
              toolNameList : [...this.state.toolNameList, item],
            })
          })
          {
          this.props.data === undefined ? '' : 
          this.setState({
            toolName : data[0].text,
            toolNameID :  data[0].value,
            warningName: ''
          });
        }
  
        }).catch((error) => {
          });
      } else {
        Alert.alert('Network not available');
      }
    });
  }

  toolConditionsList(){
    NetInfo.isConnected.fetch().then(isConnected => {
      if(isConnected) {
        this.setState({IsLoaderVisible: true})
        var URL=config.BASE_URL+'ToolsConfiguration/GetToolConditionList?token='+this.state.token;
      fetch(URL, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      }).then((response) => response.json()).then((responseJson) => {
        responseJson.data.map((item)=> {
          this.setState({
            toolConditionData : [...this.state.toolConditionData, item],
          })
        })
          this.setState({
           IsLoaderVisible: false
          });
        }).catch((error) => {
          this.setState({
            IsLoaderVisible: false,
          })
          });
      } else {
        Alert.alert('Network not available');
        this.setState({
          IsLoaderVisible: false,
        })
      }
    });
  }


  render () {
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
    console.log(this.state.address, 'GG')

    return (
      <View style={styles.parentContainer}>
        <Header
          outerContainerStyles={{ height: 56 }}
          backgroundColor={headerBackgroundColor}
          placement="left"
          leftComponent={<LeftComponent />}
          centerComponent={{ text: 'TOOL DETAILS', style: { color: '#fff', fontWeight: 'bold', fontSize:18, } }}
          rightComponent={<RightComponent/>}
        />
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ backgroundColor:'rgba(255,255,2550,1)'}}>

          <ImageBackground source={require('../images/screen4.png')} style={{height:130,width:'100%',}}>
            <Text style= {{ textAlign: 'center',fontSize: 25, color: "#fff",marginLeft:10, marginTop: 45}}>SHARE THE DETAILS ABOUT YOUR TOOL</Text>
          </ImageBackground>

          <View style={{backgroundColor:'rgba(255,255,2550,1)',justifyContent:'space-between',marginLeft: 30, marginRight: 10, paddingBottom:Platform.OS=='ios' ? isIphoneX() ? 0:50:0}}>
            <Text style= {{ fontSize: 20, color: "#000", marginTop: 10, width:300, marginLeft: 10}}>
              WHICH TOOL DO YOU OWN
            </Text>

            <View style={styles.sectionStyle}>
              <View style={{flex : 1, flexDirection : 'row'}}>
                <View style={{ width:10, height:40, marginRight:10, backgroundColor:'#00B0E8'}} />
                <Picker
                  selectedValue={this.state.toolCatID}
                  style={{ width: 280, height: 40, color: 'black' }}
                  itemStyle={{ borderTopWidth: 1, borderTopColor: '#000', borderBottomWidth: 1, borderBottomColor: '#000', height: 100, width: 100}}                  
                  onValueChange={(itemValue, itemIndex) => {
                    this.setState({ toolCatID: itemValue })
                    this.fetchToolNames(itemValue);
                    if(itemIndex > 0){
                      this.setState({
                        warningName: '',
                      })
                    }else if( itemIndex === 0 ){
                      this.setState({
                        warningName: '* Required field.'
                      })
                    }
                  }}
                >
                
                  {
                    this.state.toolCatList && this.state.toolCatList.map((key, index) => {
                      return <Picker.Item key={index} value={key.value} label={key.text} />
                    })
                  }
                </Picker>
              </View>
            </View>
           
            <View style={{ marginLeft: 20, marginBottom: 10 }}><Text ellipsizeMode='head' style={{ color: 'red' }}>{this.state.warningName}</Text></View>            

            <View style={styles.sectionStyle}>
              <View style={{flex : 1, flexDirection : 'row'}}>
                <View style={{width:10, height:40, marginRight:10, backgroundColor:'#00B0E8'}} />
                <Picker
                  selectedValue={this.state.toolNameID}
                  style={{ width: 280, height: 40, color:'#000000' }}
                  itemStyle={{ borderTopWidth: 1, borderTopColor: '#000', borderBottomWidth: 1, borderBottomColor: '#000', height: 100, width: 100}}                  
                  onValueChange={(itemValue, itemIndex) => {
                    this.setState({toolNameID: itemValue})
                    if(itemIndex > 0){
                      this.setState({
                        warningCategory: '',
                      })
                    }else if( itemIndex === 0 ){
                      this.setState({
                        warningCategory: '* Required field.'
                      })
                    }
                  } }
                >
                  {
                    this.state.toolNameList.map((key, index) => {
                      return <Picker.Item key={index} value={key.value} label={key.text} />
                    })
                  }
                </Picker>
              </View>
            </View>
            <View style={{ marginLeft: 20, marginBottom: 10, paddingBottom: 0 }}><Text ellipsizeMode='head' style={{ color: 'red' }}>{this.state.warningCategory}</Text></View>            

            <View style={styles.sectionStyle}>
              <View style={{width:10,height:40,marginRight:10, backgroundColor:'#00B0E8',}} />
              <TextInput
                style={styles.inputBox}
                underlineColorAndroid="transparent"
                placeholder="Tool Make"
                placeholderTextColor = '#8E8C90' 
                selectionColor="#000"
                keyboardType="email-address"
                returnKeyType="next"
                value={this.state.make}
                onChangeText={make => {
                  this.setState({make: make })
                  if(make === ''){
                    this.setState({ warningMake : '* Required field.' })
                  }else{
                    this.setState({ warningMake : '' })
                  }
                }}
              />
            </View>
            <View style={{ marginLeft: 20, marginBottom: 10, paddingBottom: 0 }}><Text ellipsizeMode='head' style={{ color: 'red', }}>{this.state.warningMake}</Text></View>

            <View style={styles.sectionStyle}>
              <View style={{width:10,height:40, marginRight:10, backgroundColor:'#00B0E8'}}></View>
              <TextInput
                style={styles.inputBox}
                underlineColorAndroid="transparent"
                placeholder="Tool Model"
                placeholderTextColor = '#8E8C90' 
                selectionColor="#000"
                keyboardType="email-address"
                returnKeyType="next"
                value={this.state.model}
                onChangeText={model => {
                  this.setState({model: model})
                  if(model === ''){
                    this.setState({ warningModel : '* Required field.' })
                  }else{
                    this.setState({ warningModel : '' })
                  }
                }}
              />
            </View>
            <View style={{ marginLeft: 20, marginBottom: 10, paddingBottom: 0 }}><Text ellipsizeMode='head' style={{ color: 'red' }}>{this.state.warningModel}</Text></View>

            <View style={styles.sectionStyle} >
              <View style={{flex: 1, flexDirection : 'row'}}>
                <View style={{width:10,height:40,marginRight:10, backgroundColor:'#00B0E8',}} />

                <Picker
                  selectedValue={this.state.toolConditionId}
                  style={{ width: 280, height: 40, color:'#000000' }}
                  itemStyle={{ borderTopWidth: 1, borderTopColor: '#000', borderBottomWidth: 1, borderBottomColor: '#000', height: 100, width: 100}}                  
                  onValueChange={(itemValue, itemIndex) => {
                    this.setState({ toolConditionId: itemValue })
                    if(itemIndex > 0){
                      this.setState({
                        warningToolCondition: '',
                      })
                    }else if( itemIndex === 0 ){
                      this.setState({
                        warningToolCondition: '* Required field.'
                      })
                    }
                  } }
                >
                
                  {
                    this.state.toolConditionData && this.state.toolConditionData.map((key, index) => {
                      return <Picker.Item key={index} value={key.tcID} label={key.toolCondition} />
                    })
                  }
                </Picker>
            
                </View>
            </View>
           
            <View style={{ marginLeft: 20, marginBottom: 10, paddingBottom: 0 }}><Text ellipsizeMode='head' style={{ color: 'red' }}>{this.state.warningToolCondition}</Text></View>
        
            <Text style= {{ fontSize: 15, color: "#000", marginTop: 45, width:300}}>YOUR LOCATION</Text>

              <View style={{ marginLeft: 10, marginTop: 15, flexDirection: 'row'}}>
              <View style={{width:10,height:40, marginRight: 5, backgroundColor:'#00B0E8'}} />
              <GooglePlacesAutocomplete
                placeholder='Search'
                minLength={2}
                autoFocus={false}
                returnKeyType={'search'}
                fetchDetails={true}
                renderDescription={(row) => row.description}
                onPress={(data, details = null) => {
                  // console.log(data);
                  // console.log(details);
                  this.setState({
                    address: details.formatted_address,
                    warningAddress: ''
                  })
                }}
                getDefaultValue={() => {
                  return '';
                }}
                query={{
                  key: 'AIzaSyAjKCVJA0JTMjT3ccJXNF3PTG4BnXGdYUs',
                  language: 'en',
                  types: '(cities)'
                }}
                styles={{
                  textInputContainer: {
                    backgroundColor: 'rgba(0,0,0,0)',
                    borderTopWidth: 0,
                    borderBottomWidth:0
                  },
                  textInput: {
                    marginLeft: 0,
                    marginRight: 0,
                    height: 38,
                    color: '#5d5d5d',
                    fontSize: 16
                  },
                  predefinedPlacesDescription: {
                    color: '#1faadb'
                  },
                }}
                currentLocation={false}
                currentLocationLabel="Current location"
                nearbyPlacesAPI='GooglePlacesSearch'
                GoogleReverseGeocodingQuery={{
                }}
                GooglePlacesSearchQuery={{
                  rankby: 'distance',
                  types: 'food'
                }}
                filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']}
                debounce={200}
              />
                </View>
            <View style={{ marginLeft: 20, marginBottom: 10, paddingBottom: 0 }}><Text ellipsizeMode='head' style={{ color: 'red' }}>{this.state.warningAddress}</Text></View>            

            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <TouchableOpacity onPress={() =>this.toolDetailSubmit()}  style={styles.button}>
                <Text style={styles.buttonText}>Submit</Text>
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
    marginBottom:10,
    marginTop: 20
  },
  buttonText: {
    fontSize: 20,
    fontWeight: '500',
    color: '#ffffff',
    textAlign: 'center',
  },
  sectionStyle: {
    flexDirection: 'row',
    width: 300,    
    height: 40,    
    margin: 10,
    marginBottom: 0,
    borderBottomColor: '#000', 
    borderBottomWidth: 1,
 },
 locationStyle: {
  flexDirection: 'row',
  height: 150,    
  margin: 10,
  marginBottom: 0,
 },
 inputBox: {
    width: 280,
    height: 40,
    paddingHorizontal: 16,
    marginVertical: 10,
    color:'#000',
  },
});
