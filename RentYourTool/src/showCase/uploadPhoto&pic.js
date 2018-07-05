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
import ImagePicker from 'react-native-image-picker';
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

export default class PhotosVideo extends Component {
    constructor(props){
        super(props);
        const { toolId, userId } = props.data;
        console.log(props.data, 'Add Image Data')
        this.state = {
            source : '',
            toolId: toolId,
            userId: userId,
            isUploading: false,
            source1: '',
            source2: '',
            source3: '',
            source4: '',
            source5: '',
            source6: '',
            IsLoaderVisible: false,
            warningMessage: '* Cover photo is required.'
        }
        AsyncStorage.getItem("token").then((value) => {
            this.setState({
              token : JSON.parse(value)
            })
        });
    }

    selectPhotoTapped1() {
        const options = {
          quality: 1.0,
          maxWidth: 500,
          maxHeight: 500,
          storageOptions: {
            skipBackup: true
          }
        };
    
        ImagePicker.showImagePicker(options, (response) => {
          if (response.didCancel) {
            console.log('User cancelled photo picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
          } else {
            let uri = response.uri;
            this.setState({
              source1: uri,
              warningMessage: '',
            });
          }
        });
    }

    selectPhotoTapped2() {
        const options = {
          quality: 1.0,
          maxWidth: 500,
          maxHeight: 500,
          storageOptions: {
            skipBackup: true
          }
        };
    
        ImagePicker.showImagePicker(options, (response) => {
          if (response.didCancel) {
            console.log('User cancelled photo picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
          } else {
            let uri = response.uri;
            console.log(uri, 'Tab 2')
            this.setState({
              source2: uri,
              warningMessage: '',
            });
          }
        });
    }

    selectPhotoTapped3() {
        const options = {
          quality: 1.0,
          maxWidth: 500,
          maxHeight: 500,
          storageOptions: {
            skipBackup: true
          }
        };
    
        ImagePicker.showImagePicker(options, (response) => {
          if (response.didCancel) {
            console.log('User cancelled photo picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
          } else {
            let uri = response.uri;
            console.log(uri, 'Tab 3')
            this.setState({
              source3: uri,
              warningMessage: '',
            });
            
          }
        });
    }
    selectPhotoTapped4() {
        const options = {
          quality: 1.0,
          maxWidth: 500,
          maxHeight: 500,
          storageOptions: {
            skipBackup: true
          }
        };
    
        ImagePicker.showImagePicker(options, (response) => {
          if (response.didCancel) {
            console.log('User cancelled photo picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
          } else {
            let uri = response.uri;
            this.setState({
              source4: uri,
              warningMessage: '',
            });
            
          }
        });
    }
    selectPhotoTapped5() {
        const options = {
          quality: 1.0,
          maxWidth: 500,
          maxHeight: 500,
          storageOptions: {
            skipBackup: true
          }
        };
    
        ImagePicker.showImagePicker(options, (response) => {
          if (response.didCancel) {
            console.log('User cancelled photo picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
          } else {
            let uri = response.uri;
            console.log(uri, 'Tab 3')
            this.setState({
              source5: uri,
              warningMessage: '',
            });
            
          }
        });
    }
    selectPhotoTapped6() {
        const options = {
          quality: 1.0,
          maxWidth: 500,
          maxHeight: 500,
          storageOptions: {
            skipBackup: true
          }
        };
    
        ImagePicker.showImagePicker(options, (response) => {
          if (response.didCancel) {
            console.log('User cancelled photo picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
          } else {
            let uri = response.uri;
            this.setState({
              source6: uri,
              warningMessage: '',
            });
            
          }
        });
    }


    uploadImageSubmit() {
        NetInfo.isConnected.fetch().then(isConnected => {
            if(isConnected) {
              this.setState({
                  IsLoaderVisible: true,
              })
              const { token, toolId, userId, source1, source2, source3, source4, source5, source6 }  = this.state;
              console.log(token, 'TOKEN')
              if(source1 || source2 || source3 || source4 || source5 || source6 ){
                var URL=config.BASE_URL+'ToolsConfiguration/ToolImgUpload';
                this.setState({
                    warningMessage: '',
                    IsLoaderVisible: true,
                })
                const data = new FormData();
                    
                if(source1 && source2 === '' && source3 === '' && source4 === '' && source5 === '' && source6 === ''){
                    console.log(1)
                    data.append('UserId', userId), 
                    data.append('UpdatedBy', userId), 
                    data.append('ToolId', toolId), 
                    data.append('token', token),
    
                    data.append('ToolImage1', {
                        uri: source1,
                        type: 'image/jpeg',
                        name: 'testing'
                    });
                    
                }
                else if(source1 && source2 && source3  === '' && source4 === '' && source5 === '' && source6 === ''){
                    data.append('UserId', userId), 
                    data.append('UpdatedBy', userId), 
                    data.append('ToolId', toolId), 
                    data.append('token', token),

                    data.append('ToolImage1', {
                        uri: source1,
                        type: 'image/jpeg',
                        name: 'testing1'
                    }),
                    data.append('ToolImage2', {
                        uri: source2,
                        type: 'image/jpeg',
                        name: 'testing2'
                    });
                }
                else if(source1 && source2 && source3 && source4 === '' && source5 === '' && source6 === ''){
      
                    data.append('UserId', userId), 
                    data.append('UpdatedBy', userId), 
                    data.append('ToolId', toolId), 
                    data.append('token', token),
                    data.append('ToolImage1', {
                        uri: source1,
                        type: 'image/jpeg',
                        name: 'testing'
                    }),
                    data.append('ToolImage2', {
                        uri: source2,
                        type: 'image/jpeg',
                        name: 'testing'
                    }),
                    data.append('ToolImage3', {
                        uri: source3,
                        type: 'image/jpeg',
                        name: 'testing'
                    });
                }
                else if(source1 && source2 && source3 && source4 && source5 === '' && source6 === ''){
         
                    data.append('UserId', userId), 
                    data.append('UpdatedBy', userId), 
                    data.append('ToolId', toolId), 
                    data.append('token', token),
                    data.append('ToolImage1', {
                        uri: source1,
                        type: 'image/jpeg',
                        name: 'testing'
                    }),
                    data.append('ToolImage2', {
                        uri: source2,
                        type: 'image/jpeg',
                        name: 'testing'
                    }),
                    data.append('ToolImage3', {
                        uri: source3,
                        type: 'image/jpeg',
                        name: 'testing'
                    }),
                    data.append('ToolImage4', {
                        uri: source4,
                        type: 'image/jpeg',
                        name: 'testing'
                    });
                }
                else if(source1 && source2 && source3 && source4 && source5 && source6 === ''){
     
                    data.append('UserId', userId), 
                    data.append('UpdatedBy', userId), 
                    data.append('ToolId', toolId), 
                    data.append('token', token),
                    data.append('ToolImage1', {
                        uri: source1,
                        type: 'image/jpeg',
                        name: 'testing'
                    });
                    data.append('ToolImage2', {
                        uri: source2,
                        type: 'image/jpeg',
                        name: 'testing'
                    });
                    data.append('ToolImage3', {
                        uri: source3,
                        type: 'image/jpeg',
                        name: 'testing'
                    });
                    data.append('ToolImage4', {
                        uri: source4,
                        type: 'image/jpeg',
                        name: 'testing'
                    });
                    data.append('ToolImage5', {
                        uri: source5,
                        type: 'image/jpeg',
                        name: 'testing'
                    });
                }
                else {
   
                    data.append('UserId', userId), 
                    data.append('UpdatedBy', userId), 
                    data.append('ToolId', toolId), 
                    data.append('token', token),
                    data.append('ToolImage1', {
                        uri: source1,
                        type: 'image/jpeg',
                        name: 'testing'
                    });
                    data.append('ToolImage2', {
                        uri: source2,
                        type: 'image/jpeg',
                        name: 'testing'
                    });
                    data.append('ToolImage3', {
                        uri: source3,
                        type: 'image/jpeg',
                        name: 'testing'
                    });
                    data.append('ToolImage4', {
                        uri: source4,
                        type: 'image/jpeg',
                        name: 'testing'
                    });
                    data.append('ToolImage5', {
                        uri: source4,
                        type: 'image/jpeg',
                        name: 'testing'
                    });
                    data.append('ToolImage6', {
                        uri: source6,
                        type: 'image/jpeg',
                        name: 'testing'
                    });
                }
                
                fetch(URL, {
                    method: 'POST',
                    headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data',
                    },
                    body: data
                }).then((response) => response.json()).then((responseJson) => {
                    var data = responseJson.message;
                    console.log(data, 'Respoonse')
                    if (responseJson.success){
                        Actions.push('publish', { toolId: toolId, ownerId: userId}),
                        this.setState({IsLoaderVisible: false})
                    } else {
                        this.setState({IsLoaderVisible: false})
                        
                    }
                    }).catch((error) => {
                        console.log(error, 'ERROR')
                        this.setState({IsLoaderVisible: false})
                    });
              } else {
                this.setState({
                    warningMessage: '* Cover photo is required.',
                    IsLoaderVisible: false,
                })
              }
            } else {
                this.setState({IsLoaderVisible: false})
                Alert.alert('Network not available');
            }
        });
    }

    render () {
        console.log(this.state.IsLoaderVisible, 'A')
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
            centerComponent={{ text: 'PHOTOS', style: { color: '#fff', fontWeight: 'bold', fontSize:18, } }}
            rightComponent={<RightComponent/>}
        />
        <ImageBackground source={require('../images/screen7.png')} style={{height:130,width:'100%',}}>
            <Text style= {{textAlign: 'center',fontSize: 25, color: "#fff",marginLeft:10, marginTop: 45}}>PLEASE UPLOAD TOOL'S PHOTOS</Text>
        </ImageBackground>
        
        <View style={{ flexDirection: 'row', marginTop: 20 }}>
            <View style={{ marginLeft: 10, flex: 1 }}>
                <TouchableOpacity onPress={this.selectPhotoTapped1.bind(this)}>
                    <View style={{ flexDirection: 'row' }}>
                        {   
                            this.state.source1 === '' ? <Image style={{ width:100, height:100, borderRadius:100/2 }} source={require('../images/photo.png')} /> :
                            <Image style={{ width:100, height:100 }} source={{ uri : this.state.source1 }} />
                        }
                    </View>
                </TouchableOpacity>     
                <Text style={{ marginLeft: 13 }}>Cover Photo</Text>
            </View>

            <View style={{ marginLeft: 10, flex: 1}}>
                <TouchableOpacity onPress={this.selectPhotoTapped2.bind(this)}>
                    <View style={{ flexDirection: 'row' }}>
                        {   
                            this.state.source2 === '' ? <Image style={{ width:100, height:100, borderRadius:100/2 }} source={require('../images/photo.png')} /> :
                            <Image style={{ width:100, height:100 }} source={{ uri : this.state.source2 }} />
                        }
                    </View>
                </TouchableOpacity>     
                <Text style={{ marginLeft: 13 }}>First Photo</Text>
            </View>

            <View style={{ marginLeft: 10, flex: 1 }}>
                <TouchableOpacity onPress={this.selectPhotoTapped3.bind(this)}>
                    <View style={{ flexDirection: 'row' }}>
                        {   
                            this.state.source3 === '' ? <Image style={{ width:100, height:100, borderRadius:100/2 }} source={require('../images/photo.png')} /> :
                            <Image style={{ width:100, height:100 }} source={{ uri : this.state.source3 }} />
                        }
                    </View>
                </TouchableOpacity>     
                <Text style={{ marginLeft: 13 }}>Second Photo</Text>
            </View>
        </View>
        <View style={{ flexDirection: 'row', marginTop: 20 }}>
            <View style={{ marginLeft: 10, flex: 1 }}>
                <TouchableOpacity onPress={this.selectPhotoTapped4.bind(this)}>
                    <View style={{ flexDirection: 'row' }}>
                        {   
                            this.state.source4 === '' ? <Image style={{ width:100, height:100, borderRadius:100/2 }} source={require('../images/photo.png')} /> :
                            <Image style={{ width:100, height:100 }} source={{ uri : this.state.source4 }} />
                        }
                    </View>
                </TouchableOpacity>     
                <Text style={{ marginLeft: 13 }}>Third Photo</Text>
            </View>

            <View style={{ marginLeft: 10, flex: 1}}>
                <TouchableOpacity onPress={this.selectPhotoTapped5.bind(this)}>
                    <View style={{ flexDirection: 'row' }}>
                        {   
                            this.state.source5 === '' ? <Image style={{ width:100, height:100, borderRadius:100/2 }} source={require('../images/photo.png')} /> :
                            <Image style={{ width:100, height:100 }} source={{ uri : this.state.source5 }} />
                        }
                    </View>
                </TouchableOpacity>     
                <Text style={{ marginLeft: 13 }}>Fourth Photo</Text>
            </View>

            <View style={{ marginLeft: 10, flex: 1 }}>
                <TouchableOpacity onPress={this.selectPhotoTapped6.bind(this)}>
                    <View style={{ flexDirection: 'row' }}>
                        {   
                            this.state.source6 === '' ? <Image style={{ width:100, height:100, borderRadius:100/2 }} source={require('../images/photo.png')} /> :
                            <Image style={{ width:100, height:100 }} source={{ uri : this.state.source6 }} />
                        }
                    </View>
                </TouchableOpacity>     
                <Text style={{ marginLeft: 13 }}>Fifth Photo</Text>
            </View>
        </View>
        <Text style={{ marginLeft: 20, marginTop: 20, color: 'red'}}>{this.state.warningMessage}</Text>
        

        <View style={{ position: 'absolute', marginLeft: 40, bottom: 0, alignItems: 'center', justifyContent: 'center' }}>
            <TouchableOpacity onPress={()=> this.uploadImageSubmit()}  style={{ backgroundColor: '#fe7a18', marginBottom : 30, height :50}} >
                <View style={{width:width(80), height:width(12), alignItems:'center', flex : 1, justifyContent : 'center',  alignContent : 'center'}}>
                    <Text style={{ fontSize : 18, color : '#fff', justifyContent : 'center', textAlign : 'center', alignContent : 'center'}}>Publish Tool Profile</Text>
                </View>
            </TouchableOpacity>
        </View>
    </View>
    )
  }
}

var styles = StyleSheet.create({
    container: {
        alignItems: 'center', 
        alignSelf: 'center',
        marginTop: 10,
        marginBottom: 10
      },
      fileTitle: {
        color: 'white',
        marginLeft: 5,
        fontSize: 16,
      },
      addMoreImage:{
        alignItems: 'center', 
        alignSelf: 'center', 
        width: 150, 
        height: 25, 
        backgroundColor: 'white', 
        borderColor: 'black', 
        borderWidth: 1, 
        borderRadius: 5,
      },
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
 
sectionStyle1: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,    
    height: 40,    
    margin: 10
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
    color:'#000',
    borderBottomColor: '#000', 
    borderBottomWidth: 1,
  
  },
});

/*
,
                data.append('ToolImage2', {
                    uri: source2,
                    type: 'image/jpeg',
                    name: 'testing'
                }),
                data.append('ToolImage3', {
                    uri: source3,
                    type: 'image/jpeg',
                    name: 'testing'
                })
                */
