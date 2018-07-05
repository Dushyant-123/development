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
} from 'react-native';

import {Actions} from 'react-native-router-flux';   //Actions Used for navigation
import Icon from 'react-native-vector-icons/FontAwesome';   //For Icon Used for back step as pop.
import { Header } from 'react-native-elements';    //For Header.
import { headerBackgroundColor, buttonBackgroundColor } from '../styles'; 
var { height, width } = Dimensions.get('window');

export default class PaymentPage extends Component {
  goBack() {
    Actions.pop();
  }
  
  render(){
    const LeftComponent = () => {
      return(
        <View />
      )
    }

    //for Header in Right Side, But Now it is blank.
    const RightComponent = () => {
      return(
        <View />
      )
    }
    return(
      <ScrollView styles={styles.container}>
         <Header
          outerContainerStyles={{ height: 55 }}
          backgroundColor={headerBackgroundColor}
          placement="left"
          leftComponent={<LeftComponent />}
          centerComponent={{ text: 'PAYMENT', style: { color: '#fff', fontWeight: 'bold', fontSize:20 } }}
          rightComponent={<RightComponent/>}
        />
        <View style={{ backgroundColor: '#00aff0', paddingBottom: 20, alignItems: 'center', justifyContent: 'center'}}>
          <Icon name = "check" size={55} color="green"/>
          <Text style={{ textAlign: 'center', color: 'white', fontSize: 25 }}>PAYMENT IS SUCCESSFUL</Text>
        </View>
        <Text style={{ marginTop : 10, marginBottom: 10, textAlign: 'center', fontSize: 20 }}>STIHL GX10 CHAINSAW</Text>
        <Image
          source={require('../images/1.png')}
          style={styles.sectionProfile}
        />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 20, marginRight: 20 }}>
            <View style={{ flexDirection: 'row'}}><Image source={ require('../images/map.png') } style={styles.ImageStyle} /><Text style={{ fontSize: 15 }}>   TOOL LOCATION</Text></View>
            <Text style={{ fontSize: 15 }}> Street Rd, MIAMI</Text>
          </View>
          <View style={{ height: .5, width: "100%", backgroundColor: "#000", marginTop: 20, marginBottom: 20 }} />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 20, marginRight: 20 }}>
            <Icon name="times-circle-o" size={25} ><Text style={{ fontSize: 15 }}>   TIME</Text></Icon>
            <Text style={{ fontSize: 15 }}> Start Time</Text>
            <Text style={{ fontSize: 15 }}> End time</Text>
          </View>
          <View style={{ height: .5, width: "100%", backgroundColor: "#000", marginTop: 20, marginBottom: 20 }} />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 20, marginRight: 20 }}>
            <Icon name="usd" size={25} color='red' ><Text style={{ fontSize: 15, color: 'black' }}>   COST</Text></Icon>
            <Text style={{ fontSize: 15 }}>$6.00</Text>
          </View>
          <View style={{ height: .5, width: "100%", backgroundColor: "#000", marginTop: 20, marginBottom: 20 }} />

          <Text style={{ textAlign: 'center' }}>DESCRIPTION</Text>
          <Text>
            Description of Product
          </Text>

          <View style={{ flexDirection: 'row', marginLeft: 20, marginTop: 20, marginBottom: 80 }}>
              <TouchableOpacity style={{ flex: 1, marginRight: 20, padding: 15, backgroundColor: '#ff8c00'}} onPress={ () => Actions.excursions()}>
                <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}> PRINT </Text>
              </TouchableOpacity>
            </View>
      </ScrollView>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  toolbar: {
    height: 56,
    backgroundColor: '#00aff0',
  },
  sectionProfile:{
    marginBottom : 10,
    height:height*0.3,
    width : width,
    marginBottom: 20
  },
  ImageStyle: {
    padding: 10,
    height: 25,
    width: 25,
    resizeMode : 'stretch',
    alignItems: 'center'
  },
});
