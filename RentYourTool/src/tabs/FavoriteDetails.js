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
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import { Header, Rating } from 'react-native-elements';
import RatingComponent from '../components/RatingComponent';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImageSlider from 'react-native-image-slider';
import { headerBackgroundColor } from '../styles';
import config from '../common/config';
var { height, width } = Dimensions.get('window');
import LoadingComponent from '../components/LoadingComponent';

export default class DetailsPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      IsLoaderVisible: false,
      favorite: true,
    }
  }
  
  render(){
    const { userProfileImageUrl, toolImgUrl, toolName, toolRentCurrencyValue, toolId, userId, toolDsc, toolUseRule,  toolRating } = this.props.data;
    const UserImgUrl = userProfileImageUrl ? {uri : userProfileImageUrl} : require('../images/dummy-logo.png');
    const dummyImages = [
      'https://www.pids.gov.ph/template/default/assets/images/no-image.png',
    ];
    const images = toolImgUrl.length > 0  ? toolImgUrl : dummyImages;

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
    
    if(this.state.IsLoaderVisible){
        return(
            <LoadingComponent />
        );
    }
    return(
      <View styles={styles.container}>
        <Header
          outerContainerStyles={{height: 55 }}
          backgroundColor={headerBackgroundColor}
          placement="left"
          leftComponent={<LeftComponent />}
          centerComponent={{ text: 'FAVORITE DETAILS', style: { color: '#fff', fontWeight: 'bold', fontSize:20 } }}
          rightComponent={<RightComponent/>}
        />
          <ScrollView styles={{ margin: 5 }}>
            <View style={{ backgroundColor: headerBackgroundColor }}>
              <View style={styles.profileImage}>
                <Image style={styles.logo} source={UserImgUrl} />
              </View>
            </View>
            <View style={{ backgroundColor: 'white', padding: 5 }}>
            <Text style={{ marginTop : 10, textAlign: 'center' }}>{toolName}</Text>
            <Text style={{ textAlign: 'center', color: '#4169e1' }}>{toolRentCurrencyValue}/DAY</Text>        
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 5, marginLeft: 15, marginRight: 15 }}>
              <Icon.Button name="heart" color='red' size={25} backgroundColor="transparent" />
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
              loop
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
                        <Text style={position === index && styles.buttonSelected}>
                        •
                        </Text>
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
              <View style={{ flexDirection: 'row', marginBottom: 50 }}>
                <Text>{toolUseRule}</Text>
              </View> 
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
    flex: 1,
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
    width : width - 10,
  },
});