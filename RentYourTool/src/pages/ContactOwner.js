import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  ToolbarAndroid,
  Text,
  TextInput,
  View,
  AsyncStorage,
  TouchableOpacity,
  NetInfo,
  Dimensions,
} from 'react-native';
import config from '../common/config';
import { Header } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Actions} from 'react-native-router-flux';
import { headerBackgroundColor, buttonBackgroundColor } from '../styles';
var { height, width } = Dimensions.get('window');
import moment from 'moment';

export default class ContactOwnerScreen extends Component {
  constructor(props){
      super(props)
      this.state = {
        text : '',
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
  submitingMessage = (data, token) => {
    NetInfo.isConnected.fetch().then(isConnected => {
        const { userId, userName, toolId } = data;
        var dateTime = new Date();
        dateTime = moment(dateTime).format("YYYY-MM-DD hh:mm:ss");
        if(isConnected) {
          this.setState({
            IsLoaderVisible: true
          })
          var URL= config.BASE_URL+'ToolsConfiguration/InsertMessages?token='+this.state.token+'&UserID='+this.state.userId+'&OwnerID='+userId+'&MessageType=new&Message='+this.state.text+'&WriterID='+this.state.userId+'&ReceiverID='+userId+'&MessageID=0&ToolID='+toolId+'&CreatedDate='+dateTime+'&CreatedBy=sys';
          console.log(URL, 'URL')
          fetch(URL,  {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
          }).then((response) => response.status).then((responseJson) => {
              this.setState({
                IsLoaderVisible: false
              })
              Actions.Dashboard();
              }).catch((error) => {
             
            });
          } else {
            Alert.alert('Network not available');
          }
      });
  }
  render(){
    const LeftComponent = () => {
      return(
        <Icon.Button size={18} name="chevron-left" backgroundColor="transparent" onPress={() => Actions.pop()}/>
      )
    }

    const RightComponent = () => {
      return(
        <View style={{ flexDirection: 'row' }}>
          <Icon.Button size={18} name="ellipsis-v" backgroundColor="transparent" />    
        </View>
      )
    }
    const data = this.props.data;
    const token = this.props.token;

    return(
      <View style={styles.outerContainer}>
        <Header
          outerContainerStyles={{height: 55 }}
          backgroundColor={headerBackgroundColor}
          placement="left"
          leftComponent={<LeftComponent />}
          centerComponent={{ text: 'Message', style: { color: '#fff', fontWeight: 'bold', fontSize:20, marginBottom: 3 } }}
          rightComponent={<RightComponent/>}
        />
        <View styles={styles.innerContainer}>
          <View style={{ backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', paddingTop: 15, }}>
          <View style={styles.sectionStyle}>
              <TextInput
                underlineColorAndroid="transparent"  
                selectionColor="#000"
                multiline = {true}
                placeholder="Enter your text Message"
                onChangeText={(text) => this.setState({text})}                
              />
            </View>
          <View style={{ flexDirection: 'row', marginLeft: 20, marginTop: 20, marginBottom: 10 }}>
            <TouchableOpacity style={{ flex: 1, marginRight: 10, padding: 15, backgroundColor: buttonBackgroundColor }} onPress= { () => this.submitingMessage(data, token)}>
              <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}> SUBMIT </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ flex: 1, marginRight: 20, padding: 15, backgroundColor: '#d3d3d3'}} onPress={ () => Actions.pop()}>
              <Text style={{ color: buttonBackgroundColor, fontWeight: 'bold', textAlign: 'center' }}> CANCEL </Text>
            </TouchableOpacity>
          </View>
          </View>
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
    paddingTop: 15
  },
  footerContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'white',
  },
  textInputStyleClass:{
    width: width - 50,
    height: 150,
    borderWidth: 1,
    borderColor: '#d3d3d3',
    backgroundColor : "#FFFFFF", 
  },
  sectionStyle: {
    width: 300,    
    height: 140,   
    borderColor: '#000000',
    borderWidth: 0.5,
    margin: 3
  },
});