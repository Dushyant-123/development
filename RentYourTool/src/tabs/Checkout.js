import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  TouchableHighlight,
  ScrollView,
  Image,
  TextInput,
  Picker,
  Button,
  Alert,
  ImageBackground,
  Dimensions  
} from 'react-native';

var { height, width } = Dimensions.get('window');
import ImageSlider from 'react-native-image-slider';
import {Actions} from 'react-native-router-flux';   //Actions Used for navigation
import Icon from 'react-native-vector-icons/FontAwesome';   //For Icon Used for back step as pop.
import { Header } from 'react-native-elements';    //For Header.
import { headerBackgroundColor, buttonBackgroundColor } from '../styles';  //common BackgroundColor style for Header.

export default class ShowcaseYourToolPage extends Component {
  constructor(props){
    super(props)
    this.state = {
      text: '',
    }
  }
  render () {
    
    //for Header in Left Side
    const LeftComponent = () => {
      return(
        <Icon.Button size={20} name="chevron-left" backgroundColor="transparent" onPress={() => Actions.pop()}/>
      )
    }

    //for Header in Right Side, But Now it is blank.
    const RightComponent = () => {
      return(
        <View style={{ flexDirection: 'row' }}>
             
        </View>
      )
    }

    const images= [
      'https://www.pids.gov.ph/template/default/assets/images/2.png',
    ];

    return (
      <View style={styles.parentContainer}>
        <Header
          outerContainerStyles={{ height: 55 }}
          backgroundColor={headerBackgroundColor}
          placement="left"
          leftComponent={<LeftComponent />}
          centerComponent={{ text: 'CHECKOUT', style: { color: '#fff', fontWeight: 'bold', fontSize:18 } }}
          rightComponent={<RightComponent/>}
        />
          <ScrollView style={styles.MainContainer}>
              <Text style={{ textAlign: 'center', fontSize: 15, padding: 15 }}>ST1HL GX10 CHAINSAW</Text>
              <Image style={{ width: width, height: 150, paddingRight: 10 }} source={require('../images/2.png')} />

              <View style={{ flexDirection: 'row', margin: 10 }}>
                <View style={{ flex: .5}}>
                  <Text style={{ color: headerBackgroundColor, fontWeight: 'bold'}}>Pickup</Text>
                </View>
                <View style={{ flex: 1.5 }}>
                  <Text style={{ flex: 1}}> Jun 19, 11:30 A.M.</Text>
                </View>
                <View syle={{ flex: 2 }}>
                  <Text style={{fontStyle: 'italic'}}>13 days to go</Text>
                </View>
                <View style={{ flex: 1}}>
                  <Text style={{ color: 'red', marginLeft: 15 }}>CHANGE</Text>
                </View>
              </View>

              <View style={{ flexDirection: 'row', margin: 10 }}>
                <View style={{ flex: .5}}>
                  <Text style={{ color: headerBackgroundColor, fontWeight: 'bold'}}>Return</Text>
                </View>
                <View style={{ flex: 1.5 }}>
                  <Text style={{ flex: 1}}> Jun 20, 10:30 A.M.</Text>
                </View>
                <View syle={{ flex: 2 }}>
                  <Text style={{fontStyle: 'italic'}}>14 days to go</Text>
                </View>
                <View style={{ flex: 1}}>
                  <Text style={{ color: 'red', marginLeft: 15 }}>CHANGE</Text>
                </View>
              </View>

              <View style={{ flexDirection: 'row', margin: 10 }}>
                <View style={{ flex: 1}}>
                  <Text style={{ fontWeight: 'bold' }}>Apple Pay</Text>
                </View>
                <View style={{ flex: 2 }}>
                  <Text>Apple Pay</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ color: 'green', marginLeft: 15, fontSize: 20 }}>></Text>
                </View>
              </View>

              <View style={{ flexDirection: 'row', margin: 10 }}>
                <View style={{ flex: 1}}>
                  <Text style={{ color: headerBackgroundColor, fontWeight: 'bold', color: 'red' }}>Promo Code</Text>
                </View>
                <View style={{ flex: 2 }}>
                  <TextInput
                    placeholder="Enter your unique code"
                    underlineColorAndroid="transparent"
                    style={{height: 25, borderColor: 'gray', borderWidth: 1, }}
                    onChangeText={(text) => this.setState({text})}
                    value={this.state.text}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ color: 'green', marginLeft: 15 }}>APPLY</Text>
                </View>
              </View>

              <View style={{ backgroundColor: headerBackgroundColor, padding: 10 }}>
                <View style={{ flexDirection: 'row', marginBottom: 10, justifyContent: 'space-between'}}>
                  <Text>Reservation</Text>
                  <Text>$500</Text>
                </View>
                <View style={{ flexDirection: 'row', marginBottom: 10, justifyContent: 'space-between'}}>
                  <Text>Booking Fee</Text>
                  <Text>$1.00</Text>
                </View>
                <View style={{ height: .5, marginTop: 5, marginBottom:5, width: "100%", backgroundColor: "black" }} />                
                <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                  <Text>Tootal: $6.00</Text>
                  <TouchableOpacity style={{ backgroundColor: buttonBackgroundColor, margin: 10, padding: 10 }}onPress={() => Actions.Payment()}>
                    <Text style={{ color: 'white'}}>PAY NOW</Text>
                  </TouchableOpacity>
                </View>
              </View>     
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
  },
  container: {
    flex: 1,  
  },    
  MainContainer : {
    flex: 1
  },
   logoText : {
    marginLeft:10,  
    width: 330, 
    fontSize:20,
    textAlign: 'center',
    color:'#fff'
  },
  loginButton: {
    backgroundColor: buttonBackgroundColor,
    justifyContent: 'center', 
    alignItems: 'center', 
  },
  skiptext: {
    flex:1, 
    height:45,
    bottom: 60,  
    width: 300,
    justifyContent: 'center', 
    alignItems: 'center',
  },
  imageStyle: {
    flex: 1,
    alignItems:'center',
  },
  toolbar: {
    height: 56,
    backgroundColor: '#4883da',
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 44,
    width: 200,
    backgroundColor: '#4883da',
    alignSelf: 'center',
    justifyContent: 'center'
  },
});