import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  ToolbarAndroid,
  Text,
  TextInput,
  View,
  ScrollView,
  Image,
  AsyncStorage,
  NetInfo,
  Dimensions,
  Alert,
  TouchableOpacity
} from 'react-native';
import { Header } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Actions} from 'react-native-router-flux';
import config from '../common/config';
import LoadingComponent from '../components/LoadingComponent';
const { height, width } = Dimensions.get('window');
import FooterComponent from '../components/Footer';
import {headerBackgroundColor, buttonBackgroundColor} from '../styles';

const UserProfileData = {}

export default class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      userId: '',
      renterSwitch: false,
      muteNotification: false,
    }
    AsyncStorage.getItem("userId").then((value) => {
      this.setState({
        userId : value
      })
      this.getUserData();
    });
  }

  getUserData() {
    NetInfo.isConnected.fetch().then(isConnected => {
        const { userId }  = this.state ;
        if(isConnected) {
          var URL=config.BASE_URL+ 'User/GetUser?id='+this.state.userId;
          fetch(URL, {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
          }).then((response) => response.json())
            .then((responseJson) => {
              UserProfileData = responseJson;
              this.setState({
                isLoading : false
              })
          })
        .catch((error) => {
          this.setState({
            isLoading: false,
            noData: true
          })

        });
      }
      else {
        this.setState({
          isLoading: false,
          noData: true
        })
   
      }
    })
  }

  ownerSwitchButton = () => {
    this.setState(prevState => ({
      renterSwitch: !prevState.renterSwitch,
    }));
    Actions.tabbar1();
  }

  muteNotificationButton = () => {
    this.setState(prevState => ({
      muteNotification: !prevState.muteNotification
    }));
  }

  render(){

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

    const UserProfileComponent = (props) => {
      const { awsUserImgURL, userEmail, userMobile, userName, userPassword, userAddress } =  props.UserProfileData;
      const UserImgUrl = awsUserImgURL ? {uri : awsUserImgURL} : require('../images/dummy-logo.png')
      return(
        <ScrollView style={styles.UserProfileContainer}>
          <View style={{backgroundColor: headerBackgroundColor, alignItems: 'center', justifyContent: 'center', paddingTop: 10, paddingBottom: 10 }}>
            <View style={styles.profileImage}>
              <Image style={styles.logo} source={UserImgUrl} />
            </View>
            <Text style={{ color: 'white' }}>{userName}</Text>
            <Text style={{ color: 'white' }}>{userAddress}</Text>
          </View>
          <View style={{ flex: 1, flexDirection: 'row', marginTop: 20, marginLeft: 20 }}>
            <Icon name="home" color="#00ACE8" size={25} />
            <Text style={{ fontWeight: 'bold', marginLeft: 10, fontSize:18 }}>App Usage Settings</Text>
          </View>
          <View style={{ flexDirection: 'row', paddingTop: 10 }}>
            <Text style={{ flex: 3,  marginLeft: 20, fontSize: 18 }}>Switch to Renter Profile</Text>
            {
              this.state.renterSwitch ? 
              <Icon.Button size={30} color="#00ACE8" name="toggle-on" backgroundColor="transparent" onPress={() => this.ownerSwitchButton()}/>
                : <Icon.Button size={30} color="#00ACE8" name="toggle-off" backgroundColor="transparent" onPress={() => this.ownerSwitchButton()}/>
            }
          </View>
          <View style={{ margin : 20, marginBottom: 0, marginBottom: 10 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20, }}>
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <Image style={{ width:25, height:25 }} source={require('../images/blueunlock.png')}/>
                <Text style={{ fontWeight: 'bold', marginLeft: 10, fontSize:18 }}>Privacy Settings</Text>
              </View>
              <Icon.Button style={{ flex: 1, marginLeft: 10 }} name="pencil" color="black" size={20} backgroundColor="transparent" onPress={() => Actions.push('editProfile', { data : props.UserProfileData } )}/>
            </View>
            <View style={{ flexDirection: 'row', marginBottom:  15 }}>
              <Text style={{ flex: 3, fontWeight: 'bold' }}>Password</Text>
                <Icon.Button name="pencil" color="white" backgroundColor="green" style={{ marginLeft: 5, paddingBottom: 5, flex: 1 }} onPress={() => Actions.signup(userPassword)}>
                  Change Passsword
                </Icon.Button>
            </View>
            <View style={{ height: .5, width: "100%", backgroundColor: "gray", marginBottom: 20 }} />
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ flex: 3, fontWeight: 'bold' }}>Email Address</Text>
              <Text style={{ color: '#00aff0' }}>{userEmail} </Text>
            </View>
            <View style={{ height: .5, width: "100%", backgroundColor: "gray", marginTop: 10, marginBottom: 20 }} />
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ flex: 3, fontWeight: 'bold' }}>Phone Number</Text>
              <Text style={{ color: '#00aff0' }}>{userMobile}</Text>
            </View>
            <View style={{ height: .5, width: "100%", backgroundColor: "gray", marginTop: 10, marginBottom: 10 }} />
            <View style={{ flex: 1, flexDirection: 'row', marginTop: 10 }}>
              <Icon name="home" color="#00ACE8" size={25} />
              <Text style={{ fontWeight: 'bold', marginLeft: 10, fontSize:18 }}>Notification Settings</Text>
            </View>
            <View style={{ flexDirection: 'row', paddingTop: 10 }}>
              <Text style={{ flex: 3, fontSize: 18 }}>Mute Notification</Text>
              {
                this.state.muteNotification ? 
                <Icon.Button size={30} color="#00ACE8" name="toggle-on" backgroundColor="transparent" onPress={() => this.muteNotificationButton()}/>
                  : <Icon.Button size={30} color="#00ACE8" name="toggle-off" backgroundColor="transparent" onPress={() => this.muteNotificationButton()}/>
              }
            </View>
          </View>
        </ScrollView>
      );
    }

    if(this.state.isLoading) {
      return(
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <LoadingComponent />
        </View>
      )
    }

    return(
      <View style={styles.outerContainer}>
        <Header
          outerContainerStyles={{height: 55 }}
          backgroundColor={headerBackgroundColor}
          placement="left"
          leftComponent={<LeftComponent />}
          centerComponent={{ text: 'PROFILE PAGE', style: { color: '#fff', fontWeight: 'bold', fontSize:20 } }}
          rightComponent={<RightComponent/>}
        />
        <ScrollView
          automaticallyAdjustContentInsets={false}
          scrollEventThrottle={200}
          style={styles.innerContainer}
        >
          <UserProfileComponent UserProfileData={UserProfileData}/>
        </ScrollView>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  outerContainer : {
    flex: 1
  },
  innerContainer: {
    flex: 1,
  },
  UserProfileContainer: {
    flex: 1,
    paddingBottom: 10
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
});