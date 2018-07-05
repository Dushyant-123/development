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
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  NetInfo,
  PixelRatio,
  CheckBox
} from 'react-native';

import Spinner from 'react-native-loading-spinner-overlay';
import ImagePicker from 'react-native-image-picker';
import {Actions} from 'react-native-router-flux';
import TextInputMask from 'react-native-text-input-mask';
import moment from 'moment';
import { headerBackgroundColor, buttonBackgroundColor } from '../styles';
var { height, width } = Dimensions.get('window');

import Logo from '../components/Logo';
import Form from '../components/Form';
import config from '../common/config';

export default class CreateAccount extends Component {
  static navigationOptions = {
    title: 'Create Account',
    headerTitleStyle: {alignSelf: 'center', paddingRight: 40},
};

  scrolldown(ref) {
    const self = this;
    this.refs[ref].measure((ox, oy, width, height, px, py) => {
      self.refs.scrollView.scrollTo({y: oy + 130});
    });
  }

  constructor(props) {
    super(props)
    this.state = { 
      showAlert: false,
      source: ''
    };
    this.state = { hidePassword: true };
    this.state = { hideCPassword: true };
    this.state = { 
      PickerValueHolder : '', 
      loadingImage : false      
    };
    this.state= {
      UserId: 0, 
      UserName:'',
      warningName: '* Required Field.',
      UserPassword: '',
      warningPassword: '* Required Fields.',
      UserMobile:'',
      warningMobile: '* Required Field.',
      UserEmail: '',
      warningEmail: '* Required Field.',
      result:  false,
      warningTermcondition: 'Please mark your agreement to to terms and conditions',
      userImage: '',
      UserType: 0 ,
      UserQusAns:'',
      IsUserdeleted: true,
      awsUserImgURL:' ',
      awsUserImageName: '',     
      IsLoaderVisible: false,
      UserCPassword: '',  
      warningImage: '',
      ButtonStateHolder: false
    };
  }

  UserRegistrationFunction = () => {
    console.log('calling');
    var dateTime = new Date();
    dateTime = moment(dateTime).format("YYYY-MM-DD HH:mm:ss");

      const { warningEmail, warningMobile, warningName, warningImage, result } = this.state;
      if( this.state.UserName === '') {
        this.setState({ warningName: '* Required Field.'})
      } else if(this.state.UserEmail === ''){
        this.setState({ warningEmail: '* Required Field.'})
      }else if(this.state.UserMobile === ''){
        this.setState({ warningMobile: '* Required Field.'})
      }else if(this.state.UserMobile.length < 10){
        this.setState({ warningMobile: '* Mobile Number should be 10 digit.'})        
      } else if (!result){
        
      }else {
        NetInfo.isConnected.fetch().then(isConnected => {
          if(isConnected) {
            const { UserId, UserName, UserPassword, UserMobile, UserEmail, userImage,
              UserType, PickerValueHolder, IsUserdeleted, awsUserImgURL,
              awsUserImageName }  = this.state;  
            var URL=config.BASE_URL+'User/RegisterUser';
            const data = new FormData();
            data.append('userId', 0), 
            data.append('userName', UserName), 
            data.append('userPassword', UserPassword), 
            data.append('userMobile', UserMobile) ,
            data.append('userEmail', UserEmail),
            data.append('userImage', ''),
            data.append('userType', UserType),
            data.append('userQusAns', PickerValueHolder),  
            data.append('isDeleted', IsUserdeleted),
            data.append('awsUserImgURL', ''),
            data.append('awsUserImageName', ''),                      
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
            }).then((response) => response.json()).then((responseJson) => {
            var data = responseJson.message;
            console.log(responseJson, 'user Response')
            if(responseJson.success){
                this.setState({IsLoaderVisible: false})
                this.ShowAlertDialog();
              } else {
                this.setState({IsLoaderVisible: false})
                // Alert.alert(data);
              }
              }).catch((error) => {
                // Alert.alert(error);
              });
            }
          })
        }
  }

  ShowAlertDialog = () => {
    Alert.alert(
      'Success',
      'Your account is successfully created. Please login with your email id',
      [
        {
          
        },
        {
          text: 'OK', onPress: () =>   Actions.login()
        },
      ],
      { cancelable: false }
    )
  }

  managePasswordVisibility = () => {
    this.setState({ hidePassword: !this.state.hidePassword });
  }

  manageCPasswordVisibility = () => {
    this.setState({ hideCPassword: !this.state.hideCPassword });
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
    this.setState({ loadingImage: true, warningImage: '' });
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled photo picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        var ImgURL=config.BASE_URL+'ToolsConfiguration/ToolImgUpload';
        const uri = response.uri;
        const fileName = response.fileName;
        this.setState({
          source: uri,
          warningImage: ''
        });
      }
    });
  }
    //Used for User Name Required Field
    nameChecker(UserName) {
        this.setState({UserName : UserName})
        if(UserName === ''){
          this.setState({ warningName : '* Required Field.' })
        }else{
          this.setState({ warningName : '' })
        }
    }

    //Used for Password Checker Field
    passwordChecker = (UserCPassword) => {
      this.setState({
        UserCPassword : UserCPassword,
      })
      const { UserPassword} = this.state;
      if(UserCPassword === UserPassword){
        this.setState({
          warningPassword : ''
        })
      }else{
        this.setState({
          warningPassword : 'Password does not match'
        })
      }
    }

    emailChecker = (UserEmail) => {
      this.setState({UserEmail : UserEmail})
        if(UserEmail === ''){
          this.setState({ warningEmail : '* Required Field.' })
        }else{
          this.setState({ warningEmail : '' })
        }
    }

    phoneNumberChecker = (UserEmail) => {
        this.setState({UserEmail : UserEmail})
          if(UserEmail === ''){
            this.setState({ warningEmail : '* Required Field' })
          }else{
            this.setState({ warningEmail : '' })
          }
    }


    redirect() {
      Actions.response()
    }

    passwordTest(UserPassword) {
      this.setState({UserPassword : UserPassword})
      var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
      const result = re.test(UserPassword);
      console.log(result)
      if(result){
        this.setState({
          result: true,
        })
      }else{
        this.setState({
          result: false,
        })
      }
     
    }

    canBeSubmitted() {
      const { UserName, UserMobile, warningPassword, warningEmail, UserEmail, checked, source  } = this.state;
      console.log(UserName, UserMobile, warningPassword, UserEmail, checked, source, 'AAA')
      return (
        UserName.length > 0 &&
        UserMobile.length > 9 &&
        warningPassword === '' &&
        warningEmail === '' &&
        checked === true &&
        source !== undefined
      );
    }

    render() {
      const {showAlert} = this.state;
      let data = [
        { value: 'Google' }, { value: 'Linkedin' }, { value: 'Social Site' }
      ];

      const isEnabled = this.canBeSubmitted();

      //Create Account Functionality Code Start
      return(
        <ScrollView ref="scrollView" contentContainerStyle={{backgroundColor: '#FFF',}}>
          <Spinner visible={this.state.IsLoaderVisible} />
            <View style={styles.container}>
              <View style={styles.meInfor} />
              <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
                <View style={{backgroundColor: headerBackgroundColor, alignItems: 'center', justifyContent: 'center', paddingTop: 10, paddingBottom: 10 }}>
                  <View style={styles.profileImage}>
                    {
                      this.state.source === undefined ? <Image style={styles.logo} source={require('../images/photo.png')} /> :
                          <Image style={styles.logo} source={{ uri: this.state.source }} />
                    }
                  </View>
                </View>
              </TouchableOpacity>
            </View>
            <View style={{ marginLeft: 50, marginTop: 20 }}>         
            <View style={{width:300, height:40, backgroundColor:'#ffffff', flexDirection: 'row' }}>
              <Image style={{width:25, height:25, marginTop:5}} source={require('../images/blueUser.png')}/>
              <TextInput
                style={styles.inputBox}
                underlineColorAndroid="transparent"
                placeholder="User Name"
                placeholderTextColor = '#8E8C90'
                selectionColor="#000"
                keyboardType="email-address"
                returnKeyType="next"
                onFocus={() => this.setState({ warningName : '' })}
                onSubmitEditing={() => { this.UserPassword.focus(); }}
                onChangeText={UserName => this.nameChecker(UserName)}
              />
            </View>
            <View style={{width:300, height:1, backgroundColor:'#8E8C90', marginTop: 0}} />

            <View style={{width:300, height:40, backgroundColor:'#ffffff',flexDirection: 'row', marginTop: 15}}>
              <Image style={{width:25, height:25, marginTop:5}} source={require('../images/blueunlock.png')}/>
              <TextInput
                underlineColorAndroid = "transparent"
                secureTextEntry = { !this.state.hidePassword }
                placeholder="Password"
                placeholderTextColor = '#8E8C90'
                onChangeText={UserPassword => this.passwordTest(UserPassword)}
                style = { styles.inputBox }
              />
              <TouchableOpacity activeOpacity = { 0.8 } style = { styles.visibilityBtn } onPress = { this.managePasswordVisibility }>  
                <Image source = { ( this.state.hidePassword ) ? require('../images/hide.png') : require('../images/view.png') } style = { styles.btnImage } />
              </TouchableOpacity>  
            </View>
            <View style={{width:300, height:1, backgroundColor:'#8E8C90', marginTop: 0}} />
            {
              this.state.result === true ? <Text style= {{ fontSize: 12, color: "#8E8C90", marginTop: 5, width:300}}>*Password should contain a minimum of 8 characters, and must contain at least one special character, one upper case, one lower case, one number.</Text> :
              <Text style= {{ fontSize: 12, color: "#8E8C90", marginTop: 5, width:300}}>* Password should contain a minimum of 8 characters, and must contain at least one special character, one upper case, one lower case, one number.</Text>
            }
            

            <View style={{width:300, height:40, backgroundColor:'#ffffff',flexDirection: 'row', marginTop: 15}}>
              <Image style={{width:25, height:25, marginTop:5}} source={require('../images/blueunlock.png')}/>
              <TextInput
                underlineColorAndroid = "transparent"
                secureTextEntry = { !this.state.hideCPassword }
                placeholder="Please re-enter the password"
                placeholderTextColor = '#8E8C90'
                onFocus={() => this.setState({ warningPassword : '' })}
                onChangeText={UserCPassword => this.passwordChecker(UserCPassword)}
                style={styles.inputBox}
              />
              <TouchableOpacity activeOpacity = { 0.8 } style = { styles.visibilityBtn } onPress = { this.manageCPasswordVisibility }>  
                <Image source = { ( this.state.hideCPassword ) ? require('../images/hide.png') : require('../images/view.png') } style = { styles.btnImage } />
              </TouchableOpacity>  
            </View>
            <View style={{width:300, height:1, backgroundColor:'#8E8C90', marginTop: 0}} />

            <View style={{width:300, height:40, marginTop: 20, backgroundColor:'#ffffff',flexDirection: 'row'}}>
              <Image style={{width:25, height:25, marginTop:5}} source={require('../images/bluemail.png')}/>
              <TextInput
                ref="password"
                style={styles.inputBox}
                underlineColorAndroid="transparent"
                placeholder="Email Address"
                onFocus={() => this.setState({ warningEmail : '' })}
                placeholderTextColor = '#8E8C90'
                selectionColor="#000"
                keyboardType="email-address"
                returnKeyType="done"
                onSubmitEditing={()=> { this.UserMobile.focus(); }}
                onChangeText={ UserEmail => this.emailChecker(UserEmail)}
              />
            </View>
            <View style={{width:300, height:1, backgroundColor:'#8E8C90', marginTop: 0}} />

            <View style={{width:300, height:40, marginTop: 20, backgroundColor:'#ffffff',flexDirection: 'row' }}>
                  <Image style={{width:25, height:25,marginTop:5}} source={require('../images/bluephone.png')}/>
                  <TextInputMask ref="password"
                    style={styles.inputBox}
                    underlineColorAndroid="transparent"
                    placeholder="Phone Number"
                    placeholderTextColor = '#8E8C90'
                    onFocus={() => this.setState({ warningMobile : '' })}
                    selectionColor="#000"
                    keyboardType={'numeric'}
                    returnKeyType="done" 
                    refInput={ref => { this.input = ref }}
                    onChangeText={(formatted, extracted) => {
                      this.setState({
                        UserMobile : extracted 
                      })
                      if(extracted === ''){
                        this.setState({ warningMobile : '* Required Field.' })
                      }else{
                        this.setState({ warningMobile : '' })
                      }
                    }}
                    mask={"([000]) [000]-[0000]"}
                  />
                </View>
                <View style={{width:300, height:1, backgroundColor:'#8E8C90', marginTop: 0}} />
                </View>

                <View style={{flex: 1,backgroundColor: 'lightgray',marginTop: 30}}>
                  <View style={{backgroundColor: '#00A6EB', top: 0, height: 200, width: (Dimensions.get('window').width), alignItems:'center'}}>
                    <View style={{width:300, height:40, backgroundColor:'#00A6EB',flexDirection: 'row', marginTop: 20}}>
                      <Picker style = { styles.picker }
                        selectedValue={this.state.PickerValueHolder}
                        onValueChange={(itemValue, itemIndex) => this.setState({PickerValueHolder: itemValue})}
                      >
                        <Picker.Item label="How did you hear about us?" value="How did you hear about us" />
                        <Picker.Item label="Google" value="Google" />
                        <Picker.Item label="Facebook" value="Facebook" />
                        <Picker.Item label="Linkedin" value="Linkedin" />
                        <Picker.Item label="SocialSite" value="Social Site" />
                      </Picker>
                    </View>
                    <View style={{width:300, height:1, backgroundColor:'#ffffff', marginTop: 0,}} />
                    <View style={{ flexDirection: 'column', marginTop: 20, marginBottom: 20 }}>
                      <View style={{ flexDirection: 'row' }}>
                        <CheckBox
                          value={this.state.checked}
                          onValueChange={() => {
                            this.setState({ checked: !this.state.checked })
                            if(!this.state.checked){
                              this.setState({
                                warningTermcondition: '',
                              })
                            } else{
                              this.setState({
                                warningTermcondition: 'Please mark your agreement to to terms and conditions',
                              })
                            }
                          }}
                        />
                        <Text style= {{ left:10,fontSize: 15, color: "#ffffff", marginTop: 5, width:275}}>You agree to our term and services and you have read our Privacy Policy.</Text>
                      </View>
                    </View>
                    
                    <TouchableHighlight disabled={!isEnabled} onPress={this.UserRegistrationFunction} style={{width: 300, height: 45, backgroundColor: !isEnabled ? '#FFA07A' : buttonBackgroundColor, alignItems:'center', justifyContent:'center', marginBottom: 20 }}>
                      <Text style= {{ fontSize: 15, color: "#fff"}}>Create New Account</Text>
                    </TouchableHighlight>
                  </View>
                </View>
          </ScrollView>
    );
    //Create New Account Functionality Code End.
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgray',
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
  header:{
    height: 60,
    backgroundColor: '#00A6EB',
  },
  meInfor:{
    backgroundColor: '#FFF',
    top: 0,
    width: (Dimensions.get('window').width),   
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
  logo:{
    height:width*0.22,
    width:width*0.22,
    overflow:'hidden',
    alignSelf:'center',
    borderRadius : 50,
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
    color:'#000',
  },
  visibilityBtn: {
    position: 'absolute',
    right: 3,
    height: 40,
    width: 35,
    padding: 5
  },
});




