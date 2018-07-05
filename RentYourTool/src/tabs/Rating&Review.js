import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  ToolbarAndroid,
  TouchableOpacity,
  Text,
  TextInput,
  View,
  AsyncStorage,
  Dimensions,
  NetInfo,
  ScrollView,
} from 'react-native';
import config from '../common/config';
import { Header } from 'react-native-elements';
import Stars from 'react-native-stars-rating';  
import Icon from 'react-native-vector-icons/FontAwesome';
import {Actions} from 'react-native-router-flux';
import Spinner from 'react-native-loading-spinner-overlay';
var { height, width } = Dimensions.get('window');
import { headerBackgroundColor, buttonBackgroundColor } from '../styles';
import LoadingComponent from '../components/LoadingComponent';

export default class RatingReview extends Component {
    constructor(props){
        super(props)
        this.state = {
            rating : '',
            comment : '',
            IsLoaderVisible: false,
        }
    }

    submitingForm = (token, userId, toolId) => {
        const { rating, comment } = this.state;
        console.log(rating, comment, userId, toolId, 'NEW')
            NetInfo.isConnected.fetch().then(isConnected => {
                if(isConnected) {
                  this.setState({
                    IsLoaderVisible: true
                  })
                  var URL= config.BASE_URL+'ToolsConfiguration/ToolRating?token='+token;
                  console.log(URL, 'URL')
                  fetch(URL,  {
                    method: 'POST',
                    headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        ratId: 1,
                        toolId: toolId,
                        userId : userId,
                        toolRating : rating,
                    })
                  }).then((response) => response.status).then((responseJson) => {
                      if(responseJson.success){
                        this.setState({
                          IsLoaderVisible: false
                        })
                      }else{
                        const message = responseJson.message;
    
                        this.setState({
                          IsLoaderVisible: false
                        })
                      }
                      }).catch((error) => {
           
                      this.setState({
                        IsLoaderVisible: false
                      })
                    });
                  } else {
                    Alert.alert('Network not available');
                    this.setState({
                      IsLoaderVisible: false
                    })
                  }
              });
              if(comment === ''){
                this.setState({
                  IsLoaderVisible: false
                })
              }else {
                NetInfo.isConnected.fetch().then(isConnected => {
                  if(isConnected) {
                    var URL= config.BASE_URL+'ToolsConfiguration/ToolReview?token='+token;
                    console.log(URL, 'URL 1')
                    this.setState({
                      IsLoaderVisible: true
                    })
                    fetch(URL,  {
                      method: 'POST',
                      headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({
                          revId: 1,
                          toolId: toolId,
                          userId : userId,
                          toolReview : comment,
                      })
                    }).then((response) => response.status).then((responseJson) => {
                      if(responseJson.success){
                        console.log(responseJson, 'Response')
                        Actions.Dashboard();
                        this.setState({
                          IsLoaderVisible: false
                        })
                      }else{
                        const message = responseJson.message;
          
                      }
                        }).catch((error) => {
   
                        this.setState({
                          IsLoaderVisible: false
                        })
                      });
                    } else {
                      Alert.alert('Network not available');
                      this.setState({
                        IsLoaderVisible: false
                      })
                    }
                });
              }
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
    const token = this.props.token;
    const userId = this.props.userId;
    const toolId = this.props.toolId;

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
          centerComponent={{ text: 'RATINGS & REVIEWS', style: { color: '#fff', fontWeight: 'bold', fontSize:20 } }}
          rightComponent={<RightComponent/>}
        />
            <View styles={styles.innerContainer}>
            <View style={{ flexDirection: 'row', margin: 20 }}>
                <Text style={{ flex: 1, fontSize: 18 }}>Give Tool Rating</Text>
                <Stars
                    isActive={true}
                    rateMax={5}
                    isHalfStarEnabled={false}
                    onStarPress={(rating) => this.setState({rating})}
                    rate={0}
                    isHalfStarEnabled={true}
                    size={30}
                />
            </View>
            <View style={{ marginTop: 10, margin: 20 }}>
                <Text style={{ fontSize: 18, marginBottom: 10 }}>Give Tool Comment</Text>
                <View style={styles.sectionStyle}>
                <TextInput
                  underlineColorAndroid="transparent"  
                  selectionColor="#000"
                  multiline = {true}
                  placeholder="type some comment for Tool"
                  onChangeText={(comment) => this.setState({comment})}              
                />
            </View>
            </View>
            <View style={{ flexDirection: 'row', marginLeft: 20, marginTop: 20, marginBottom: 100 }}>
                <TouchableOpacity style={{ flex: 1, marginRight: 10, padding: 15, backgroundColor: buttonBackgroundColor }} onPress= { () => this.submitingForm(token, userId, toolId)}>
                  <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}> SUBMIT </Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ flex: 1, marginRight: 20, padding: 15, backgroundColor: '#d3d3d3'}} onPress={ () => Actions.pop()}>
                  <Text style={{ color: buttonBackgroundColor, fontWeight: 'bold', textAlign: 'center' }}> CANCEL </Text>
                </TouchableOpacity>
            </View>
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
  textInputStyleClass:{
    textAlign: 'center',
    height: 130,
    width: width - 50,
    borderWidth: 2,
    borderColor: '#d3d3d3',
    borderRadius: 20 ,
    backgroundColor : "#FFFFFF", 
  },
  sectionStyle: {
    width: 300,    
    height: 140,   
    borderColor: '#000000',
    borderWidth: 0.5,
    margin: 3
  },
});