import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  ToolbarAndroid,
  TextInput,
  TouchableHighlight,
  Text,
  View,
  Dimensions,
  NetInfo,
  Image,
  AsyncStorage,
  Alert
} from 'react-native';

import { Header } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Actions} from 'react-native-router-flux';
import config from '../common/config';
var { height, width } = Dimensions.get('window');
import {headerBackgroundColor, buttonBackgroundColor} from '../styles';
import HeaderBackgroundColor from '../styles';
import LoadingComponent from '../components/LoadingComponent';

export default class ChangePasswordScreen extends Component {
    constructor(props){
        super(props)
        console.log(props, 'CHANGE')
        this.state= {
            UserPassword: '', 
            IsLoaderVisible: false,
            UserCPassword: '',
            warningPassword: '',
            hidePassword: true,
            hideCPassword: true,
            result:  false,
          };
          AsyncStorage.getItem("token").then((value) => {
            this.setState({
              token : JSON.parse(value)
            })
          });
          AsyncStorage.getItem("userId").then((value) => {
            this.setState({
              userId : value
            })
          });
    }

    changePassword = (oldPassword, userName) => {
        const { UserPassword, UserCPassword, userId, token } = this.state;
        console.log(oldPassword, userName, UserCPassword, UserPassword, userId, token, 'calling')
        if(UserPassword){
            if(UserPassword === UserCPassword) {
                NetInfo.isConnected.fetch().then(isConnected => {
                this.setState({
                    IsLoaderVisible : true,
                })
                if(isConnected) {
                    var URL=config.BASE_URL+'User/UpdatePassword?Token='+token+'&EmailID='+userName+'&UserID='+userId+'&OldPassword='+oldPassword+'&NewPassword='+UserPassword;
                    console.log(URL, 'url change password')
                    fetch(URL, {
                      method: 'POST',
                      headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                      },
                    }).then((response) => response.json())
                      .then((responseJson) => {
                        console.log(responseJson)
                        if(responseJson.success){
                          Alert.alert('Successfully Change Password. Please Login again with New Password');
                          Actions.login();
                          this.setState({
                              IsLoaderVisible: false,
                          })
                        }else{
                          Alert.alert('Password does not change');
                          Actions.myProfile();

                          this.setState({
                              IsLoaderVisible: false,
                          })
                        }
                      }).catch((error) => {
                        console.log(error);
                        });
                    } else {
                        Alert.alert('Network not available');
                        }
                    });
            }else{
            Alert.alert('Password & Confirm Password does not Match')
            }
        }else{
        Alert.alert('Please, Provide a Password')
        }
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

    managePasswordVisibility = () => {
      this.setState({ hidePassword: !this.state.hidePassword });
    }
  
    manageCPasswordVisibility = () => {
      this.setState({ hideCPassword: !this.state.hideCPassword });
    }

  render(){

    console.log(this.state, 'A')

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

    const { oldPassword, userName } = this.props;
    console.log(this.props, 'Change')
    return(
      <View style={styles.outerContainer}>
        <Header
          outerContainerStyles={{ height: 55 }}
          backgroundColor={headerBackgroundColor}
          placement="left"
          leftComponent={<LeftComponent />}
          centerComponent={{ text: 'Change Password', style: { color: '#fff', fontWeight: 'bold', fontSize:20, marginBottom: 3 } }}
          rightComponent={<RightComponent/>}
        />
        <View styles={styles.innerContainer}>
            { this.state.IsLoaderVisible ? 
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <LoadingComponent />
              </View> :
                <View>
                    <View style={{width:300, height:1, backgroundColor:'#8E8C90', marginTop: 0}} />
                    <View style={{width:300, height:40, backgroundColor:'#ffffff',flexDirection: 'row', margin: 40, marginBottom: 0}}>
                        <Image style={{width:25, height:25, marginTop:5}} source={require('../images/blueunlock.png')}/>
                        <TextInput
                            underlineColorAndroid = "transparent"
                            secureTextEntry = { !this.state.hidePassword }
                            placeholder="New password"
                            placeholderTextColor = '#8E8C90'
                            onChangeText={UserPassword => this.passwordTest(UserPassword)}
                            style = { styles.inputBox }
                        />
                        <TouchableHighlight activeOpacity = { 0.8 } style = { styles.visibilityBtn } onPress = { this.managePasswordVisibility }>  
                            <Image source = { ( this.state.hidePassword ) ? require('../images/hide.png') : require('../images/view.png') } style = { styles.btnImage } />
                        </TouchableHighlight>  
                        
                    </View>
                    <View style={{ marginLeft: 35, marginBottom: 30 }}>
                      {
                        this.state.result === true ? <Text style= {{ fontSize: 12, color: "#8E8C90", marginTop: 5, width:300}}>*Password should contain a minimum of 8 characters, and must contain at least one special character, one upper case, one lower case, one number.</Text> :
                          <Text style= {{ fontSize: 12, color: "red", marginTop: 5, width:300}}>* Password should contain a minimum of 8 characters, and must contain at least one special character, one upper case, one lower case, one number.</Text>
                      }
                    </View>
                    
                    <View style={{width:300, height:40, backgroundColor:'#ffffff',flexDirection: 'row', margin: 40, marginTop: 0, marginBottom: 10}}>
                        <Image style={{width:25, height:25, marginTop:5}} source={require('../images/blueunlock.png')}/>
                        <TextInput
                            underlineColorAndroid = "transparent"
                            secureTextEntry = { !this.state.hideCPassword }
                            placeholder="Confirm new password"
                            placeholderTextColor = '#8E8C90'
                            onChangeText={UserCPassword => this.passwordChecker(UserCPassword)}
                            style = { styles.inputBox }
                        />
                        <TouchableHighlight activeOpacity = { 0.8 } style = { styles.visibilityBtn } onPress = { this.manageCPasswordVisibility }>  
                          <Image source = { ( this.state.hideCPassword ) ? require('../images/hide.png') : require('../images/view.png') } style = { styles.btnImage } />
                        </TouchableHighlight>  
                    </View>
                    <Text style= {{ fontSize: 12, color: "#8E8C90", marginTop: 5, width:300}}>{this.state.warningPassword}</Text>
                    
                    <TouchableHighlight onPress={() => this.changePassword(oldPassword, userName)} style={{width: 300, height: 45,backgroundColor: '#ed742f', alignItems:'center', justifyContent:'center',marginTop: 30, marginLeft: 50}}>
                        <Text style= {{ fontSize: 15, color: "#fff"}}>Submit</Text>
                    </TouchableHighlight>
                    </View>
                }
            </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  outerContainer : {
    flex: 1
  },
  innerContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  footerContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    backgroundColor: 'lightgray',
  },
  header:{
    height: 60,
    backgroundColor: '#00A6EB',
  },
  meInfor:{
    backgroundColor: '#FFF',
    top: 0,
    height: 50,
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