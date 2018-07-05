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
import {Actions} from 'react-native-router-flux';
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

export default class OwnerToolDetails extends Component {
    render() {
    const { userName, userProfileImageUrl, toolOwnerImgData, toolMake, toolModel, toolImgUrl, toolName, toolRentCurrencyValue, toolId, userId, toolDsc, toolUseRule,  toolRating, dalyRate } = this.props.data;
    const UserImgUrl = userProfileImageUrl ? {uri : userProfileImageUrl} : require('../images/dummy-logo.png');
    console.log(toolOwnerImgData, 'helloooo')    
    console.log(toolOwnerImgData.length, 'helloooo')
    console.log(toolOwnerImgData.awsPreSignedURL, 'hell 1')
    const dummyImages = [
      'https://www.pids.gov.ph/template/default/assets/images/no-image.png',
    ];
    const images = toolOwnerImgData.length > 0  ? undefined : dummyImages;
    var imageData = '';
    toolOwnerImgData.length > 0 && toolOwnerImgData.map((item) => (
      imageData = [...imageData, item.awsPreSignedURL]
    ))
    const FinalImage = images === undefined ? imageData : images
    console.log(FinalImage, 'Final')
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


    
    return(
      <View styles={styles.container}>
        <Header
          outerContainerStyles={{height: 55 }}
          backgroundColor={headerBackgroundColor}
          placement="left"
          leftComponent={<LeftComponent />}
          centerComponent={{ text: userName, style: { color: '#fff', fontWeight: 'bold', fontSize:20 } }}
          rightComponent={<RightComponent/>}
        />
        <ScrollView styles={{ margin: 5, marginBottom: 30 }}>
            <View style={{ backgroundColor: headerBackgroundColor }}>
              <View style={styles.profileImage}>
                <Image style={styles.logo} source={UserImgUrl} />
              </View>
            </View>
            <View style={{ backgroundColor: 'white'}}>
            <Text style={{ marginTop : 10, textAlign: 'center' }}>{toolName}</Text>
            <Text style={{ textAlign: 'center', color: '#4169e1' }}>{dalyRate}/DAY</Text>        
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 5, marginLeft: 15, marginRight: 15 }}>
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
              <Text>{toolMake} & {toolModel}</Text>
            </View>
            <ImageSlider
              autoPlayWithInterval={3000}
              images={FinalImage && FinalImage}
              onPress={({ index }) => Alert.alert(index)}
              customSlide={({ index, item, style, width }) => (
                <View key={index} style={[ style, styles.customSlide ]}>
                  <Image source={{ uri: item }} style={styles.customImage} />
                </View>
              )}
              customButtons={(position, move) => (
                <View style={styles.buttons}>
                  { FinalImage && FinalImage.map((image, index) => {
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
            <View style={{ margin: 20 }}>
              <Text style={{ fontSize: 20, marginBottom: 20 }}>Tool Description</Text>
              <View style={{ flexDirection: 'row', marginBottom: 50 }}>
                <Text>{toolDsc}</Text>
              </View> 
            </View>

            <View style={{ height: .5, width: "100%", backgroundColor: "#000" }} />
           
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
  buttons: {
    margin: 3,
    width: 15,
    height: 15,
    opacity: 0.9,
    alignItems: 'center',
    justifyContent: 'center',
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