import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  ScrollView,
  ToolbarAndroid,
  TouchableOpacity,
  Text,
  View,
  Image,
  Dimensions,
  TextInput,
  AsyncStorage,
  NetInfo,
  Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Header } from 'react-native-elements';
import {Actions} from 'react-native-router-flux';
const { height, width } = Dimensions.get('window');
import { headerBackgroundColor } from '../styles';
import moment from 'moment';
import config from '../common/config';

export default class ShowMessageDetails extends Component {

  constructor(props) {
    super(props);
    this.state = {
      message: '',
      messageLine: '',
      serverMessage: ''
    }

    AsyncStorage.getItem("userId").then((value) => {
      this.setState({
        userId : value
      })
    });
    AsyncStorage.getItem("token").then((value) => {
      this.setState({
        token : JSON.parse(value)
      })
    });
  }

  sendMessage = (toolId, mId, ReceiverID) => {
    NetInfo.isConnected.fetch().then(isConnected => {
      const userName = this.props.data.receiverData[0].userName;
      var dateTime = new Date();
      dateTime = moment(dateTime).format("YYYY-MM-DD HH:MM:ss");
      this.setState({
        serverMessage: this.state.message,
        messageLine: [ ...this.state.messageLine, this.state.message],
        message: ''
      })
      if(this.state.serverMessage !== ''){
        console.log('hello')
        if(isConnected) {
          var URL= config.BASE_URL+'ToolsConfiguration/InsertMessages?token='+this.state.token+'&UserID='+this.state.userId+'&OwnerID='+ReceiverID+'&MessageType=new&Message='+this.state.serverMessage+'&WriterID='+this.state.userId+'&ReceiverID='+ReceiverID+'&MessageID='+mId+'&ToolID='+toolId+'&CreatedDate='+dateTime+'&CreatedBy=sys';
          fetch(URL,  {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
          }).then((response) => response.status).then((responseJson) => {
              console.log(responseJson, 'Response')
              
              }).catch((error) => {
      
            });
          } else {
            Alert.alert('Network not available');
          }
      } else {
        Alert.alert('Write Some Message');
      }
    });
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

    const FullMessageList = (props) => {
      const { messageText, mid, receiverID, createDate, writerID } = props.data;
      const ReceiverID = props.ReceiverID; 
      console.log(createDate, 'Data handler')
      const date = moment(createDate).format('MM-DD-YYYY');
      const time = moment(createDate).format('hh:mm A');

      const lastDate = Date.parse(date);
      const Today = Date.parse(moment(new Date()).format('MM-DD-YYYY'));

      var TodayMessage = '';
      if(lastDate === Today ) {
        dateText = 'TODAY';
      }else{
        dateText = date;
      }

      return(
        <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
          <View style={{ marginBottom : 20 }}>
            <Text style={{ textAlign : 'center', color: 'bold', marginBottom: 10 }}>{dateText}</Text>
              {
                receiverID === ReceiverID ? 
                <View style={{ margin : 5, marginRight: 50, padding: 5, borderRadius: 25, backgroundColor: '#d3d3d3' }}>
                  <Text style={{ textAlign: 'left', marginLeft: 10 }}>{messageText}</Text>
                  <Text style={{ textAlign: 'left', marginLeft: 10, color: headerBackgroundColor }}>{time}</Text>                     
                </View> :
                <View style={{ margin : 5, marginLeft: 50, padding: 5, borderRadius: 25, backgroundColor: '#d3d3d3' }}>
                  <Text style={{ textAlign: 'right', marginRight: 10 }}>{messageText}</Text>
                  <Text style={{ textAlign: 'right', marginRight: 10,  color: headerBackgroundColor }}>{time}</Text>                        
                </View>
              }
          </View>
        </ScrollView>
      )
    }

    const { messList, receiverData, writerData } = this.props.data;
    
    const toolId = messList[0].toolId;
    const mId = messList[0].mid;
    const ReceiverID = messList[0].receiverID;

    const shortMessageText = messList[0].messageText;
    const senderName = receiverData[0].userName;
    const mobileNumber = receiverData[0].userMobile;
    const SenderImgUrl = receiverData[0].awsUserImgURL === '' ?  require('../images/dummy-logo.png') : {uri : receiverData[0].awsUserImgURL};

    const todayTime = moment(new Date()).format("HH:mm");
  
    return(
      <View style={styles.outerContainer}>
        <Header
          outerContainerStyles={{ height: 55 }}
          backgroundColor={ headerBackgroundColor }
          placement="left"
          leftComponent={<LeftComponent />}
          centerComponent={{ text: 'MESSAGE DETAILS', style: { color: '#fff', fontWeight: 'bold', fontSize:20 } }}
          rightComponent={<RightComponent/>}
        />
        <View styles={styles.innerContainer}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 15 }}>
                <Image style={styles.logo} source={SenderImgUrl} />
                <View style={{ flex: 4 }}>
                  <Text style={{ marginLeft: 5}}>{senderName}</Text>
                </View>
            </View>
            <View style={{ height: .5, width: "100%", backgroundColor: "white", marginTop: 10, marginBottom: 10 }} />
            <ScrollView style={{  }}>
              {
                messList.map((item) => <FullMessageList data={item} ReceiverID={ReceiverID}/>)
              }
            </ScrollView>
            <ScrollView style={{ backgroundColor: 'white' }}>
              {
                this.state.messageLine.length >=1 && this.state.messageLine.map((item) => {
                  return(
                    <View style={{ margin : 5, marginLeft: 50, padding: 5, borderRadius: 25, backgroundColor: '#d3d3d3' }}>
                      <Text style={{ textAlign: 'right', marginRight: 10 }}>{item}</Text>
                      <Text style={{ textAlign: 'right', marginRight: 10,  color: headerBackgroundColor }}>{todayTime}</Text>                        
                    </View>
                  )
                })
              }
            </ScrollView>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: headerBackgroundColor, position: 'absolute', bottom: 0 }}>
          <TextInput 
            style={styles.searchBox}
            onChangeText={(message) => this.setState({message})}
            value={this.state.message}
            underlineColorAndroid='transparent'
            placeholder="type here"
          />
          <TouchableOpacity onPress={ () => this.sendMessage(toolId, mId, ReceiverID)} style={{ flex: 1 }}><Text style={{ color: 'black', }}>Send</Text></TouchableOpacity>
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
    flex: 1,
    marginBottom: 20,
    backgroundColor: 'white'
  },
  footerContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'white',
  },
  logo:{
    height:width*0.18,
    width:width*0.18,
    overflow:'hidden',
    alignSelf:'center',
    borderRadius : 50,
  },
  searchBox:{    
    height: 40,
    borderColor: '#009688',
    borderRadius: 15,
    backgroundColor : "#FFFFFF",
    margin: 10,
    flex: 4
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#6E5BAA'
    },
    textContainer: {
    flex: 1,
    justifyContent: 'center'
    },
    sendContainer: {
    justifyContent: 'flex-end',
    paddingRight: 10
    },
    input: {
      width: width - 70,
      color: '#555555',
      paddingRight: 10,
      paddingLeft: 10,
      paddingTop: 5,
      height: 32,
      borderColor: '#6E5BAA',
      borderWidth: 1,
      borderRadius: 2,
      alignSelf: 'center',
      backgroundColor: '#ffffff'
      },
});