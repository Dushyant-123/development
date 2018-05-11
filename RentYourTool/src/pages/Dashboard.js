import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  Platform,
  Image,
  ToolbarAndroid,
  AsyncStorage,
  Dimensions
} from 'react-native';
var { height,width } = Dimensions.get('window');

import {Actions} from 'react-native-router-flux';
import Geocoder from 'react-native-geocoder';

var _navigator;
export default class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            latitude: null,
            longitude: null,
            error: null,
            toolDis : [],
            isInfoAvailable : false
             
        };
        
    }

    onRegionChange(region, lastLat, lastLong) {

        // Position Geocoding
        var NY = {
          lat: 40.7809261,
          lng: -73.9637594
        };

        Geocoder.geocodePosition(NY).then(res => {
            // res is an Array of geocoding object (see below)
          console.log('\n\n\n res', res);
            
        })
        .catch(err => console.log(err))
        let latLng = {
          lat: lastLat ,
          lng: lastLong 
        };
        
        
        console.log('This is latlng', latLng);
       // this.setState({ final_latitude: latLng.lat, final_longitude: latLng.lng,isBtnPckupVisible:true });
        // Geocoder.fallbackToGoogle(Key);
    
        Geocoder.geocodePosition(latLng).then(res => {

          console.log("Data is here ",res);
          this.setState({ loading: false, GeocoderCall: 0 })
    
          console.log('This is add response', JSON.stringify(res[0]));
          this.setState({ finalLocationObj: JSON.stringify(res[0]) });
          this.setState({
            address: res[4].formattedAddress
          });

          AsyncStorage.setItem('Address', JSON.stringify(res[0])); 
    
        })
        .catch(err => {
          console.log("Error",err);
        })
    }
    
    componentDidMount() {
      if(this.props.toolInform != undefined){
        this.setState({
          toolDis : this.props.toolInform,
          isInfoAvailable : true
        });
      }

      if (Platform.Version < 23) {
        console.log('I am in lower android version');
        navigator.geolocation.getCurrentPosition(
          (position) => {
            // console.log('This is when i get location');
            //this.setState({ isBtnPckupVisible: true })
  
            console.log("\n\n 1 IF",position);
            let region = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              latitudeDelta: 0.00922 * 0.5,
              longitudeDelta: 0.00421 * 0.5
            }
            // this.setState({ lastLat: region.latitude, lastLong: region.longitude });
            this.onRegionChange(region, region.latitude, region.longitude);
          },
          (error) => console.log("Error : ",error),//this.onInfo(texts.errLocationDetect, texts.errLocationDetectdesc),
          { enableHighAccuracy: false, timeout: 40000, maximumAge: 1000 },
        );
  
      }
      else {
        try {
          // const granted =  PermissionsAndroid.request(
          //   PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          //   {
          //     'title': 'Rent Your Tool App Permission',
          //     'message': 'App needs access to your location ' +
          //       'So we can fetch your location'
          //   }
          // )
          // if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  
  
            console.log('IAM here inside permissions');
  
            navigator.geolocation.getCurrentPosition(
              (position) => {
                console.log(position);
                let region = {
                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude,
                  latitudeDelta: 0.00922 * 0.5,
                  longitudeDelta: 0.00421 * 0.5
                }
                // this.setState({ lastLat: region.latitude, lastLong: region.longitude });
                console.log('IAM here inside permissions 1 ', region);
                // this.setState({ isBtnPckupVisible: true })
                // if(this.state.onMapReady)
  
                this.onRegionChange(region, region.latitude, region.longitude);
              },
              (error) => console.log("Error : ",error),//this.onInfo(texts.errLocationDetect, texts.errLocationDetectdesc),
              { enableHighAccuracy: false, timeout: 20000 },
            );
  
  
  
          // } else {
          //   console.log("Location Permissin Denied");
          //   //this.error(texts.errLocationPermDeny, texts.errLocationPermDenydesc);
          // }
        } catch (err) {
          console.log(err)
  
        }
  
      }
    }

    Thingsyourneed() {
      console.log("hello call");
      Actions.Thingsyourneed()
    }

    mainscreen(){
    Actions.mainscreen()
      
    }

    render() {
        _navigator = this.props.navigator;
        return (
        <View style={styles.parentContainer}>

          <View style={{flex:1}}>
            
            <View style={{flex:.4}}>

              <View style={{flex:.25,  flexDirection : 'row', justifyContent : 'center', alignContent: 'center',  borderBottomWidth : 1, borderBottomColor : '#c5c5c5'}}>
              {/* <ToolbarAndroid
                  title='SHOWCASE YOUR TOOL'
                  navIcon={require('../images/arrowback.png')}
                  // onIconClicked={() => this.props.navigator.pop()}
                  style={styles.toolbar}
                  titleColor='white'
                /> */}
                <View style={{flex:.8, paddingLeft : 10, justifyContent : 'center',flexDirection : 'row', alignContent: 'center',alignSelf :'center',   }}>
                    <Image source={require('../images/map.png')} style={styles.ImageStyle} />
                    <Text style={{color : '#71767a', fontSize : 16, textAlign : 'center'}}>{this.state.address}</Text>
                  
                </View>
                <View style={{flex:.2, justifyContent : 'center', alignContent: 'center', borderLeftWidth : 1, borderLeftColor : '#c5c5c5'}}>
                  <Text style={{textAlign : 'center', color: '#bcada7', fontSize : 16}}>CHANGE</Text>
                </View>
              </View>


              <View style={{flex:.25, flexDirection : 'row'}}>
                <View  style={{flex:.3, justifyContent : 'center', alignContent: 'flex-start', paddingLeft : 10 }}>
                  <Text>Start time</Text>
                  <Text style={{color : '#ff695a'}}>May 11, 9 AM</Text>
                  
                </View>
                <View style={{flex:.3 ,justifyContent : 'center', alignContent: 'flex-start', flexDirection : 'column'}}>
                  <Text>End time</Text>
                  <Text style={{color : '#ff695a'}}>May 13, 7 PM</Text>
                </View>
                <View style={{flex:.2, justifyContent : 'center', alignContent: 'flex-start', flexDirection : 'column' }}>
                  <Text >Duration</Text>
                  <Text style={{color : '#ff695a'}}>3 Days</Text>
                </View>
                <View style={{flex:.2, justifyContent : 'center', alignContent: 'flex-start', flexDirection : 'column', borderLeftWidth : 1, borderLeftColor : '#c5c5c5'  }}>
                  <Text style={{textAlign : 'center', color : '#bcada7', fontSize : 16}}>CHANGE</Text>
                  
                </View>
              </View>
              
              <View style={{flex:.25,  justifyContent : 'center',  alignSelf : 'center'}}>
                <Text>Search Box will place here</Text>
              </View>
              <View style={{flex:.25,flexDirection : 'row', justifyContent : 'center',   backgroundColor : '#f2f2f2'}}>
                <Text style={{fontSize : 20}}>TOP RATED TOOLS IN THE AREA (112)</Text>
              </View>


            </View>
            
            <View  style={{flex:.6, }}>
                <TouchableOpacity style= {{ height : 100,  justifyContent : 'center',  alignSelf : 'center'}} onPress={this.mainscreen}>
                  <Text style= {{ fontSize: 20, color: "#333"}}> Tap here to next Screen </Text>
                </TouchableOpacity> 
                {
                      this.state.isInfoAvailable ?
                <View style={styles.sectionProfile}>
                    <View style={styles.profileImage}>
                        <Image style={styles.logo} source={require('../images/download.jpg')} />
                        
                        
                    </View>
                    
                      <View style={{justifyContent : 'center', alignContent : 'center', flex : 1, flexDirection : 'column'}}>
                      <Text style={{color : 'white', fontSize: 20}}>Name : {this.state.toolDis != [] ? this.state.toolDis.toolName : ''}</Text>
                        <Text style = {{color:'white', fontSize: 20, justifyContent : 'center', textAlign : 'center'}}>
                        Rate  : ${this.state.toolDis != []? this.state.toolDis.toolRentCurrencyValue : ''} / day</Text>
                        </View>
                        
                        
                    
                </View>: <Text>''</Text>    }    
            </View>

          </View>
        </View>
        )
    }
}

var styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    paddingTop : 10,
    paddingBottom : 10, 
    backgroundColor:'#ffffff'
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
    height:height*0.3,
    width : width,
    backgroundColor:'#c40c0c',
    // justifyContent:'center',
    alignContent:'center',
    alignSelf:'center',
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



