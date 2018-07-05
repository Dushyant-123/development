import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  ToolbarAndroid,
  Text,
  View,
  ScrollView,
  Image,
  Dimensions,
  AsyncStorage,
  ListView,
  NetInfo,
  TouchableOpacity,
} from 'react-native';
const {height, width} = Dimensions.get('window');
import {Actions} from 'react-native-router-flux';
import { Header, Rating } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import NoDataFoundComponent from '../components/noData';
import LoadingComponent from '../components/LoadingComponent';
import config from '../common/config';
import { headerBackgroundColor, buttonBackgroundColor} from '../styles';

export default class FavouriteScreen extends Component {
  constructor(props) {
    super(props);
    console.log('Favorite')
    this.state = {
      IsLoaderVisible : true,
      userId: '',
      favorite: true,
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
      this.getFavoriteToolList();
    });
  }

  componentDidMount() {
    console.log("Did mount Called");
    this.getFavoriteToolList();
    
  }

  getFavoriteToolList(){    
    NetInfo.isConnected.fetch().then(isConnected => {
      const { userId }  = this.state ;
      if(isConnected) {
        this.setState({
          IsLoaderVisible: true
        })
        var URL=config.BASE_URL+'ToolsConfiguration/GetFavouriteToolList?token='+this.state.token+'&userID='+userId;
        fetch(URL,
        {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        }).then((response) => response.json()).then((responseJson) => {
          console.log(responseJson, 'favorite')
          console.log(responseJson.data, 'Favarite Data')
          if(!responseJson.success) {
            this.setState({
              IsLoaderVisible: false,
              noData : true,
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
    });
  }

  unFavorite = (toolId) => {
    this.setState({
      IsLoaderVisible : true,
      favorite : false,
    })
    NetInfo.isConnected.fetch().then(isConnected => {
      if(isConnected) {
        var URL=config.BASE_URL+'ToolsConfiguration/Favourite_unfavourite?token='+this.state.token;
        fetch(URL, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            toolId: toolId,
            userId: this.state.userId,
            status: this.state.favorite,
          })
        }).then((response) => response.json())
          .then((responseJson) => {
            if(responseJson.success){
              Actions.favorite();
              this.setState({
                IsLoaderVisible: false,
              })
            }else {
              this.setState({
                IsLoaderVisible: false,
                noData : true,
              })
            }
          }).catch((error) => {
            this.setState({
              IsLoaderVisible: false,
              noData : true,
            })
            });
        } else {
          this.setState({
            IsLoaderVisible: false,
            noData : true,
          })
          Alert.alert('Network not available');
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

    ListViewItemSeparator = () => {
      return (
        <View style={{ height: .5, width: "100%", backgroundColor: "black" }} />
      );
    }

    const FavoritesListComponent = (data) => {
      const { toolImgUrl, toolId, toolName, toolMake, toolModel, toolRating, toolRentCurrencyValue } = data.rowData;
      const ImgUrl = toolImgUrl[0]  === undefined  ? require('../images/dummyImage.png') : {uri :toolImgUrl[0] };
      return(
        <TouchableOpacity onPress={() => Actions.push('favoriteDetails', { data : data.rowData } )}>
          <View style={{ flexDirection: 'row', padding: 5, backgroundColor: 'white' }}>
            <View style={{ flex: 1 }}>
              <Image source={ImgUrl} style={styles.favouriteImage}/>
            </View>
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <View style={{ flexDirection : 'row', justifyContent : 'space-between'}}>
                <Text style={{ marginBottom : 15, fontSize: 16, flex: 3 }}>{toolName}</Text>
                <Icon name="heart" color='red' size={25} backgroundColor="white" style={{ flex: 1 }} onPress={() => this.unFavorite(toolId)}/>
              </View>
              <View style={{ flexDirection: 'row', backgroundColor: 'transparent' }}>
                <Text style={{ fontWeight: 'bold', marginRight: 5 }}>{toolRating} </Text>
                <Rating
                  readonly
                  type="star"
                  fractions={1}
                  startingValue={toolRating}
                  ratingBackgroundColor='#c8c7c8'
                  imageSize={20}
                  onFinishRating={this.ratingCompleted}
                />
              </View>
              <Text style={{ color: 'blue' }}>{toolRentCurrencyValue}/hr</Text>
              <Text>{toolMake} & {toolModel}</Text>
            </View>
          </View>
          <View style={{ height: .5, width: "100%", backgroundColor: "#000" }} />
        </TouchableOpacity>
      )
    }
    
    if(this.state.IsLoaderVisible) {
      return(
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <LoadingComponent />
        </View>
      )
    }
    console.log('hello favorite')
    return(
      <View style={styles.outerContainer}>
        <Header
          outerContainerStyles={{height: 55 }}
          backgroundColor={headerBackgroundColor}
          placement="left"
          leftComponent={<LeftComponent />}
          centerComponent={{ text: 'FAVORITES', style: { color: '#fff', fontWeight: 'bold', fontSize:20 } }}
          rightComponent={<RightComponent/>}
        />
        <View style={{ flex: 1 }}>
          {
            this.state.noData ? <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <NoDataFoundComponent screenName="Favorite" />
            </View> :
            <View styles={styles.innerContainer}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View />
                <Text style={{ fontSize: 20, marginTop: 10, marginBottom: 10, fontWeight: 'bold', textAlign: 'center'}}>My Favorites</Text>
                <View />
              </View>
              <View style={{ height: .5, width: "100%", backgroundColor: "#000" }} />
              <ScrollView ref="scrollView" contentContainerStyle={{ backgroundColor: '#FFF', paddingBottom: 10 }}>
                <ListView
                  dataSource={this.state.dataSource}
                  renderSeparator= {this.ListViewItemSeparator}
                  renderRow={(rowData) => <FavoritesListComponent rowData={rowData} />}
                  enableEmptySections={true}
                  style={{marginTop: 5, marginBottom: 50 }}
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
    backgroundColor: 'white',
    marginBottom: 10
  },
  footerContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'white',
  },
  favouriteImage: {
    width: width / 2.35,
    height: 130,
    marginRight: 10,
    marginLeft: 5
  },
  contentContainer: {
  
  },
});