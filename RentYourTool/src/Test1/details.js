import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  ToolbarAndroid,
  TouchableOpacity,
  Text,
  View,
  Dimensions,
  Image,
  ScrollView,
  NetInfo,
  AsyncStorage,
  Alert,
} from 'react-native';
import { Header, Rating } from 'react-native-elements';
import RatingComponent from '../components/RatingComponent';
import Icon from 'react-native-vector-icons/FontAwesome';
import Spinner from 'react-native-loading-spinner-overlay';
import ImageSlider from 'react-native-image-slider';
import { headerBackgroundColor } from '../styles';
import config from '../common/config';
var { height, width } = Dimensions.get('window');
import moment from 'moment'
import LoadingComponent from '../components/LoadingComponent';

export default class DetailsPage extends Component {
    static navigationOptions = {
        header: null,
      };
  constructor(props){
    super(props);
    const favoriteStatus = props.favorite;
    this.state = {
      IsLoaderVisible: false,
      favorite: favoriteStatus,
    }
    AsyncStorage.getItem("token").then((value) => {
      this.setState({
        token : JSON.parse(value)
      })
    });
    AsyncStorage.getItem("userId").then((value) => {
      this.setState({
        userId : value
      })
    });
  }

  favorite = (userId, toolId) => {
    this.setState(prevState => ({
      favorite: !prevState.favorite,
    }));
    NetInfo.isConnected.fetch().then(isConnected => {
      if(isConnected) {
        var URL=config.BASE_URL+'ToolsConfiguration/Favourite_unfavourite?token='+this.state.token;
        console.log(URL, this.state.userId, 'Hello')
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
            const data = responseJson.message;
            if(responseJson.success){
          
            }else{
              Alert.alert(data);
            }
          }).catch((error) => {
            console.log(error);
            });
        } else {
          Alert.alert('Network not available');
        }
      });
  }

  bookNowScreen = (data, startTime, endTime, duration, locationZipCode) => {
    const { toolId, userId, toolRentCurrencyValue  } = data;
    var dateTime = new Date();
    dateTime = moment(dateTime).format("YYYY-MM-DD HH:mm:ss");
    console.log(dateTime, 'Tool Booked Time')
    NetInfo.isConnected.fetch().then(isConnected => {
      if(isConnected) {
        this.setState({
          IsLoaderVisible: true
        })
        var URL= config.BASE_URL+'ToolsConfiguration/Toolbooking?token='+this.state.token;
        console.log(toolId, userId, locationZipCode, duration, toolRentCurrencyValue, 'Details')
        fetch(URL,  {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            toolID: Number(toolId),
            userId: this.state.userId,
            ownerID: userId,
            startTime: dateTime,
            endTime: dateTime,
            locationZipCode: locationZipCode,
            duration: '2 Days',
            toolRate: Number(toolRentCurrencyValue),
          })
        }).then((response) => response.json()).then((responseJson) => {
          console.log(responseJson, 'ANKIT Tool BOOK')
          var data = responseJson.message;
          if (responseJson.success){
            this.setState({IsLoaderVisible: false})
            this.props.navigation.navigate('Home');
          } else {
            Alert.alert(data);
            this.setState({IsLoaderVisible: false})
          }
            }).catch((error) => {
              console.log(error, 'ERROR')
            this.setState({IsLoaderVisible: false})
          });
        } else {
          alert('Network not available');
        }
    });
  }

  render(){
    const { userName, userProfileImageUrl, toolFavouriteStatus, toolImgUrl, toolName, toolRentCurrencyValue, toolId, userId, toolDsc, toolUseRule,  toolRating } = this.props.navigation.state.params.data;
    const startTime = this.props.startTime;
    const endTime = this.props.endTime;
    const duration = this.props.duration;
    const locationZipCode = this.props.zipCode;
    const UserImgUrl = userProfileImageUrl ? {uri : userProfileImageUrl} : require('../images/dummy-logo.png');
    const dummyImages = [
      'https://www.pids.gov.ph/template/default/assets/images/no-image.png',
    ];
    const images = toolImgUrl.length > 0  ? toolImgUrl : dummyImages;

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
    
    if(this.state.IsLoaderVisible){
        return(
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <LoadingComponent />
          </View>
        );
    }
    return(
      <View styles={styles.container}>
        <Header
          outerContainerStyles={{height: 55 }}
          backgroundColor={headerBackgroundColor}
          placement="left"
          leftComponent={<LeftComponent />}
          centerComponent={{ text: userName, style: { color: '#fff', fontWeight: 'bold', fontSize:20, marginBottom: 3 } }}
          rightComponent={<RightComponent/>}
        />
          <ScrollView styles={{ margin: 5, flex: 1 }}>
            <View style={{ backgroundColor: headerBackgroundColor }}>
              <View style={styles.profileImage}>
                <Image style={styles.logo} source={UserImgUrl} />
              </View>
            </View>
            <View style={{ backgroundColor: 'white'}}>
            <Text style={{ marginTop : 10, textAlign: 'center' }}>{toolName}</Text>
            <Text style={{ textAlign: 'center', color: '#4169e1' }}>{toolRentCurrencyValue}/DAY</Text>        
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 5, marginLeft: 15, marginRight: 15 }}>
              { 
                this.state.favorite ?  <Icon.Button name="heart" color='red' size={25} backgroundColor="transparent" onPress={ () => this.favorite(userId, toolId)}/>
                :  <Icon.Button name="heart-o" color='black' size={25} backgroundColor="transparent" onPress={ () => this.favorite(userId, toolId)}/>
              }
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
            </View>
            <ImageSlider
              autoPlayWithInterval={3000}
              images={images && images}
              onPress={({ index }) => alert(index)}
              customSlide={({ index, item, style, width }) => (
                <View key={index} style={[ style, styles.customSlide ]}>
                  <Image source={{ uri: item }} style={styles.customImage} />
                </View>
              )}
              customButtons={(position, move) => (
                <View style={styles.buttons}>
                  { images && images.map((image, index) => {
                    return (
                      <TouchableOpacity
                        key={index}
                        underlayColor="#ccc"
                        onPress={() => move(index)}
                        style={styles.button}
                      >
                      </TouchableOpacity>
                    );
                  })}
                </View>
              )}
            />

            <Text style={{ marginLeft: 20, marginRight: 20 }}>{toolDsc}</Text>
            <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, marginTop: 20, marginBottom: 10 }} />
            <View style={{ margin: 20 }}>
              <Text style={{ fontSize: 20, marginBottom: 20 }}>USAGE RULES</Text>
              <View style={{ flexDirection: 'row' }}>
                <Text>{toolUseRule}</Text>
              </View> 
            </View>
            <View style={{ flexDirection: 'row', marginLeft: 20, marginTop: 20, marginBottom: 80 }}>
              <TouchableOpacity style={{ flex: 1, marginRight: 20, padding: 15, backgroundColor: '#ff8c00'}} onPress={ () => this.bookNowScreen(this.props.data, startTime, endTime, duration, locationZipCode)}>
                <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}> BOOK NOW </Text>
              </TouchableOpacity>
            </View>
            </View>
          </ScrollView>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    margin: 5,
  },
  toolbar: {
    height: 56,
    backgroundColor: '#00aff0',
  },
  profileImage:{
    backgroundColor:'#f8f8f8',
    alignSelf:'center',
    justifyContent:'center',
    alignContent:'flex-start',
    height:width*0.25,
    width:width*0.25,
    borderRadius:50,
    margin: 5,
  },
  logo:{
    height:width*0.22,
    width:width*0.22,
    overflow:'hidden',
    alignSelf:'center',
    borderRadius : 50,
  },
  sectionProfile:{
    marginBottom : 10,
    marginTop: 10,
    height:height*0.3,
    width : width,
  },
  buttons: {
    margin: 3,
    width: 15,
    height: 15,
    opacity: 0.9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'white',
  },
  buttonSelected: {
    opacity: 1,
    color: 'red',
    fontSize: 40,
    fontWeight: 'bold',
    flexDirection: 'row'
  },
  customSlide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  customImage: {
    height:height*0.3,
    width : width,
  },
});