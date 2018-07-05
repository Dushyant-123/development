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
        console.log(props.data, 'Data Update Photo')
        if(props.data.toolOwnerImgData.length > 1 || props.data.toolOwnerImgData.length === 1){
            console.log('A')
            this.state = {
                toolId: props.data.toolId,
                userId: props.data.userId,
                isUploading: false,
                prevSrc1: true,
                prevSrc2: true,
                prevSrc3: true,
                prevSrc4: true,
                prevSrc5: true,
                prevSrc6: true,
                newSrc1 : '',
                newSrc2 : '',
                newSrc3 : '',
                newSrc4 : '',
                newSrc5 : '',
                newSrc6 : '',
                submitImageData: '',
                
                source1: props.data.toolOwnerImgData[0] === undefined || props.data.toolOwnerImgData[0].awsPreSignedURL === '' ? '' : props.data.toolOwnerImgData[0].awsPreSignedURL,
                source2: props.data.toolOwnerImgData[1] === undefined || props.data.toolOwnerImgData[1].awsPreSignedURL === '' ? '' : props.data.toolOwnerImgData[1].awsPreSignedURL,
                source3: props.data.toolOwnerImgData[2] === undefined || props.data.toolOwnerImgData[2].awsPreSignedURL === '' ? '' : props.data.toolOwnerImgData[2].awsPreSignedURL,
                source4: props.data.toolOwnerImgData[3] === undefined || props.data.toolOwnerImgData[3].awsPreSignedURL === '' ? '' : props.data.toolOwnerImgData[3].awsPreSignedURL,
                source5: props.data.toolOwnerImgData[4] === undefined || props.data.toolOwnerImgData[4].awsPreSignedURL === '' ? '' : props.data.toolOwnerImgData[4].awsPreSignedURL,
                source6: props.data.toolOwnerImgData[5] === undefined || props.data.toolOwnerImgData[5].awsPreSignedURL === '' ? '' : props.data.toolOwnerImgData[5].awsPreSignedURL,
                IsLoaderVisible: false,
                warningMessage: props.data.toolOwnerImgData[0].awsPreSignedURL === undefined ? '* Cover photo is required.' : '',
            }
        }else {
            console.log('B')
            this.state = {
                toolId: props.data.toolId,
                userId: props.data.userId,
                isUploading: false,
                prevSrc1: true,
                prevSrc2: true,
                prevSrc3: true,
                prevSrc4: true,
                prevSrc5: true,
                prevSrc6: true,
                newSrc1 : '',
                newSrc2 : '',
                newSrc3 : '',
                newSrc4 : '',
                newSrc5 : '',
                newSrc6 : '',
                submitImageData: '',
                
                source1: '',
                source2: '',
                source3: '',
                source4: '',
                source5: '',
                source6: '',
                IsLoaderVisible: false,
                warningMessage: '* Cover photo is required.',
            }
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
              newSrc1: uri,
              submitImageData: [...this.state.submitImageData, uri],
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
              newSrc2: uri,
              submitImageData: [...this.state.submitImageData, uri],
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
              newSrc3: uri,
              submitImageData: [...this.state.submitImageData, uri],
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
              newSrc4: uri,
              submitImageData: [...this.state.submitImageData, uri],
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
              newSrc5: uri,
              submitImageData: [...this.state.submitImageData, uri],
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
              newSrc6: uri,
              submitImageData: [...this.state.submitImageData, uri],
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
              const { token, toolId, userId, submitImageData, source1, source2, source3, source4, source5, source6,
                newSrc1, newSrc2, newSrc3, newSrc4, newSrc5, newSrc6 }  = this.state;
              
              //Add Some Code
              console.log(token, toolId, userId, submitImageData, source1, source2, source3, source4, source5, source6, newSrc1, newSrc2, newSrc3, newSrc4, newSrc5, newSrc6, 'Before' )
                console.log(submitImageData, 'Submit Image Data')

              if(source1 !== '' ){
                  console.log('entery');
                var URL=config.BASE_URL+'ToolsConfiguration/ToolImgUpload';
                this.setState({
                    warningMessage: '',
                    IsLoaderVisible: true,
                })

                const data = new FormData();
                if(submitImageData.length === 0){
                    console.log('No Image Change');
                    this.setState({IsLoaderVisible: false})
                    Actions.push('publish', { toolId: toolId, ownerId: userId});
                }
                if(submitImageData.length === 1){
                    console.log(1)
                    data.append('UserId', userId), 
                    data.append('UpdatedBy', userId), 
                    data.append('ToolId', toolId), 
                    data.append('token', token),
    
                    data.append('ToolImage1', {
                        uri: submitImageData[0],
                        type: 'image/jpeg',
                        name: 'testing'
                    });  
                } else if(submitImageData.length === 2){
                    console.log(2)
                    data.append('UserId', userId), 
                    data.append('UpdatedBy', userId), 
                    data.append('ToolId', toolId), 
                    data.append('token', token),

                    data.append('ToolImage1', {
                        uri: submitImageData[0],
                        type: 'image/jpeg',
                        name: 'testing1'
                    }),
                    data.append('ToolImage2', {
                        uri: submitImageData[1],
                        type: 'image/jpeg',
                        name: 'testing2'
                    });
                }  else if(submitImageData.length === 3){
                    console.log(3)
                    data.append('UserId', userId), 
                    data.append('UpdatedBy', userId), 
                    data.append('ToolId', toolId), 
                    data.append('token', token),
                    data.append('ToolImage1', {
                        uri: submitImageData[0],
                        type: 'image/jpeg',
                        name: 'testing'
                    }),
                    data.append('ToolImage2', {
                        uri: submitImageData[1],
                        type: 'image/jpeg',
                        name: 'testing'
                    }),
                    data.append('ToolImage3', {
                        uri: submitImageData[2],
                        type: 'image/jpeg',
                        name: 'testing'
                    });

                } else if(submitImageData.length === 4){
                    data.append('ToolImage1', {
                        uri: submitImageData[0],
                        type: 'image/jpeg',
                        name: 'testing'
                    }),
                    data.append('ToolImage2', {
                        uri: submitImageData[1],
                        type: 'image/jpeg',
                        name: 'testing'
                    }),
                    data.append('ToolImage3', {
                        uri: submitImageData[2],
                        type: 'image/jpeg',
                        name: 'testing'
                    }),
                    data.append('ToolImage4', {
                        uri: submitImageData[3],
                        type: 'image/jpeg',
                        name: 'testing'
                    });

                } else if(submitImageData.length === 5){
                    console.log(5)
                    data.append('UserId', userId), 
                    data.append('UpdatedBy', userId), 
                    data.append('ToolId', toolId), 
                    data.append('token', token),
                    data.append('ToolImage1', {
                        uri: submitImageData[0],
                        type: 'image/jpeg',
                        name: 'testing'
                    });
                    data.append('ToolImage2', {
                        uri: submitImageData[1],
                        type: 'image/jpeg',
                        name: 'testing'
                    });
                    data.append('ToolImage3', {
                        uri: submitImageData[2],
                        type: 'image/jpeg',
                        name: 'testing'
                    });
                    data.append('ToolImage4', {
                        uri: submitImageData[3],
                        type: 'image/jpeg',
                        name: 'testing'
                    });
                    data.append('ToolImage5', {
                        uri: submitImageData[4],
                        type: 'image/jpeg',
                        name: 'testing'
                    });
                } else {
                    console.log(6)
                    data.append('UserId', userId), 
                    data.append('UpdatedBy', userId), 
                    data.append('ToolId', toolId), 
                    data.append('token', token),
                    data.append('ToolImage1', {
                        uri: submitImageData[0],
                        type: 'image/jpeg',
                        name: 'testing'
                    });
                    data.append('ToolImage2', {
                        uri: submitImageData[1],
                        type: 'image/jpeg',
                        name: 'testing'
                    });
                    data.append('ToolImage3', {
                        uri: submitImageData[2],
                        type: 'image/jpeg',
                        name: 'testing'
                    });
                    data.append('ToolImage4', {
                        uri: submitImageData[3],
                        type: 'image/jpeg',
                        name: 'testing'
                    });
                    data.append('ToolImage5', {
                        uri: submitImageData[4],
                        type: 'image/jpeg',
                        name: 'testing'
                    });
                    data.append('ToolImage6', {
                        uri: submitImageData[5],
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

    deleteImage1 = (source) => {
        NetInfo.isConnected.fetch().then(isConnected => {
          if(isConnected) {
            console.log(source, this.state.source1, 'ABC')
            this.setState({IsLoaderVisible: true})
            var URL=config.BASE_URL+'ToolsConfiguration/DeleteToolImage?token='+this.state.token+'&ToolId='+this.state.toolId+'&ImageName='+this.props.data.toolOwnerImgData[0].fileName;
            console.log(URL, 'url Update Image')
            fetch(URL, {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              }
            }).then((response) => response.json()).then((responseJson) => {
                console.log(responseJson)
              if(responseJson.success) {
                this.setState({
                    source1 : '',
                    prevSrc1 : false,
                    IsLoaderVisible : false,
                    warningMessage: '* Cover photo is required.',                    
                })
              } else {
                this.setState({IsLoaderVisible: false})
              }
              }).catch((error) => {
                  console.log(error, 'Error')
                  this.setState({IsLoaderVisible: false})
              });
            }
            else {
              Alert.alert('Network not available');
              this.setState({IsLoaderVisible: false})
            }
          });
      }

      deleteImage2 = (source) => {
        NetInfo.isConnected.fetch().then(isConnected => {
          if(isConnected) {
            console.log(source, this.state.source2, 'ABC')
            this.setState({IsLoaderVisible: true})
            var URL=config.BASE_URL+'ToolsConfiguration/DeleteToolImage?token='+this.state.token+'&ToolId='+this.state.toolId+'&ImageName='+this.props.data.toolOwnerImgData[1].fileName;
            console.log(URL, 'url Update Image')
            fetch(URL, {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              }
            }).then((response) => response.json()).then((responseJson) => {
                console.log(responseJson)
              if(responseJson.success) {
                this.setState({
                    source2 : '',
                    prevSrc2 : false,
                    IsLoaderVisible : false
                })
              } else {
                this.setState({IsLoaderVisible: false})
              }
              }).catch((error) => {
                  console.log(error, 'Error')
                  this.setState({IsLoaderVisible: false})
              });
            }
            else {
              Alert.alert('Network not available');
              this.setState({IsLoaderVisible: false})
            }
          });
      }
      deleteImage3 = (source) => {
        NetInfo.isConnected.fetch().then(isConnected => {
          if(isConnected) {
            console.log(source, this.state.source3, 'ABC')
            this.setState({IsLoaderVisible: true})
            var URL=config.BASE_URL+'ToolsConfiguration/DeleteToolImage?token='+this.state.token+'&ToolId='+this.state.toolId+'&ImageName='+this.props.data.toolOwnerImgData[2].fileName;
            console.log(URL, 'url Update Image')
            fetch(URL, {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              }
            }).then((response) => response.json()).then((responseJson) => {
                console.log(responseJson)
              if(responseJson.success) {
                this.setState({
                    source3 : '',
                    prevSrc3 : false,
                    IsLoaderVisible : false
                })
              } else {
                this.setState({IsLoaderVisible: false})
              }
              }).catch((error) => {
                  console.log(error, 'Error')
                  this.setState({IsLoaderVisible: false})
              });
            }
            else {
              Alert.alert('Network not available');
              this.setState({IsLoaderVisible: false})
            }
          });
      }
      deleteImage4 = (source) => {
        NetInfo.isConnected.fetch().then(isConnected => {
          if(isConnected) {
            console.log(source, this.state.source4, 'ABC')
            this.setState({IsLoaderVisible: true})
            var URL=config.BASE_URL+'ToolsConfiguration/DeleteToolImage?token='+this.state.token+'&ToolId='+this.state.toolId+'&ImageName='+this.props.data.toolOwnerImgData[3].fileName;
            console.log(URL, 'url Update Image')
            fetch(URL, {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              }
            }).then((response) => response.json()).then((responseJson) => {
                console.log(responseJson)
              if(responseJson.success) {
                this.setState({
                    source4 : '',
                    prevSrc4 : false,
                    IsLoaderVisible : false
                })
              } else {
                this.setState({IsLoaderVisible: false})
              }
              }).catch((error) => {
                  console.log(error, 'Error')
                  this.setState({IsLoaderVisible: false})
              });
            }
            else {
              Alert.alert('Network not available');
              this.setState({IsLoaderVisible: false})
            }
          });
      }
      deleteImage5 = (source) => {
        NetInfo.isConnected.fetch().then(isConnected => {
          if(isConnected) {
            console.log(source, this.state.source5, 'ABC')
            this.setState({IsLoaderVisible: true})
            var URL=config.BASE_URL+'ToolsConfiguration/DeleteToolImage?token='+this.state.token+'&ToolId='+this.state.toolId+'&ImageName='+this.props.data.toolOwnerImgData[4].fileName;
            console.log(URL, 'url Update Image')
            fetch(URL, {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              }
            }).then((response) => response.json()).then((responseJson) => {
                console.log(responseJson)
              if(responseJson.success) {
                this.setState({
                    source5 : '',
                    prevSrc5 : false,
                    IsLoaderVisible : false
                })
              } else {
                this.setState({IsLoaderVisible: false})
              }
              }).catch((error) => {
                  console.log(error, 'Error')
                  this.setState({IsLoaderVisible: false})
              });
            }
            else {
              Alert.alert('Network not available');
              this.setState({IsLoaderVisible: false})
            }
          });
      }
      deleteImage6 = (source) => {
        NetInfo.isConnected.fetch().then(isConnected => {
          if(isConnected) {
            console.log(source, this.state.source6, 'ABC')
            this.setState({IsLoaderVisible: true})
            var URL=config.BASE_URL+'ToolsConfiguration/DeleteToolImage?token='+this.state.token+'&ToolId='+this.state.toolId+'&ImageName='+this.props.data.toolOwnerImgData[5].fileName;
            console.log(URL, 'url Update Image')
            fetch(URL, {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              }
            }).then((response) => response.json()).then((responseJson) => {
                console.log(responseJson)
              if(responseJson.success) {
                Alert.alert(responseJson.message);
                this.setState({
                    source6 : '',
                    prevSrc6 : false,
                    IsLoaderVisible : false
                })
              } else {
                Alert.alert(responseJson.message);
                this.setState({IsLoaderVisible: false})
              }
              }).catch((error) => {
                  console.log(error, 'Error')
                  this.setState({IsLoaderVisible: false})
              });
            }
            else {
              Alert.alert('Network not available');
              this.setState({IsLoaderVisible: false})
            }
          });
      }
      

    render () {
        console.log(this.state, 'A');

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
    
    console.log(this.state.IsLoaderVisible, 'Loader')
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
        {
            this.state.IsLoaderVisible ? 
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <LoadingComponent />
            </View> :
            <View>
                <View style={{ flexDirection: 'row', marginTop: 20 }}>
                    <View style={{ marginLeft: 10, flex: 1 }}>
                            <View style={{ flexDirection: 'row' }}>
                                {   
                                    this.state.source1 === '' ?  <TouchableOpacity onPress={this.selectPhotoTapped1.bind(this)}>
                                      <View>
                                          <Image style={{ width:100, height:100, borderRadius:100/2 }} source={require('../images/photo.png')} />
                                      </View>
                                    </TouchableOpacity> :
                                    this.props.data.toolOwnerImgData[0] && this.props.data.toolOwnerImgData[0].awsPreSignedURL && this.state.prevSrc1 === true ? 
                                    <ImageBackground style={{ width:100, height:100 }} source={{ uri : this.state.source1 }} >
                                        <View style={{ flexDirection: 'row', alignSelf: 'flex-end', right: 0, top: 0}}>
                                            <Icon.Button name="trash"  color='red' size={21} backgroundColor="transparent" onPress={ () => this.deleteImage1(this.state.source1)} />
                                        </View>
                                    </ImageBackground> : <Image style={{ width:100, height:100 }} source={{ uri : this.state.source1 }} />
                                }
                            </View>    
                        <Text style={{ marginLeft: 13 }}>Cover Photo</Text>
                    </View>
                    <View style={{ marginLeft: 10, flex: 1}}>
                            <View style={{ flexDirection: 'row' }}>
                                {   
                                    this.state.source2 === '' ?  <TouchableOpacity onPress={this.selectPhotoTapped2.bind(this)}>
                                      <View>
                                          <Image style={{ width:100, height:100, borderRadius:100/2 }} source={require('../images/photo.png')} />
                                      </View>
                                    </TouchableOpacity> :
                                    this.props.data.toolOwnerImgData[1] && this.props.data.toolOwnerImgData[1].awsPreSignedURL && this.state.prevSrc2 === true ? 
                                    <ImageBackground style={{ width:100, height:100 }} source={{ uri : this.state.source2 }} >
                                        <View style={{ flexDirection: 'row', alignSelf: 'flex-end' }}>
                                            <Icon.Button name="trash" color='red' size={21} backgroundColor="transparent" onPress={ () => this.deleteImage2(this.state.source2)} />
                                        </View>
                                    </ImageBackground> : <Image style={{ width:100, height:100 }} source={{ uri : this.state.source2 }} />
                                }
                            </View> 
                        <Text style={{ marginLeft: 13 }}>First Photo</Text>
                    </View>
                    <View style={{ marginLeft: 10, flex: 1 }}>
                            <View style={{ flexDirection: 'row' }}>
                                {   
                                    this.state.source3 === '' ?  <TouchableOpacity onPress={this.selectPhotoTapped3.bind(this)}>
                                      <View>
                                          <Image style={{ width:100, height:100, borderRadius:100/2 }} source={require('../images/photo.png')} />
                                      </View>
                                    </TouchableOpacity> :
                                    this.props.data.toolOwnerImgData[2] && this.props.data.toolOwnerImgData[2].awsPreSignedURL && this.state.prevSrc3 === true ? 
                                    <ImageBackground style={{ width:100, height:100 }} source={{ uri : this.state.source3 }} >
                                        <View style={{ flexDirection: 'row', alignSelf: 'flex-end'}}>
                                            <Icon.Button name="trash" color='red' size={21} backgroundColor="transparent" onPress={ () => this.deleteImage3(this.state.source3)} />
                                        </View>
                                    </ImageBackground> : <Image style={{ width:100, height:100 }} source={{ uri : this.state.source3 }} />
                                }
                            </View>  
                        <Text style={{ marginLeft: 13 }}>Second Photo</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 20 }}>
                    <View style={{ marginLeft: 10, flex: 1 }}>
                            <View style={{ flexDirection: 'row' }}>
                                {   
                                    this.state.source4 === '' ?  <TouchableOpacity onPress={this.selectPhotoTapped4.bind(this)}>
                                      <View>
                                          <Image style={{ width:100, height:100, borderRadius:100/2 }} source={require('../images/photo.png')} />
                                      </View>
                                    </TouchableOpacity> :
                                    this.props.data.toolOwnerImgData[3] && this.props.data.toolOwnerImgData[3].awsPreSignedURL && this.state.prevSrc4 === true ? 
                                    <ImageBackground style={{ width:100, height:100 }} source={{ uri : this.state.source4 }} >
                                        <View style={{ flexDirection: 'row', alignSelf: 'flex-end'}}>
                                            <Icon.Button name="trash" color='red' size={21} backgroundColor="transparent" onPress={ () => this.deleteImage4(this.state.source4)} />
                                        </View>
                                    </ImageBackground> : <Image style={{ width:100, height:100 }} source={{ uri : this.state.source4 }} />
                                }
                            </View>  
                        <Text style={{ marginLeft: 13 }}>Third Photo</Text>
                    </View>
                    <View style={{ marginLeft: 10, flex: 1}}>
                            <View style={{ flexDirection: 'row' }}>
                                {   
                                    this.state.source5 === '' ?  <TouchableOpacity onPress={this.selectPhotoTapped5.bind(this)}>
                                      <View>
                                          <Image style={{ width:100, height:100, borderRadius:100/2 }} source={require('../images/photo.png')} />
                                      </View>
                                    </TouchableOpacity> :
                                    this.props.data.toolOwnerImgData[4] && this.props.data.toolOwnerImgData[4].awsPreSignedURL && this.state.prevSrc5 === true ? 
                                    <ImageBackground style={{ width:100, height:100 }} source={{ uri : this.state.source5 }} >
                                        <View style={{ flexDirection: 'row', alignSelf: 'flex-end'}}>
                                            <Icon.Button name="trash" color='red' size={21} backgroundColor="transparent" onPress={ () => this.deleteImage5(this.state.source5)} />
                                        </View>
                                    </ImageBackground> : <Image style={{ width:100, height:100 }} source={{ uri : this.state.source5 }} />
                                }
                            </View> 
                        <Text style={{ marginLeft: 13 }}>Fourth Photo</Text>
                    </View>
                    <View style={{ marginLeft: 10, flex: 1 }}>
                            <View style={{ flexDirection: 'row' }}>
                                {   
                                    this.state.source6 === '' ?  <TouchableOpacity onPress={this.selectPhotoTapped6.bind(this)}>
                                      <View>
                                          <Image style={{ width:100, height:100, borderRadius:100/2 }} source={require('../images/photo.png')} />
                                      </View>
                                    </TouchableOpacity> :
                                    this.props.data.toolOwnerImgData[5] && this.props.data.toolOwnerImgData[5].awsPreSignedURL && this.state.prevSrc6 === true ? 
                                    <ImageBackground style={{ width:100, height:100 }} source={{ uri : this.state.source6 }} >
                                        <View style={{ flexDirection: 'row', alignSelf: 'flex-end'}}>
                                            <Icon.Button name="trash" color='red' size={21} backgroundColor="transparent" onPress={ () => this.deleteImage6(this.state.source6)} />
                                        </View>
                                    </ImageBackground> : <Image style={{ width:100, height:100 }} source={{ uri : this.state.source5 }} />
                                }
                            </View>
                        <Text style={{ marginLeft: 13 }}>Fifth Photo</Text>
                    </View>
                </View>
                <Text style={{ marginLeft: 20, marginTop: 20, color: 'red'}}>{this.state.warningMessage}</Text>
            </View>
        }
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
