import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  Platform,
  TextInput,
  TouchableOpacity,
  View,
  Picker,
  NetInfo,
  PixelRatio,
  Image,
  Alert,
  Dimensions,
  TouchableHighlight,
  AsyncStorage
} from 'react-native';

import {Actions} from 'react-native-router-flux';
import ImagePicker from 'react-native-image-picker';
import Spinner from 'react-native-loading-spinner-overlay';
import { Header } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { headerBackgroundColor, buttonBackgroundColor } from '../styles';
var { height, width } = Dimensions.get('window');

import config from '../common/config';
import Form from '../components/Form';

export default class Registration extends Component {
  constructor(props) {
    super(props);
    const { data : { userId, userName, userEmail, userMobile, userAddress, userImage, awsUserImageName, awsUserImgURL} } = props;
    const UserImgUrl = awsUserImgURL ? {uri : awsUserImgURL} : require('../images/dummy-logo.png');
    this.state= { 
      loadingImage : false,
      UserId: userId, 
      UserName: userName,
      UserMobile: userMobile,
      UserEmail: userEmail,
      UserAddress : userAddress,
      userImage: userImage,
      awsUserImgURL: UserImgUrl,
      awsUserImageName: '',
      IsLoaderVisible: false,   
    };
      AsyncStorage.getItem("token").then((value) => {
        this.setState({
          token : JSON.parse(value)
        })
      });
  }

  editProfileImage = () => {
    NetInfo.isConnected.fetch().then(isConnected => {
      if(isConnected) {
        this.setState({IsLoaderVisible: true})
        const { UserId }  = this.state;
        var URL=config.BASE_URL+'User/UpdateUserProfileImage';
        const data = new FormData();
        data.append('userId', UserId), 
        data.append('image', {
          uri: this.state.source,
          type: 'image/jpeg',
          name: 'testing'
        });
        fetch(URL, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data',
          },
          body: data
        }).then((response) => response.status).then((responseJson) => {
            this.setState({IsLoaderVisible: false})
      
            Actions.myProfile();
            }).catch((error) => {
            Alert.alert(error);
          });
        } else {
          Alert.alert('Network not available');
        }
    });
  }

  editUserProfile = () => {
    NetInfo.isConnected.fetch().then(isConnected => {
      if(isConnected) {
        this.setState({IsLoaderVisible: true})
        const { UserId, UserName, UserMobile, UserEmail }  = this.state;
        var URL=config.BASE_URL+'User/UpdateUserData?token='+this.state.token;
        console.log(URL, UserId, UserName, UserMobile, UserEmail, 'Data comes' )
        fetch(URL, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: UserId,
            userName: UserName,
            userMobile: UserMobile,
          })
        }).then((response) => response.json()).then((responseJson) => {
          console.log(responseJson)
          if(responseJson.success){
            this.setState({IsLoaderVisible: false})
            Alert.alert('Your Profile Data Successfully Changed.');
            Actions.Dashboard();
          } else{
            const message = responseJson.message;
  
          }
            }).catch((error) => {
 
          });
        } else {
          Alert.alert('Network not available');
        }
    });
  }

  selectPhotoTapped() {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true
      }
    };
    this.setState({ loadingImage: true });
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled photo picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        const uri = response.uri;
        this.setState({
          source: uri
        });
        this.editProfileImage();
      }
    });
  }

    render() {
        const LeftComponent = () => {
            return(
              <View />
            )
          }
      
          const RightComponent = () => {
            return(
              <View />
            )
          }
  
      return (
        <View style={styles.container}>
            <Header
                outerContainerStyles={{ height: 55 }}
                backgroundColor={headerBackgroundColor}
                placement="left"
                leftComponent={<LeftComponent />}
                centerComponent={{ text: 'EDIT PROFILE', style: { color: '#fff', fontWeight: 'bold', fontSize:20 } }}
                rightComponent={<RightComponent/>}
            />
            <ScrollView style={{ flex: 1 }}>
              <TouchableHighlight onPress={this.selectPhotoTapped.bind(this)}>
                <View style={{backgroundColor: headerBackgroundColor, alignItems: 'center', justifyContent: 'center', paddingTop: 10, paddingBottom: 10 }}>
                  <View style={styles.profileImage}>
                  {
                        this.state.source === '' ? <Image style={styles.logo} source={require('../images/photo.png')} /> :
                        <Image style={styles.logo} source={this.state.awsUserImgURL} />
                  }
                  </View>
                </View>
              </TouchableHighlight>
              <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
                <View style={{ width:330, height:40, backgroundColor:'#ffffff', flexDirection: 'row', marginTop: 10, alignContent: 'center', marginBottom: 20 }}>
                  <View style={{ flex: 1.1, flexDirection: 'row' }}>
                    <Image style={{width:25, height:25, marginTop:5}} source={require('../images/blueUser.png')}/>
                    <Text style={{ textAlign: 'center', fontSize:16, fontWeight: 'bold', marginLeft: 5, marginRight: 35, marginTop: 7 }}>Name </Text>
                  </View>
                  <View style={{ flex: 2 }}>
                    <TextInput
                      style={styles.inputBox}
                      underlineColorAndroid="transparent"
                      selectionColor="#000"
                      keyboardType="email-address"
                      returnKeyType="next"
                      value={this.state.UserName}
                      onChangeText={UserName => this.setState({UserName})}
                    />
                  </View>
                </View>

                <View style={{ width:330, height:40, backgroundColor:'#ffffff', flexDirection: 'row', marginTop: 10, alignContent: 'center', marginBottom: 20 }}>
                  <View style={{ flex: 1.1, flexDirection: 'row' }}>
                    <Image style={{width:25, height:25,marginTop:5}} source={require('../images/bluephone.png')}/>
                    <Text style={{ textAlign: 'center', fontSize:16, fontWeight: 'bold', marginLeft: 5, marginRight: 35, marginTop: 7 }}>Mobile No</Text>
                  </View>
                  <View style={{ flex: 2}}>
                    <TextInput
                      style={styles.inputBox}
                      underlineColorAndroid="transparent"
                      selectionColor="#000"
                      keyboardType="email-address"
                      returnKeyType="next"
                      value={this.state.UserMobile}
                      onChangeText={UserMobile => this.setState({UserMobile})}
                    />
                  </View>
                </View>
                
              </View>

              <View style={{ flexDirection: 'row', marginLeft: 20, marginTop: 20, marginBottom: 60 }}>
                  <TouchableOpacity style={{ flex: 1, marginRight: 20, padding: 15, backgroundColor: buttonBackgroundColor}} onPress={() => this.editUserProfile() }>
                      <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}> SAVE CHANGES </Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{ flex: 1, marginRight: 10, padding: 15, backgroundColor: '#d3d3d3'}} onPress={() => Actions.pop()} >
                      <Text style={{ color: buttonBackgroundColor, fontWeight: 'bold', textAlign: 'center' }}> CANCEL </Text>
                  </TouchableOpacity>
              </View>
            </ScrollView>
        </View>
      )
  }
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      flex: 1
    },
    header:{
      height: 60,
      backgroundColor: headerBackgroundColor,
    },
    footerContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'white',
    },
    profileImage:{
      backgroundColor:'white',
      alignSelf:'center',
      justifyContent:'center',
      alignContent:'flex-start',
      height:width*0.25,
      width:width*0.25,
      borderRadius:50,
    },
    logo:{
      height:width*0.22,
      width:width*0.22,
      overflow:'hidden',
      alignSelf:'center',
      borderRadius : 50,
    },
    CircleShapeView: {
      width: 100,
      height: 100,
      borderRadius: 100/2,
      backgroundColor: '#ffffff',
      margin: 0,
      paddingTop: ( Platform.OS === 'ios' ) ? 20 : 0
    },
    btnImage: {
      resizeMode: 'contain',
      height: '100%',
      width: '100%'
    },
    logoText : {
      marginVertical: 10,
      fontSize:16,
      position: 'absolute',
      top: 42,
      left: 10,
      color:'rgba(0, 0, 0, 0.7)'
    },
    picker: {
      width: 280,
      height: 40,
      color:'#ffffff'
    },
    subView: {
      position: 'absolute',
      top: 0,
      left: (Dimensions.get('window').width / 2) - 50,
      alignItems: 'center',
      justifyContent: 'center',
      width: 100,
      height: 100,
      borderColor: 'black',
      borderWidth: 1,
      borderRadius: 50,
      backgroundColor: '#FFF',
    },
    avatar: {
      position: 'absolute',
      top: 25,
      alignItems: 'center',
      width: 50,
      height: 50,  
    },
    inputBox: {
      paddingHorizontal: 10,
      fontSize:16,
      flex:1,
      color:'black',
      borderWidth: 0.5
    },
    searchBox: {
      fontSize:16,
      flex:1,
      color:'black',
      borderWidth: 0.5
    },
    visibilityBtn: {
      position: 'absolute',
      right: 3,
      height: 40,
      width: 35,
      padding: 5
    },
  });
  