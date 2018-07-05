import React, { Component } from 'react';
import {
StyleSheet,
  Text,
  Platform,
   TextInput,
   TouchableOpacity,
  View,
  Picker,
  NetInfo,
  PixelRatio,
  Image,
  Alert
} from 'react-native';

import {Actions} from 'react-native-router-flux';

import config from '../common/config';
import styles from '../style/registrationStyle';
import Spinner from 'react-native-loading-spinner-overlay';
import ImagePicker from 'react-native-image-picker';
import Form from '../components/Form';
export default class Registration extends Component {
constructor()
  {
    super();
 
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

            const { UserName }  = this.state;
  
            const { UserPassword }  = this.state
  
            const {UserCPassword}=this.state;
    
            const { UserMobile }  = this.state ;
   
            const { UserEmail }  = this.state ;
     
            const { ImageSource }  = this.state ;
        
            const { UserType }  = this.state ;
   
            const { PickerValueHolder }  = this.state ;
      
            const { IsUserdeleted }  = this.state ;
        
            var URL=config.BASE_URL+'User/RegisterUser';
        
            fetch(URL,  {
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
             
        
                      this.setState({IsLoaderVisible: false})
              
                      this.redirect();
               }).catch((error) => 
                                {
                      
                                 console.error(error);
                                });
        }
        else
        {
           Alert.alert('Network not available');
        }
     });
 }

  managePasswordVisibility = () =>
  {
    this.setState({ hidePassword: !this.state.hidePassword });
  }
   manageCPasswordVisibility = () =>
  {
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
    this.setState({ loadingImage: true });
      ImagePicker.showImagePicker(options, (response) => {
        console.log('Response = ', response);
  
        if (response.didCancel) {z
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
     redirect() {
  
    Actions.response()
  }
  render(){
     let data = [{
      value: 'Google',
    }, {
      value: 'Linkedin',
    }, {
      value: 'Social Site',
    }];
    return(


        <ScrollView ref="scrollView" contentContainerStyle={{alignItems:'center',justifyContent: 'center',backgroundColor: '#FFF',}}>
        
          <View style={styles.container}>
            <View style={styles.header}></View>
            <View style={styles.meInfor}></View>
            <View style={styles.subView}>
            <TouchableHighlight onPress={() => navigate("ShowcaseYourToolPage", {screen: "Screen Fourth"})} style={{width:100, height:100, backgroundColor: '#ffffff', alignItems:'center', justifyContent:'center',marginTop:0,borderColor: 'black', borderWidth: 1, borderRadius: 50,}}>
              <Image style={styles.avatar} source={require('../images/camera.png')}/>
            </TouchableHighlight>
              
            </View>

            
          </View>
      </ScrollView>

      <View style={styles.container}>
      <Spinner visible={this.state.IsLoaderVisible} />
     
      <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>

           <View style={styles.CircleShapeView}>
            { 
               this.state.ImageSource === ' ' ? <Text style={styles.logoText}>Add Photo!</Text> :
              <Image style={styles.CircleShapeView}source={this.state.ImageSource} />
            }

             <Image 
               
          />
          </View>
</TouchableOpacity>
     
        <View style={styles.sectionStyle}>

          <Image source={require('../images/user.png')} style={styles.ImageStyleedit} />
          <TextInput style={styles.inputBox}underlineColorAndroid='rgba(255,255,255,1.0)'  placeholder="User Name" placeholderTextColor = '#ffffff' selectionColor="#fff" keyboardType="email-address" returnKeyType="next"onChangeText={UserName => this.setState({UserName})} onSubmitEditing={()=> this.password.focus()}/>
        </View>
                
       <View style = { styles.sectionStyle }>
          <Image source={require('../images/password.png')} style={styles.ImageStyleedit} />
      
          <TextInput underlineColorAndroid = 'rgba(255,255,255,1.0)' secureTextEntry = { this.state.hidePassword } style = { styles.inputBox }placeholder="Password" placeholderTextColor = '#ffffff'onChangeText={UserPassword => this.setState({UserPassword})} returnKeyType="next" />
          <TouchableOpacity activeOpacity = { 0.8 } style = { styles.visibilityBtn } onPress = { this.managePasswordVisibility }>
            <Image source = { ( this.state.hidePassword ) ? require('../images/hide.png') : require('../images/view.png') } style = { styles.btnImage } />
          </TouchableOpacity>
        </View>

         <View style = { styles.sectionStyle }>
          <Image source={require('../images/password.png')} style={styles.ImageStyleedit} />
      
          <TextInput underlineColorAndroid = 'rgba(255,255,255,1.0)' secureTextEntry = { this.state.hideCPassword } style = { styles.inputBox }placeholder="Confrim Password" onChangeText={UserCPassword => this.setState({UserCPassword})}placeholderTextColor = '#ffffff' returnKeyType="next" />
          <TouchableOpacity activeOpacity = { 0.8 } style = { styles.visibilityBtn } onPress = { this.manageCPasswordVisibility }>
            <Image source = { ( this.state.hideCPassword ) ? require('../images/hide.png') : require('../images/view.png') } style = { styles.btnImage } />
          </TouchableOpacity>
        </View>

       

        <View style = { styles.sectionStyle }>
          <Image source={require('../images/email.png')} style={styles.ImageStyleedit} />
      
           <TextInput style={styles.inputBox}underlineColorAndroid='rgba(255,255,255,1.0)'  placeholder="Email Address" onChangeText={UserEmail => this.setState({UserEmail})} placeholderTextColor = '#ffffff' selectionColor="#fff" keyboardType="email-address" returnKeyType="next" onSubmitEditing={()=> this.password.focus()}/>
      
        </View>

         <View style = { styles.sectionStyle }>
          <Image source={require('../images/phone.png')} style={styles.ImageStyleedit} />
      
         <TextInput style={styles.inputBox}underlineColorAndroid='rgba(255,255,255,1.0)'  placeholder="Phone Number" placeholderTextColor = '#ffffff' selectionColor="#fff" keyboardType="email-address"onChangeText={UserMobile => this.setState({UserMobile})} returnKeyType="next" onSubmitEditing={()=> this.password.focus()}/>
      
        </View>
        <View>
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

<TouchableOpacity   style={styles.button}>
          <Text style={styles.buttonText} onPress={this.UserRegistrationFunction}>Create New Account</Text>
        </TouchableOpacity>
      
        </View>
      )
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
sectionStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,    
    height: 40,    
    margin: 10
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
});