import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  ToolbarAndroid,
  Text,
  View,
  NetInfo,
  AsyncStorage, 
  ScrollView,
  ListView
} from 'react-native';
import { Header } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Actions} from 'react-native-router-flux';
import { headerBackgroundColor } from '../styles';

export default class ToolReviewScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
          IsLoaderVisible : true,
          noData: false,
          toolId : props.toolId
        };
        AsyncStorage.getItem("token").then((value) => {
          this.setState({
            token : JSON.parse(value)
          })
          this.getToolReviewList();
        });
      }


      getToolReviewList () {
        NetInfo.isConnected.fetch().then(isConnected => {
            if(isConnected) {
              this.setState({
                IsLoaderVisible: true
              })
              var URL=config.BASE_URL+'ToolsConfiguration/GetOwnerToolsReviewsList?token='+this.state.token+'&ToolId='+this.state.toolId;
              fetch(URL, {
                method: 'GET',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                },
              }).then((response) => response.json()).then((responseJson) => {
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

  render(){
    const LeftComponent = () => {
      return(
        <Icon.Button size={18} name="chevron-left" backgroundColor="transparent" onPress={() => Actions.pop()}/>
      )
    }

    const RightComponent = () => {
      return(
        <View />   
      )
    }
    const ToolReviewListComponent = (props) => {
        return(
            <View>
                <Text>Hello</Text>
            </View>
        )
    }
    return(
      <View style={styles.outerContainer}>
        <Header
          backgroundColor={headerBackgroundColor}
          placement="left"
          leftComponent={<LeftComponent />}
          centerComponent={{ text: 'TOOL  CALENDAR', style: { color: '#fff', fontWeight: 'bold', fontSize:20, marginBottom: 3 } }}
          rightComponent={<RightComponent/>}
        />
        <View styles={styles.innerContainer}>
            <ScrollView
                automaticallyAdjustContentInsets={false}
                scrollEventThrottle={200}
                style={{ backgroundColor: 'white', marginBottom: 10 }}
            >
                {
                    this.state.noData ? <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <NoDataFoundComponent  screenName="Tool Review"/>
                    </View> : <ListView
                    dataSource={this.state.dataSource}
                    renderSeparator= {this.ListViewItemSeparator}
                    renderRow={(rowData) => <ToolReviewListComponent rowData={rowData} />}
                    enableEmptySections={true}
                    />
                }
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
    alignItems: 'center',
    justifyContent: 'center'
  },
  footerContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'white',
  }
});