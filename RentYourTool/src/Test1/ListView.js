import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  Image,
  ToolbarAndroid,
  AsyncStorage,
  Dimensions,
  NetInfo,
  ScrollView,
  ImageBackground,
  ActivityIndicator,
  ListView,
  TextInput,
  Alert
} from 'react-native';
var { height,width } = Dimensions.get('window');
import config from '../common/config';
import Geocoder from 'react-native-geocoder';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Header, Rating } from 'react-native-elements';
import { headerBackgroundColor, buttonBackgroundColor } from '../styles';


class ListViewComponent extends Component {
  constructor(props){
    super(props)
    const { toolFavouriteStatus } = props.rowData;
    this.state = {
      favorite: toolFavouriteStatus,
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

  favorite = (token, userId, toolId) => {
    this.setState(prevState => ({
      favorite: !prevState.favorite,
    }));

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
        }).then((response) => response.json()).then((responseJson) => {
            const data = responseJson.message;
            if(responseJson.success){
              this.forceUpdate();
            }else{
     
            }
          }).catch((error) => {
            console.log(error);
            });
        } else {
          Alert.alert('Network not available');
        }
      });
  }


  render(){   
    const { userId, toolId, toolName, toolMake, toolModel, toolReview, toolRating, toolRentCurrencyValue, toolImgUrl, userProfileImageUrl } = this.props.rowData;
    const startTime = this.props.startTime;
    const endTime = this.props.endTime;
    const zipCode = this.props.zipCode;
    const duration = this.props.duration;
    const token = this.props.token;
    const UserImgUrl = userProfileImageUrl ? {uri : userProfileImageUrl} : require('../images/dummy-logo.png')
    const ImgUrl = toolImgUrl[0]  === undefined  ? require('../images/dummyImage.png') : {uri :toolImgUrl[0] };
    
    const toolReveiewShow = (data) => {
      Alert.alert(
        'Comment Given by the Renters',
         data[0],
        [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ],
        { cancelable: false },
      );
    };
    console.log(this.props, 'Hereo')
    return(
      <View style={{ backgroundColor : 'white', }}>
         <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 15, marginRight: 20 }}>
          { 
            this.state.favorite ?  <Icon.Button name="heart" color='red' size={21} backgroundColor="transparent" onPress={ () => this.favorite(token, userId, toolId)}/>
            :  <Icon.Button name="heart-o" color='black' size={21} backgroundColor="transparent" onPress={ () => this.favorite(token, userId, toolId)}/>
          }
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity>
              <View style={{ flexDirection: 'row', marginTop: 10 }}>
                <Text style={{ fontWeight: 'bold', marginRight: 5 }}>{toolRating} </Text>
                <Rating
                  readonly
                  type="star"
                  fractions={1}
                  startingValue={toolRating}
                  ratingBackgroundColor='red'
                  imageSize={20}
                  onFinishRating={this.ratingCompleted}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity style={{ marginLeft: 5, marginRight: 5 }} onPress={() => this.props.navigation.navigate('Details', { data : this.props.rowData, favorite: this.state.favorite, startTime : startTime, endTime : endTime, zipCode : zipCode, duration: duration } )}>
          <View>
            <ImageBackground
              source={ImgUrl}
              style={styles.sectionProfile}
            >
              <View style={styles.profileImage}>
                <Image style={styles.logo} source={UserImgUrl} />
              </View>
            </ImageBackground>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 15, marginRight: 20 }}>
              <Text style = {{color:headerBackgroundColor, fontSize: 15, flex: .8 }}>
                ${toolRentCurrencyValue}/day
              </Text> 
              <Text style={{color : 'black', textAlign: 'right', fontSize: 15, flex:4.5 }}>
                {toolName}-{toolMake} {toolModel}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

  export default ListViewComponent;

  const styles = StyleSheet.create({
    MainContainer :{
     justifyContent: 'center',
     flex:1, 
     },
    rowViewContainer: {
      fontSize: 17,
      padding: 10
     },
     searchBox:{    
      textAlign: 'center',
      height: 40,
      borderWidth: 1,
      borderColor: '#009688',
      borderRadius: 7 ,
      backgroundColor : "#FFFFFF",
      marginTop: 10,
      marginBottom: 5
      },
      outerContainer: {
       flex: 1,
       paddingTop : 10,
       paddingBottom : 10, 
       backgroundColor:'#ffffff',
       padding: 5,
     },
     locationRow: {
       flex:.25,
       flexDirection : 'row',
       justifyContent : 'center',
       alignContent: 'center',
       borderBottomWidth : 1,
       borderBottomColor : '#c5c5c5',
       marginBottom: 5,
       marginTop: 5,
     },
     locationName: {
       flex:.8,
       paddingLeft : 10,
       justifyContent : 'center',
       flexDirection : 'row',
       alignContent: 'center',
       alignSelf :'center',
     },
     changeButton: {
       flex:.2,
       justifyContent : 'center',
       alignContent: 'center',
       borderLeftWidth : 1,
       borderLeftColor : '#c5c5c5'
     },
     contentContainer: {
     
     },
     ImageStyle: {
       padding: 10,
       height: 25,
       width: 25,
       resizeMode : 'stretch',
       alignItems: 'center'
     },
     toolbar: {
       height: 56,
       backgroundColor: '#4883da',
     },
     sectionProfile:{
       height:height*0.20,
       width : width,
     },
     profileImage:{
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