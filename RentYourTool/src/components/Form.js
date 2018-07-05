import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  NetInfo,
  TouchableOpacity,
  AsyncStorage,
  Alert, 
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import config from '../common/config';
import Spinner from 'react-native-loading-spinner-overlay';

export default class Logo extends Component {
  constructor(props){
    super(props)
    this.state = {
      UserEmail: '',
      UserPassword: '',
      IsLoaderVisible: false
    }
  }
  UserLoginFunction = (changePassword) => {
    NetInfo.isConnected.fetch().then(isConnected => {
      if(isConnected) {
        this.setState({IsLoaderVisible: true})
        const { UserEmail }  = this.state ;
        const { UserPassword }  = this.state ;
        var URL=config.BASE_URL+'Authentication/GetToken?username='+UserEmail+'&password='+UserPassword; 
        console.log(URL, 'URL')
        if(UserEmail == "" || UserPassword=="" ){
          this.setState({IsLoaderVisible: false})

        } else 
        {
          fetch(URL, {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
          }).then((response) => response.json())
          .then((responseJson) => {
            console.log(responseJson, 'URL')
            if (responseJson.success) {
              this.setState({IsLoaderVisible: false})
              var data = responseJson.data;
              AsyncStorage.setItem('userId', JSON.stringify(data.userInfo.userId)); 
              AsyncStorage.setItem('token', JSON.stringify(data.userInfo.token));
              {
                changePassword == undefined ? this.redirect() : Actions.push('changePassword', { oldPassword : this.state.UserPassword, userName : this.state.UserEmail } );
              }
            }else
            {
              this.setState({IsLoaderVisible: false})
              Alert.alert('Invalid User Name or Password');
              {
                changePassword !== undefined && Actions.login();
              }
            }
          }).catch((error) => {
            Alert.alert('Invalid Response From Server');
            this.setState({IsLoaderVisible: false})
              {
                changePassword !== undefined && Actions.login();
              }
           });
        }
      } else {
        Alert.alert('Network not available');
        this.setState({IsLoaderVisible: false})
        {
          changePassword !== undefined && Actions.login();
        }
      }
    });
  }

  redirect() {
    Actions.Dashboard()
  }
  
  render() {
    return(
      <View style={styles.container}>
        <Spinner visible={this.state.IsLoaderVisible}/>
          <View style={styles.sectionStyle}>
            <Image source={require('../images/useriocn.png')} style={styles.ImageStyle} />
            <TextInput
              style={styles.inputBox}
              underlineColorAndroid='rgba(255,255,255,1.0)'
              placeholder="Email"
              placeholderTextColor = '#ffffff'
              selectionColor="#fff"
              keyboardType="email-address"
              returnKeyType="next"
              onChangeText={UserEmail => this.setState({UserEmail})}
              onSubmitEditing={()=> this.password.focus()}
            />
          </View>
          <View style={styles.sectionStyle}>
            <Image source={require('../images/passwordicon.png')} style={styles.ImageStyle} />
            <TextInput
              style={styles.inputBox}
              underlineColorAndroid='rgba(255,255,255,1.0)'
              placeholder="Password"
              placeholderTextColor = '#ffffff'
              returnKeyType="done"
              secureTextEntry={true}
              onChangeText={UserPassword => this.setState({UserPassword})}
              ref={(input) => this.password = input}
              onSubmitEditing={this._submitForm}
            />
          </View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText} onPress={() => this.UserLoginFunction(this.props.changePassword)}>{this.props.type}</Text>
        </TouchableOpacity> 
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container : {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputBox: {
    width: 280,
    height: 40,
    paddingHorizontal: 16,
    fontSize:16,
    color:'#ffffff',
    marginVertical: 10,
  },
  button : {
    width: 300,
    height: 50,
    backgroundColor: '#00C2AE',   
    marginVertical: 10,
    paddingVertical: 13,
  },
  buttonText: {
    fontSize: 16,
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
    margin: 10
  },
  ImageStyle: {
    padding: 10,
    height: 25,
    width: 25,
    resizeMode : 'stretch',
    alignItems: 'center'
  },
});
