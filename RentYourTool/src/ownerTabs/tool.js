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

export default class ToolScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      IsLoaderVisible : true,
      noData: false,
    };
    AsyncStorage.getItem("token").then((value) => {
      this.setState({
        token : JSON.parse(value)
      })
    });
    AsyncStorage.getItem("userId").then((value) => {
      this.setState({
        userId : value
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
          var URL=config.BASE_URL+'ToolsConfiguration/GetOwnerTool?token='+this.state.token+'&OwnerID='+this.state.userId;
          console.log(URL, 'TOOL URL')
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
  
  cancelTools = (toolId) => {
    NetInfo.isConnected.fetch().then(isConnected => {
      this.setState({
        noData: false
      })
        if(isConnected) {
          var URL=config.BASE_URL+'ToolsConfiguration/DeleteOwnerTool?token='+this.state.token+'&ToolId='+toolId;
          console.log(URL, 'REMOVE URL')
          fetch(URL, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
          }).then((response) => response.json())
            .then((responseJson) => {
              console.log(responseJson)
              if(responseJson.success){
                this.setState({
                  IsLoaderVisible: false,
                })
                Alert.alert('Your Tool Item Has been Deleted');
                Actions.ownerMessage();
              }else{
                Alert.alert(responseJson.message);
                Actions.ownerMessage();
                this.setState({
                  IsLoaderVisible: false,
                  noData: false
                })
              }
        })
        .catch((error) => {
          this.setState({
            IsLoaderVisible: false,
            noData: true
          })
        });
      } else {
        this.setState({
          IsLoaderVisible: false,
          noData: true
        })
        Alert.alert('Network not available');
      }
    })
  }

  getToolReviewList = (toolId) => {
    NetInfo.isConnected.fetch().then(isConnected => {
        if(isConnected) {
          this.setState({
            IsLoaderVisible: true
          })
          var URL=config.BASE_URL+'ToolsConfiguration/GetOwnerToolsReviewsList?token='+this.state.token+'&ToolId='+toolId;
          fetch(URL, {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
          }).then((response) => response.json()).then((responseJson) => {
            console.log(responseJson, 'JSON')
            if(!responseJson.success) {
              var message = responseJson.message;
              this.setState({
                IsLoaderVisible: false,
                noData: false,
              })
              Alert.alert(message);
            } else {
              this.setState({
                IsLoaderVisible: false,
                noData: false,
              });
              const data = responseJson.data
              Alert.alert(data.map((item) => item));
            }
        })
        .catch((error) => {
          this.setState({
            IsLoaderVisible: false,
            noData: false
          })
          Alert.alert('Server Response not correctly');
        });
      }
      else {
        this.setState({
          IsLoaderVisible: false,
          noData: false
        })
        Alert.alert('Network not available');
      }
    })
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

    const OwnerToolListComponent = (props) => {
      const { toolName, toolMake, toolModel, toolOwnerImgData, toolUseRule, toolRating, toolRentCurrencyValue, toolImgUrl, userId, toolId, toolReview, dalyRate } = props.rowData;
      console.log(props.rowData, 'ROWDATA')
      var ImgUrl = '';
      if(toolOwnerImgData.length > 1 || toolOwnerImgData.length === 1){
        ImgUrl = toolOwnerImgData[0].awsPreSignedURL === ''  ? require('../images/dummyImage.png') : {uri : toolOwnerImgData[0].awsPreSignedURL };
      } else {
        ImgUrl = require('../images/dummyImage.png');
      }
      const noOfReviews = toolReview.length;
   
      return(
        <TouchableOpacity onPress={() => Actions.push('ownerToolDetails', { data : props.rowData } )} style={{ flexDirection: 'row', marginLeft: 10 }}>
          <View style={{ margin: 5 }}>
            <Image style={{ height:width*0.32, width:width*0.32 }} source={ImgUrl} />
            <View style={{ flexDirection: 'row', marginTop: 5 }}>
              <Text style={{ fontWeight: 'bold', marginRight: 5 }}>{toolRating} </Text>
              <Rating
                readonly
                type="star"
                fractions={1}
                startingValue={toolRating}
                imageSize={20}
                onFinishRating={this.ratingCompleted}
              />
            </View>
            <TouchableOpacity onPress={() => alert(toolReview.map((item => item   )))}>
              <Text style={{ marginRight: 5, color: headerBackgroundColor }}>{noOfReviews} reviews</Text>
            </TouchableOpacity>           
          </View>
          <View style={{ flexDirection: 'column', margin: 10 }}>
            <Text style={{ marginBottom: 5 }}>{toolName}-{toolMake} {toolModel}</Text>
            <Text style={{ color: headerBackgroundColor, marginBottom: 15 }}>${dalyRate}/day</Text>
           
          
            <View style={{ flexDirection: 'row', marginTop: 5 }}>
              <TouchableOpacity style={{ borderColor: 'black', borderWidth: 1, borderRadius: 15, marginRight: 30 }}>
                <Icon.Button name="pencil" color="black" backgroundColor="transparent" onPress={() => Actions.push('Thingsyourneed', { data : props.rowData } )} >
                  Edit
                </Icon.Button>
              </TouchableOpacity>
              <TouchableOpacity style={{ borderColor: 'black', borderWidth: 1, borderRadius: 15 }}>
                <Icon.Button name="trash" color="black" backgroundColor="transparent" onPress={() => this.cancelTools(toolId)} >
                  Remove
                </Icon.Button>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      ); 
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
          leftComponent={<LeftComponent/>}
          centerComponent={{ text: 'TOOLS', style: { color: '#fff', fontWeight: 'bold', fontSize:20 } }}
          rightComponent={<RightComponent/>}
        />
        <View style={{ backgroundColor: 'white', flex: 1 }}>
          <Text style={{ textAlign: 'center', marginBottom: 15, marginTop: 15, fontWeight: 'bold', fontSize: 18 }}>LISTED TOOLS</Text>
          <View style={{ height: .5, width: "100%", backgroundColor: "#000", marginBottom: 5 }} />
          <ScrollView
            automaticallyAdjustContentInsets={false}
            scrollEventThrottle={200}
            style={{ backgroundColor: 'white', marginBottom: 10 }}
          >
              {
                this.state.noData ? <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <NoDataFoundComponent  screenName="Tool"/>
                </View> : <ListView
                  dataSource={this.state.dataSource}
                  renderSeparator= {this.ListViewItemSeparator}
                  renderRow={(rowData) => <OwnerToolListComponent rowData={rowData} />}
                  enableEmptySections={true}
                />
              }
          </ScrollView>
          <ActionButton buttonColor= {headerBackgroundColor}>
            <ActionButton.Item
              buttonColor="#98fb98"
              title="Showcase Your Tool"
              onPress={() => Actions.mainScreen()}
            >
              <Image style={{width:38, height:30, marginTop:5}} source={require('../images/ownerToolIn.png')}/>
            </ActionButton.Item>
          </ActionButton>
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
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});