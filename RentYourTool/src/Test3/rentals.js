import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  ToolbarAndroid,
  Text,
  View,
  Image,
  NetInfo,
  AsyncStorage,
  ListView,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  TouchableHighlight,
} from 'react-native';
import LoadingComponent from '../components/LoadingComponent';
const {height, width} = Dimensions.get('window');
import config from '../common/config';
import { Header, Rating } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import NoDataFoundComponent from '../components/noData';
import {headerBackgroundColor} from '../styles';

export default class ExcursionsScreen extends Component {
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
      this.getUpcomingReservationToolList();
    });
  }

  getUpcomingReservationToolList () {
    NetInfo.isConnected.fetch().then(isConnected =>
      {
        if(isConnected) {
          this.setState({
            IsLoaderVisible: true
          })
          var URL=config.BASE_URL+'ToolsConfiguration/GetBookedToolList?token='+this.state.token+'&userID='+this.state.userId;
          fetch(URL,
          {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
          }).then((response) => response.json()).then((responseJson) => {
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

  cancelTools = (userId, toolId) => {
    NetInfo.isConnected.fetch().then(isConnected => {
      if(isConnected) {
        this.setState({
          IsLoaderVisible: true,
          noData: false,
        })
        var URL=config.BASE_URL+'ToolsConfiguration/toolBookCancel?token='+this.state.token;
        console.log(URL, toolId, userId, 'New Data')
        fetch(URL, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            toolID: toolId,
            userID: this.state.userId,
          })
        }).then((response) => response.json()).then((responseJson) => {
          if(!responseJson.success) {
            this.setState({
              IsLoaderVisible: false,
              noData: true,
            })
          } else {
            let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
            console.log(responseJson, 'Response New Data')
            this.setState({IsLoaderVisible: false})
            this.props.navigation.navigate('Rentals');
          }
          }).catch((error) => {
            this.setState({
              IsLoaderVisible: false,
              noData: true
            })
            ToastAndroid.show('Your Tool Not be Cancel !', ToastAndroid.SHORT);
          });
          this.setState({
            IsLoaderVisible: false,
            noData: true
          }) 
        }
        else {
          this.setState({
            IsLoaderVisible: false,
            noData: true
          })
          Alert.alert('Network not available');
        }
      });
  }

  ListViewItemSeparator = () => {
    return (
      <View style={{ height: .5, marginBottom: 5, width: "100%", backgroundColor: "#000" }} />
    );
  }

  ratingCompleted(rating) {
    console.log("Rating is: " + rating)
  }

  render(){
    const LeftComponent = () => {
      return(
        <Icon.Button size={18} name="chevron-left" backgroundColor="transparent" onPress={() => this.props.navigation.goBack()}/>
      )
    }

    const RightComponent = () => {
      return(
        <View style={{ flexDirection: 'row' }}>
          <Icon.Button size={18} name="ellipsis-v" backgroundColor="transparent" />    
        </View>
      )
    }

    const UpcomingToolListComponent = (props) => {
      const { toolName, toolRating, toolRentCurrencyValue, toolImgUrl, toolMake, toolModel, userId, toolId } = props.rowData;
      const ImgUrl = toolImgUrl[0]  === undefined  ? require('../images/dummyImage.png') : {uri :toolImgUrl[0] };
      return(
        <TouchableOpacity>
          <View style={{ flexDirection: 'row', marginLeft: 20 }}>
            <View style={{ margin: 5 }}>
              <Image style={{ height:width*0.32, width:width*0.32, }} source={ImgUrl} />
            </View>
            <View style={{ flexDirection: 'column', margin: 10, marginLeft: 30 }}>
              <Text style={{ marginBottom: 5 }}>{toolName}</Text>
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
              <Text style={{ color: 'blue' }}>${toolRentCurrencyValue}/hr</Text>
              <Text>{toolMake} & {toolModel}</Text>
              <View style={{ alignItems: 'center', marginLeft: 15, justifyContent: 'center', flexDirection: 'row', marginTop: 5 }}>
                <TouchableOpacity style={{ borderColor: 'black', borderWidth: 1, borderRadius: 15 }}>
                  <Icon.Button name="trash" backgroundColor="transparent" color="black" onPress={() => this.cancelTools(userId, toolId)} >
                    Cancel
                  </Icon.Button>
                </TouchableOpacity>
              </View>
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
          outerContainerStyles={{ height: 55 }}
          backgroundColor={headerBackgroundColor}
          placement="left"
          leftComponent={<LeftComponent />}
          centerComponent={{ text: 'RENTALS', style: { color: '#fff', fontWeight: 'bold', fontSize:20, marginBottom: 3 } }}
          rightComponent={<RightComponent/>}
        />
        <ScrollView styles={styles.innerContainer}>
          <View style={{ backgroundColor: 'white' }}>
            <Text style={{ textAlign: 'center', marginBottom: 15, marginTop: 15, fontWeight: 'bold', fontSize: 18 }}>Upcoming Tool Reservation</Text>
            <View style={{ height: .5, width: "100%", backgroundColor: "#000", marginBottom: 5 }} />
              <ScrollView
                automaticallyAdjustContentInsets={false}
                scrollEventThrottle={200}
                style={{ backgroundColor: 'white', flex: 1 }}
              >
              {
                this.state.noData ? <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <NoDataFoundComponent screenName="Tool"/>
              </View> : <ListView
                  dataSource={this.state.dataSource}
                  renderSeparator= {this.ListViewItemSeparator}
                  renderRow={(rowData) => <UpcomingToolListComponent rowData={rowData} />}
                  enableEmptySections={true}
                />
              }
              </ScrollView>
            </View>
          <View style={{ height: .5, width: "100%", backgroundColor: "#000", marginBottom: 5 }} />
          <View style={{ backgroundColor: 'white', paddingBottom: 15, paddingTop: 15 }}>
            <Text style={{ textAlign: 'center', marginBottom: 15, fontWeight: 'bold', fontSize: 18 }}>Tools Reserved in the Past</Text>
            <View style={{ height: .5, width: "100%", backgroundColor: "#000", marginBottom: 5 }} />
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Text> No Tool In the Past</Text>
              </View>
          </View>
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
    flex: 1
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
  button : {
    alignSelf: 'stretch',
    backgroundColor : '#00c1af',
    height : 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 20,
    color: '#ffffff',
    textAlign: 'center',
  }
});