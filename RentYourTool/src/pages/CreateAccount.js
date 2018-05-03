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


import Logo from '../components/Logo';
import Form from '../components/Form';
import config from '../common/config';

import Spinner from 'react-native-loading-spinner-overlay';
import ImagePicker from 'react-native-image-picker';
import {Actions} from 'react-native-router-flux';
import TextInputMask from 'react-native-text-input-mask';

export default class CreateAccount extends Component<Props> {

  static navigationOptions = {
        title: 'Create Account',
        headerStyle: {
          backgroundColor: '#00A6EB'
        },
        headerTintColor: '#ffffff',
   }



scrolldown(ref) {
    const self = this;
    this.refs[ref].measure((ox, oy, width, height, px, py) => {
        self.refs.scrollView.scrollTo({y: oy + 130});
    });
}


constructor(props) {
 
    super(props)
        this.state = { showAlert: false };
  

  
   
     this.state = { hidePassword: true };
     this.state = { hideCPassword: true };

     this.state={ 
       PickerValueHolder : '', 
       loadingImage : false      
    };
    this.state=
       {
        UserId: 0, 
        UserName:'',
        UserPassword: '',
        UserCPassword: '',
        UserMobile:'',
        UserEmail: '',
        ImageSource:' ',
        UserType: 0 ,
        UserQusAns:'',   
        IsUserdeleted:true,   
        IsLoaderVisible: false  
       }; 
 
  }
 
 

 UserRegistrationFunction = () =>
 {
     NetInfo.isConnected.fetch().then(isConnected => 
     {
        if(isConnected)
        {
            this.setState({IsLoaderVisible: true})
            const { UserId }  = this.state;
            console.log(UserId);
            const { UserName }  = this.state;
            console.log("USERNAME",UserName);
            const { UserPassword }  = this.state
            console.log(UserPassword);
            const {UserCPassword}=this.state;
            console.log(UserCPassword);
            const { UserMobile }  = this.state ;
            console.log(UserMobile);
            const { UserEmail }  = this.state ;
            console.log(UserEmail);
            const { ImageSource }  = this.state ;
            console.log(ImageSource);
            const { UserType }  = this.state ;
            console.log(UserType);
            const { PickerValueHolder }  = this.state ;
            console.log(PickerValueHolder);
            const { IsUserdeleted }  = this.state ;
            console.log(IsUserdeleted);
            var URL=config.BASE_URL+'User/RegisterUser';
            console.log(URL);
            if (this.state.checked === true) 
            {

            
            if (UserPassword == UserCPassword) 
            {


                  
            if(UserName == "" || UserPassword=="" ||UserMobile==""||UserEmail=="")
              {
                 this.setState({IsLoaderVisible: false})
                 Alert.alert("Please Enter All the Values.");
              }
              else
              {
            fetch(URL,
               {
              method: 'POST',
              headers: {
                         'Accept': 'application/json',
                         'Content-Type': 'application/json',
                       },
              body: JSON.stringify(
               {
                       userId: UserId, 
                       userName: UserName, 
                       userPassword: UserPassword, 
                       userMobile: UserMobile ,
                       userEmail: UserEmail ,
                       userImage: ImageSource ,
                       userType: UserType ,
                       userQusAns: PickerValueHolder,  
                       isDeleted:IsUserdeleted
               })
            
            }).then((response) => response.status).then((responseJson) => 
               {
                 console.log("JsonDATA",responseJson);
        
                      this.setState({IsLoaderVisible: false})
                      this.ShowAlertDialog();
               }).catch((error) => 
                                {
                                  alert(error);
                                 console.error(error);
                                });
              }
              } 
              else{
                 this.setState({IsLoaderVisible: false})
                alert('Password not matched');
              }
            }
            else{
                  this.setState({IsLoaderVisible: false})
                  alert('Please check terms & conditions');
            }

        }
        else
        {
           alert('Network not available');
        }
     });
 }
ShowAlertDialog = () =>{


   console.log("Call Alart method;");
 
  Alert.alert(
    
    // This is Alert Dialog Title
    'Success',
 
    // This is Alert Dialog Message. 
    'You have successfully registration!',
    [
      
      // Second Cancel Button in Alert Dialog.
      {text: 'Cancel', onPress: () => {onDismiss: () => {}}, style: 'cancel'},
 
      // Third OK Button in Alert Dialog
      {text: 'OK', onPress: () =>   this.redirect()},
      
    ],
     { cancelable: false }
 
  )
 
}

  managePasswordVisibility = () =>
  {
    this.setState({ hidePassword: !this.state.hidePassword });
  }
   manageCPasswordVisibility = () =>
  {
    this.setState({ hideCPassword: !this.state.hideCPassword });
  }
  selectPhotoTapped() 
  {
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
        console.log('Response = ', response);
  
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
          let source = { uri: response.uri };
  
          // You can also display the image using data:
          // let source = { uri: 'data:image/jpeg;base64,' + response.data };
  
          this.setState({
 
            ImageSource: source
 
          });
        }
      });
    }
     redirect()
      {
    console.log('Call Method');
    Actions.response()
     }
   render() {
    const {showAlert} = this.state;

     let data = [{
      value: 'Google',
    }, {
      value: 'Linkedin',
    }, {
      value: 'Social Site',
    }];
      const { navigate } = this.props.navigation
    return(
      
        <ScrollView ref="scrollView" contentContainerStyle={{alignItems:'center',justifyContent: 'center',backgroundColor: '#FFF',}}>
        <Spinner visible={this.state.IsLoaderVisible} />
       
          <View style={styles.container}>
            <View style={styles.header}></View>
            <View style={styles.meInfor}></View>
             <View style={styles.subView}>
           <TouchableOpacity style={{width:100, height:100, backgroundColor: '#ffffff', alignItems:'center', justifyContent:'center',marginTop:0,borderColor: 'black', borderWidth: 1, borderRadius: 50,}} onPress={this.selectPhotoTapped.bind(this)}>

           <View style={{width:100, height:100,borderRadius:100/2}}>
            { 
               this.state.ImageSource === ' ' ? <Text style={styles.logoText}>Add Photo!</Text> :
              <Image style={{width:100, height:100,borderRadius:100/2}}source={this.state.ImageSource} />
            }

           
          </View>
</TouchableOpacity>
</View>
</View>

          <View style={{width:300, height:40, backgroundColor:'#ffffff',flexDirection: 'row', marginTop: 10}}>
            <Image style={{width:25, height:25, marginTop:5}} source={require('../images/blueUser.png')}/>
            <TextInput style={styles.inputBox} underlineColorAndroid="transparent" placeholder="User Name" placeholderTextColor = '#8E8C90' selectionColor="#000" keyboardType="email-address" returnKeyType="next" onSubmitEditing={() => { this.UserPassword.focus(); }} onChangeText={UserName => this.setState({UserName})}/>
          </View>
          <View style={{width:300, height:1, backgroundColor:'#8E8C90', marginTop: 0}}>
          </View>

          <View style={{width:300, height:40, backgroundColor:'#ffffff',flexDirection: 'row', marginTop: 15}}>
            <Image style={{width:25, height:25, marginTop:5}} source={require('../images/blueunlock.png')}/>
            <TextInput  style={styles.inputBox} underlineColorAndroid="transparent" secureTextEntry = { this.state.hidePassword } placeholder="Password" placeholderTextColor = '#8E8C90' selectionColor="#000" keyboardType="email-address" returnKeyType="next" onSubmitEditing={()=> { this.UserCPassword.focus(); }} onChangeText={UserPassword => this.setState({UserPassword})}/>
            <TouchableOpacity activeOpacity = { 0.8 } style = { styles.visibilityBtn } onPress = { this.managePasswordVisibility }>
             <Image source = { ( this.state.hidePassword ) ? require('../images/hide.png') : require('../images/view.png') } style = { styles.btnImage } />
         </TouchableOpacity> 
          </View>
          <View style={{width:300, height:1, backgroundColor:'#8E8C90', marginTop: 0}}>
          </View>

          <View style={{width:300, height:40, backgroundColor:'#ffffff',flexDirection: 'row', marginTop: 15}}>
            <Image style={{width:25, height:25, marginTop:5}} source={require('../images/bluelock.png')}/>
            <TextInput  style={styles.inputBox} underlineColorAndroid="transparent" secureTextEntry = { this.state.hideCPassword } placeholder="Confirm Password" placeholderTextColor = '#8E8C90' selectionColor="#000" keyboardType="email-address" returnKeyType="next" onSubmitEditing={()=> { this.UserEmail.focus(); }} onChangeText={UserCPassword => this.setState({UserCPassword})}/>
            <TouchableOpacity onPress = { this.manageCPasswordVisibility } style={{width: 25, height: 25,backgroundColor: '#ffffff', alignItems:'center', justifyContent:'center',marginTop:5}}>
                <Image source = { ( this.state.hideCPassword ) ? require('../images/hide.png') : require('../images/view.png') } style = { styles.btnImage } />
          </TouchableOpacity> 
            
          </View>
          <View style={{width:300, height:1, backgroundColor:'#8E8C90', marginTop: 0}}>
          </View>

          <Text style= {{ fontSize: 12, color: "#8E8C90", marginTop: 5, width:300}}>Password should be a minimum of 8 characters, must contain at least one upper case, one lower case, one number.</Text>

          <View style={{width:300, height:40, backgroundColor:'#ffffff',flexDirection: 'row', marginTop: 30}}>
            <Image style={{width:25, height:25, marginTop:5}} source={require('../images/bluemail.png')}/>
            <TextInput ref="password"   style={styles.inputBox} underlineColorAndroid="transparent" placeholder="Email Address" placeholderTextColor = '#8E8C90' selectionColor="#000" keyboardType="email-address" returnKeyType="done" onSubmitEditing={()=> { this.UserMobile.focus(); }} onChangeText={UserEmail => this.setState({UserEmail})}/>
          </View>
          <View style={{width:300, height:1, backgroundColor:'#8E8C90', marginTop: 0}}>
          </View>

          <Text style= {{ fontSize: 12, color: "#8E8C90", marginTop: 5, width:300}}>Validate email address using standard email verification.</Text>

          
          <View style={{width:300, height:40, backgroundColor:'#ffffff',flexDirection: 'row', marginTop: 30}}>
            <Image style={{width:25, height:25,marginTop:5}} source={require('../images/bluephone.png')}/>

 <TextInputMask ref="password"   style={styles.inputBox} underlineColorAndroid="transparent" placeholder="Phone Number" placeholderTextColor = '#8E8C90' selectionColor="#000" keyboardType={'numeric'} returnKeyType="done"  refInput={ref => { this.input = ref }}
   onChangeText={(formatted, extracted) => {
    this.setState({
      UserMobile : extracted 
    })
    console.log("Hello format",formatted) // +1 (123) 456-78-90
    console.log("Hello extracted",extracted) // 1234567890
  }}
  mask={"([000]) [000]-[0000]"} />


  
            
          </View>
          <View style={{width:300, height:1, backgroundColor:'#8E8C90', marginTop: 0}}>
          </View>
          

          <Text style= {{ fontSize: 12, color: "#8E8C90", marginTop: 5, width:300}}>Phone number should be in (xxx) xxx-xxxx format.</Text>

          <Text style= {{ fontSize: 12, color: "#8E8C90", marginTop: 30, width:300}}>We will use your email and phone number to send you notification based on your preferences.</Text>

            <View style={{flex: 1,backgroundColor: 'lightgray',marginTop: 30}}>
            
            <View style={{backgroundColor: '#00A6EB', top: 0, height: 200, width: (Dimensions.get('window').width), alignItems:'center'}}>
            
           <View style={{width:300, height:40, backgroundColor:'#00A6EB',flexDirection: 'row', marginTop: 20}}>
            
              
       <Picker style = { styles.picker }
        selectedValue={this.state.PickerValueHolder}
        mode="dropdown"
        onValueChange={(itemValue, itemIndex) => this.setState({PickerValueHolder: itemValue})} >

        <Picker.Item label="How did you hear about us?" value="How did you hear about us" />
        <Picker.Item label="Google" value="Google" />
        <Picker.Item label="Facebook" value="Facebook" />
        <Picker.Item label="Linkedin" value="Linkedin" />
        <Picker.Item label="SocialSite" value="Social Site" />
    
      </Picker>
       
        
              </View>


              <View style={{width:300, height:1, backgroundColor:'#ffffff', marginTop: 0}}>
              </View>
              <View style={{ flexDirection: 'column'}}>
 
  <View style={{ flexDirection: 'row' }}>
    <CheckBox
      value={this.state.checked}
      onValueChange={() => this.setState({ checked: !this.state.checked })}
    />
     <Text style= {{ left:10,fontSize: 15, color: "#ffffff", marginTop: 5, width:275}}>You agree to our term and services and you have read our Privacy Policy.</Text>
              </View>
</View>

            
              
              <TouchableHighlight onPress={this.UserRegistrationFunction} style={{width: 300, height: 45,backgroundColor: '#ed742f', alignItems:'center', justifyContent:'center',marginTop: 30}}>
              <Text style= {{ fontSize: 15, color: "#fff"}}>Create New Account</Text>
            </TouchableHighlight> 

            </View>

           </View>
 
        </ScrollView>
      
      );
    }
}


const styles = StyleSheet.create({
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
 btnImage:
  {
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
  visibilityBtn:
  {
    position: 'absolute',
    right: 3,
    height: 40,
    width: 35,
    padding: 5
  },
});


























