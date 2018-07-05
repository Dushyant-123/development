import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  ToolbarAndroid,
  Text,
  TextInput,
  View,
  ScrollView,
  StatusBar,
  AsyncStorage,
  ListView,
  NetInfo,
  ActivityIndicator,  
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import config from '../common/config';
import { Header } from 'react-native-elements';
import SearchHeader from 'react-native-search-header';
import Icon from 'react-native-vector-icons/FontAwesome';
import ListViewComponent from '../components/ListViewComponent';
import LoadingComponent from '../components/LoadingComponent';
import NoDataFoundComponent from '../components/noData';
import {headerBackgroundColor} from '../styles';

export default class SearchScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      text: '',
      noData: false,
    }
    this.arrayholder = [] ;
    AsyncStorage.getItem("userId").then((value) => {
      this.setState({
        userId : value
      })
    });
    AsyncStorage.getItem("token").then((value) => {
      this.setState({
        token : JSON.parse(value)
      })
      this.getToolList();
    });
  }

  getToolList() {
    NetInfo.isConnected.fetch().then(isConnected => {
      if(isConnected) {
        this.setState({
          isLoading: true
        })
        var URL=config.BASE_URL+'ToolsConfiguration/GetToolList?token='+this.state.token+'&RentelID='+this.state.userId;
          fetch(URL, {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
          }).then((response) => response.json()).then((responseJson) => {
            if(!responseJson.success) {
              this.setState({
                isLoading: false,
                noData: true
              })
            } else {
              let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
              this.setState({
                isLoading: false,
                dataSource: ds.cloneWithRows(responseJson.data),
              }, function() {
                this.arrayholder = responseJson.data ;
              });
            }
      }).catch((error) => {
        this.setState({
          isLoading: false,
          noData: true
        })
       
      });
    } else {
      this.setState({
        isLoading: false,
        noData: true
      })  
      Alert.alert('Network not available');
    }}
  )
}

  SearchFilterFunction(text){
    const newData = this.arrayholder.filter(function(item){
       const itemData = item.toolName.toUpperCase();
       const textData = text.toUpperCase();
       return itemData.indexOf(textData) > -1;
    })
    this.setState({
       dataSource: this.state.dataSource.cloneWithRows(newData),
       text: text
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
    const searchLine = <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 20, marginRight: 20 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Featured Results</Text>
        <Text style={{ color: '#008b8b' }}>115 {this.state.text} </Text>
      </View>
    const Length = this.state.dataSource && this.state.dataSource._cachedRowCount;

    if(this.state.isLoading){
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
          centerComponent={{ text: 'SEARCH', style: { color: '#fff', fontWeight: 'bold', fontSize:20 } }}
          rightComponent={<RightComponent/>}
        />
        <View styles={styles.innerContainer}>
          <View style={{ backgroundColor: headerBackgroundColor, paddingBottom: 15 }}>
            <TextInput 
              style={styles.searchBox}
              onChangeText={(text) => this.SearchFilterFunction(text)}
              value={this.state.text}
              underlineColorAndroid='transparent'
              placeholder="Search Here"
            />
          </View>
          <View style={{ height: .5, width: "100%", backgroundColor: "red", marginBottom: 5 }} />
          <ScrollView contentContainerStyle={styles.contentContainer}>
            <View style={{ marginBottom : 140 }}>
            {
              this.state.noData ? <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <NoDataFoundComponent screenName="Search" />
            </View> : <ListView
                  dataSource={this.state.dataSource}
                  renderSeparator= {this.ListViewItemSeparator}
                  renderRow={(rowData) => <ListViewComponent token={this.state.token} rowData={rowData} startTime="2018-06-12T18:05:56.662Z" endTime="2018-06-18T18:05:56.662Z" duration="6" zipCode="201014"/>}
                  enableEmptySections={true}
                  style={{marginTop: 10}}
                />
            }
            </View>
          </ScrollView>
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
  footerContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'white',
  },
  searchBox:{    
    textAlign: 'left',
    height: 40,
    borderColor: '#009688',
    borderRadius: 15,
    backgroundColor : "#FFFFFF",
    margin: 10
  },
  contentContainer: {
  
  },
});