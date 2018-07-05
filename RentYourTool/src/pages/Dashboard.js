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
  StatusBar,
  Button,
  TextInput,
} from 'react-native';
var { height, width } = Dimensions.get('window');

import {Actions} from 'react-native-router-flux';
import Geocoder from 'react-native-geocoder';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Header } from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
import Collapsible from 'react-native-collapsible-header';
import { Dropdown } from 'react-native-material-dropdown';
import NoDataFoundComponent from '../components/noData';

import config from '../common/config';
import ListViewComponent from '../components/ListViewComponent';
import moment from 'moment';
import { headerBackgroundColor, buttonBackgroundColor } from '../styles';
import LoadingComponent from '../components/LoadingComponent';
 
var _navigator;


export default class MyProject extends Component {

  constructor(props) {
    super(props);
    this.state = {
      startTime : moment().format('MM-DD hA'),
      endTime : moment().format('MM-DD hA'),
      latitude: null,
      longitude: null,
      error: null,
      isLoading: true,
      text: '',
      noData: false,
      searchTextInput: false,
    }
    this.arrayholder = [] ;
    AsyncStorage.getItem("userId").then((value) => {
      this.setState({
        userId : value
      })
    });
    AsyncStorage.getItem("token").then((value) => {
      this.setState({
        token : JSON.parse(value)
      })
      this.getToolList();
      // this.getCateloryList();
    });
  }

  getToolList() {
    NetInfo.isConnected.fetch().then(isConnected => {
      if(isConnected) {
        this.setState({
          IsLoaderVisible: true
        })
        var URL=config.BASE_URL+'ToolsConfiguration/GetToolList?token='+this.state.token+'&RentelID='+this.state.userId;
        console.log(URL, 'Dashboard Url')
          fetch(URL, {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
          }).then((response) => response.json()).then((responseJson) => {
            console.log(responseJson, 'NEW')
            if(!responseJson.success) {
              this.setState({
                isLoading: false,
                noData: true
              })
            } else {
              let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
            this.setState({
              isLoading: false,
              dataSource: ds.cloneWithRows(responseJson.data),
            }, function() {
              this.arrayholder = responseJson.data ;
            });
          }  
      }).catch((error) => {
        this.setState({
          isLoading: false,
          noData: true
        })
      
      });
    } else {
      this.setState({
        isLoading: false,
        noData: true
      })
      Alert.alert('Network not available');
    }}
  )
}

changeToSearch() {
  console.log('hello Change to Search')
  this.setState(prevState => ({
    searchTextInput: !prevState.searchTextInput,
  }));
}

SearchFilterFunction(){
  const text = this.state.text;
  const newData = this.arrayholder.filter(function(item){
     const itemData = item.toolName.toUpperCase();
     const textData = text.toUpperCase();
     return itemData.indexOf(textData) > -1;
  })
  this.setState({
     dataSource: this.state.dataSource.cloneWithRows(newData),
     text: ''
  })
}

  getCateloryList() {
    NetInfo.isConnected.fetch().then(isConnected => {
      if(isConnected) {
        var URL=config.BASE_URL+'ToolsConfiguration/GetCategory?token='+this.state.token;
        console.log(this.state.token, URL, 'Dashboard')
          fetch(URL, {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
          }).then((response) => response.json()).then((responseJson) => {
            if(!responseJson.success) {
              this.setState({
                isLoading: false,
                noData: true
              })
            } else {
            this.setState({
              categoryList : responseJson.data
            })
          }
      }).catch((error) => {
        this.setState({
          isLoading: false,
          noData: true
        })
    
      });
    } else {
      this.setState({
        isLoading: false,
        noData: true
      })
      Alert.alert('Network not available');
    }}
  )
  }

 
  ListViewItemSeparator = () => {
    return (
      <View style={{ height: .5, width: "100%", backgroundColor: "#000" }} />
    );
  }

  onRegionChange(region, lastLat, lastLong) {
    // Position Geocoding
    var NY = {
      lat: 40.7809261,
      lng: -73.9637594
    };
    Geocoder.geocodePosition(NY).then(res => {
        // res is an Array of geocoding object (see below)
    
    })
    .catch(err => console.log(err))
    let latLng = {
      lat: lastLat ,
      lng: lastLong 
    };        
  
   // this.setState({ final_latitude: latLng.lat, final_longitude: latLng.lng,isBtnPckupVisible:true });
    // Geocoder.fallbackToGoogle(Key);
    Geocoder.geocodePosition(latLng).then(res => {
      this.setState({ loading: false, GeocoderCall: 0 })    
  
      this.setState({ finalLocationObj: JSON.stringify(res[0]) });
      const fullAddress = res[0].streetName + " " + res[0].locality + " " + res[0].postalCode;
      const homeAddress = res[0].streetName + " " + res[0].locality;
      this.setState({
        address: homeAddress
      });
      AsyncStorage.setItem('Address', JSON.stringify(fullAddress));
    })
    .catch(err => {
      console.log("Error",err);
    })
}

componentDidMount() {
  if (Platform.Version < 23) {

    navigator.geolocation.getCurrentPosition(
      (position) => {

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

        navigator.geolocation.getCurrentPosition(
          (position) => {
           
            let region = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              latitudeDelta: 0.00922 * 0.5,
              longitudeDelta: 0.00421 * 0.5
            }
            // this.setState({ lastLat: region.latitude, lastLong: region.longitude });
            
            // this.setState({ isBtnPckupVisible: true })
            // if(this.state.onMapReady)

            this.onRegionChange(region, region.latitude, region.longitude);
          },
          (error) => console.log("Error : ",error),//this.onInfo(texts.errLocationDetect, texts.errLocationDetectdesc),
          { enableHighAccuracy: false, timeout: 20000 },
        );
      // } else {
      //   //this.error(texts.errLocationPermDeny, texts.errLocationPermDenydesc);
      // }
    } catch (err) {
      console.log(err)
    }
  }
}

Thingsyourneed() {
  Actions.Thingsyourneed()
}

mainscreen(){
  Actions.mainscreen()
}
 
  render() {
    _navigator = this.props.navigator;
    const { startTime, endTime } = this.state;
    const ChangeTime = () => {
      const { startTime, endTime } = this.state;
    }
    const onEndDateChange = (endTime) => {
      this.setState({
        endTime: endTime,
      })
      const { startTime } = this.state;
      if ((Date.parse(startTime) >= Date.parse(endTime))) {
        Alert.alert("End date should be greater than Start date");
      }  
    }

    const startDate = moment(new Date(startTime));
    const endDate= moment(new Date(endTime));

    const isEqualTime = Date.parse(startTime) === Date.parse(endTime);
 
    var durations = moment.duration(endDate.diff(startDate));
    var days = durations.asDays();
    var duration = parseInt(days);

    // var now = moment(new Date()); //todays date
    //var end = moment("2018-06-1"); // another date
    // console.log(startTime, moment(endTime), 'AA')
    // parseInt("10.33");
    // x.toFixed(0);

    var CompleteDurationText = '';
    if(!isEqualTime){
      CompleteDurationText = `${duration} Days`;
    }

    const GetCategoryListComponent = () => {
      if(this.state.categoryList !== undefined){
        const data1 = this.state.categoryList;
      }
  
      let data = [
        { value: 'Banana' },
        { value: 'Mango' },
        { value: 'Pear' }
      ];
      return(
        <Dropdown
          label='Select Tool Category'
          data={data}
          containerStyle={{ marginLeft: 10 }}
        />
      )
    }
          
    const Header = () => (

      <View style={styles.header}>
        <View style={{ height: 55, flexDirection: 'row', alignItems:'center', backgroundColor: headerBackgroundColor }}>
            <View style={{ flex: 1 }} />
            <View style={{ flex: 1, alignItems: 'center'}}>
              <Image source={ require('../images/icon.png') } style={{ width: 32, height: 32 }} />
            </View>
            <View style={{ flex: 1, alignItems: 'flex-end' }} >
              <Icon.Button name="search" color="white" size={25} backgroundColor="transparent" onPress={ () => Actions.search() } />
            </View>
        </View>
        {
          this.state.noData ? <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <NoDataFoundComponent screenName="Dashboard" />
           </View> : 
          <View style={{ flex: 1, flexDirection: 'row', marginTop: 5 }}>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ flex:0.5, marginLeft: 10 }}>
              <Image source={ require('../images/map.png') } style={styles.ImageStyle} />
            </View>
            <View style={{ flex: 3 }}>
              <Text style={{color : '#71767a', fontSize : 16, }}>{this.state.address}</Text>              
            </View>
          </View>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <View style={{ flex: 1 }}>
              <Text>Start time</Text>
              <DatePicker
                customStyles={{ dateInput:{alignItems : 'flex-start', borderWidth: 0}, dateText: {color: 'red', fontSize: 15} }}
                style={{ width: 140 }}
                minDate={moment()}
                date={this.state.startTime}
                format="MM-DD hA"
                mode="datetime"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"  
                showIcon={false}
                onDateChange={(startTime) => {this.setState({startTime: startTime});}}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text>End time</Text>
              <DatePicker
                customStyles={{dateInput:{alignItems : 'flex-start', borderWidth: 0}, dateText: {color: 'red', fontSize: 15} }}
                style={{width: 140 }}
                minDate={moment()}
                format="MM-DD hA"
                date={this.state.endTime}
                mode="datetime"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"  
                showIcon={false}
                onDateChange={(endTime) => {onEndDateChange(endTime)}}
              />
            </View>
          </View>
        </View>
        }
        <View style={{ height: .5, width: "100%", backgroundColor: "#000", marginTop: 15 }} />
      </View>
    );
    //<GetCategoryListComponent /> 180
    const color = '#0f9d58';

    if(this.state.isLoading){
      return(
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <LoadingComponent />
        </View>
      )
    }

    return (
      <View style={{ flex: 1}}>
        <Collapsible
          backgroundColor="white"
          renderHeader={<Header />}
          min={0}
          max={110}
          renderContent={
            <View style={{ paddingBottom : 10 }}>
              <ListView
                  dataSource={this.state.dataSource}
                  renderSeparator= {this.ListViewItemSeparator}
                  renderRow={(rowData) => <ListViewComponent token={this.state.token} rowData={rowData} startTime={this.state.startTime} endTime={this.state.endTime} duration={duration} zipCode="201014"/>}
                  enableEmptySections={true}
                  style={{margin: 5}}
                />
            </View>
          }
        />
      </View>
    );
  }
}
 
const styles = StyleSheet.create({
  locationRow: {
    flexDirection: 'row',
    marginTop: 5,
    marginBottom: 5,
  },
  locationName: {
    flex: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 5,
  },
  locationChange: {
    textAlign : 'center',
    fontSize : 16,
    borderLeftWidth: 1,
    borderLeftColor:'#c5c5c5',
    paddingBottom: 5
  },
  changeButton: {
    flex:1,
  },
  contentContainer: {
    flex: 1
  },
  ImageStyle: {
    height: 25,
    width: 25,
  },
  searchBox:{    
    textAlign: 'center',
    height: 35,
    borderColor: '#009688',
    borderRadius: 15,
    backgroundColor : "#FFFFFF",
    margin: 10,
    flex: 4
  },
  header: { flex: 1, },
  headerText: { color: '#fff' },
  content: { alignItems: 'center', justifyContent: 'center' },
  contentText: { color: '#444', padding: 40 }
});