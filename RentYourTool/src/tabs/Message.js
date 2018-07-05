import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  ListView,
  ToolbarAndroid,
  Text,
  Image,
  View,
  ScrollView,
  NetInfo,
  AsyncStorage,
  Dimensions,
  TouchableHighlight,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import { Header } from 'react-native-elements';
import {Actions} from 'react-native-router-flux';
import config from '../common/config';
const {height, width} = Dimensions.get('window');
import { headerBackgroundColor } from '../styles';
import LoadingComponent from '../components/LoadingComponent';
import NoDataFoundComponent from '../components/noData';

export default class MessageScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      IsLoaderVisible : true,
      userId: '',
      noData: false,
    };
    AsyncStorage.getItem("userId").then((value) => {
      this.setState({
        userId : value
      })
    });
    AsyncStorage.getItem("token").then((value) => {
      this.setState({
        token : JSON.parse(value)
      })
      this.getAllMessagesList();
    });
  }

  getAllMessagesList(){    
    NetInfo.isConnected.fetch().then(isConnected => {
      const { userId, token }  = this.state;
      if(isConnected) {
        this.setState({
          IsLoaderVisible: true
        })
        var URL=config.BASE_URL+'ToolsConfiguration/GetAllMessageByUserid?token='+token+'&userID='+this.state.userId+'&UserType= ';
        fetch(URL, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        }).then((response) => response.json()).then((responseJson) => {
          console.log(responseJson, 'Response message')
          if(!responseJson.success) {
            this.setState({
              IsLoaderVisible: false,
              noData: true,
            })
          } else {
            let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
            this.setState({
              IsLoaderVisible: false,
              dataSource: ds.cloneWithRows(responseJson.data),
            })
          }
          }).catch((error) => {
            this.setState({
              IsLoaderVisible: false,
              noData: true,
            })
              console.error(error);
          });
        } else {
          this.setState({
            IsLoaderVisible: false,
            noData: true,
          })
        Alert.alert('Network not available');
      }
    });
  }

  ListViewItemSeparator = () => {
    return (
      <View style={{ height: .5, width: "100%", backgroundColor: "black" }} />
    );
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

    const MessagesListComponent = (props) => {  
      const { messList, receiverData, writerData } = props.rowData;
      var messLength = messList.length;

      const shortMessageText = messList[messLength-1].messageText;
      const senderName = receiverData[0].userName;
      const senderImgUrl = receiverData[0].awsUserImgURL === '' ?  require('../images/dummy-logo.png') : {uri : receiverData[0].awsUserImgURL} ;

      const messListArrayLength = messList.length;
      const lastMessageDate = moment(messList[messListArrayLength-1].createDate).format('MM-DD-YYYY');
      const lastMessageTime = moment(messList[messListArrayLength-1].createDate).format('hh:mm A');

      const lastDate = Date.parse(lastMessageDate);
      const Today = Date.parse(moment(new Date()).format('MM-DD-YYYY'));

      var DateTimeText = '';
      console.log(lastDate, Today)
      if(lastDate === Today ) {
        DateTimeText = lastMessageTime;
      }else{
        DateTimeText = lastMessageDate;
      }

      return(
        <TouchableHighlight onPress={() => Actions.push('showMessageDetails', { data : props.rowData } )}>
          <View style={{ flexDirection: 'row', margin: 10 }}>
            <View style={styles.profileImage}>
              <Image style={styles.logo} source={senderImgUrl} />
            </View>
            <View style={{ flex: 3, marginLeft: 10 }}>
              <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                <Text style={{  }}>{senderName}    |     Upcoming</Text>
                <Text style={{ color: headerBackgroundColor }}>{DateTimeText}</Text>
              </View>
              <Text>{shortMessageText}</Text>
            </View>
          </View>
        </TouchableHighlight>
      )
    }

    if(this.state.IsLoaderVisible) {
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
          centerComponent={{ text: 'MESSAGES', style: { color: '#fff', fontWeight: 'bold', fontSize:20 } }}
          rightComponent={<RightComponent/>}
        />
        <View style={{ flex: 1 }}>
          {
            this.state.noData ? <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <NoDataFoundComponent screenName="Message"/>
            </View> :  <View styles={styles.innerContainer}>
              <Text style={{ fontSize: 20, marginTop: 10, marginBottom: 10, fontWeight: 'bold', textAlign: 'center'}}>INBOX</Text>
              <View style={{ height: .5, width: "100%", backgroundColor: "#000" }} />
              <ScrollView>
                <ListView
                    dataSource={this.state.dataSource}
                    renderSeparator= {this.ListViewItemSeparator}
                    renderRow={(rowData) => <MessagesListComponent rowData={rowData} />}
                    enableEmptySections={true}
                    style={{marginTop: 10, marginBottom: 100}}
                  /> 
                </ScrollView>
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
    flex: 1,
  },
  contentContainer: {
    
  },
  footerContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'white',
  },
  profileImage:{
    flex: 1,
    backgroundColor:'#f8f8f8',
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