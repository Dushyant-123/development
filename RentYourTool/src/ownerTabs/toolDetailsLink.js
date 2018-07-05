import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  ToolbarAndroid,
  Text,
  View,
  AsyncStorage,
  NetInfo,
  ScrollView,
  ListView,
  Image,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import { Header, Rating } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Actions} from 'react-native-router-flux';
var { height, width } = Dimensions.get('window');
import config from '../common/config';
import LoadingComponent from '../components/LoadingComponent';
import NoDataFoundComponent from '../components/noData';
import { headerBackgroundColor } from '../styles';
import ActionButton from 'react-native-action-button';
import OwnerToolListComponent from './toolDetails';

export default class ToolScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      IsLoaderVisible : true,
      noData: false,
      toolId : props.toolId,
      userId : props.userId,
    };
    AsyncStorage.getItem("token").then((value) => {
      this.setState({
        token : JSON.parse(value)
      })
      this.getOwnerToolList();
    });
  }

  getOwnerToolList () {
    NetInfo.isConnected.fetch().then(isConnected =>
      {
        if(isConnected) {
          this.setState({
            IsLoaderVisible: true
          })
          var URL=config.BASE_URL+'ToolsConfiguration/GetOwnerToolByToolID?token='+this.state.token+'&OwnerID='+this.state.userId+'&ToolID='+this.state.toolId;
          fetch(URL, {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
          }).then((response) => response.json()).then((responseJson) => {
            console.log(responseJson, 'JSON')
            if(!responseJson.success) {
              this.setState({
                IsLoaderVisible: false,
                noData: true
              })
            } else {
              var data = responseJson.message;
              let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
              this.setState({
                IsLoaderVisible: false,
                dataSource: ds.cloneWithRows(responseJson.data),
              });
            }
        })
        .catch((error) => {
          this.setState({
            IsLoaderVisible: false,
            noData: true
          })
          Alert.alert('Server Response not correctly');
        });
      }
      else {
        this.setState({
          IsLoaderVisible: false,
          noData: true
        })
        Alert.alert('Network not available');
      }
    })
  }

  ListViewItemSeparator = () => {
    return (
      <View style={{ height: .5, width: "100%", backgroundColor: "#000" }} />
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

    if(this.state.IsLoaderVisible) {
      return(
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <LoadingComponent />
        </View>
      )
    }
    return(
      <View style={styles.outerContainer}>
        <ListView
            dataSource={this.state.dataSource}
            renderSeparator= {this.ListViewItemSeparator}
            renderRow={(rowData) => <OwnerToolListComponent data={rowData} />}
            enableEmptySections={true}
        />
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
  footerContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'white',
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});