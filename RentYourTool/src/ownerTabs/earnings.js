import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  ToolbarAndroid,
  Text,
  View,
} from 'react-native';
import { Header } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Actions} from 'react-native-router-flux';
import { headerBackgroundColor } from '../styles';

export default class EarningScreen extends Component {
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
    return(
      <View style={styles.outerContainer}>
        <Header
          outerContainerStyles={{height: 55 }}
          backgroundColor={headerBackgroundColor}
          placement="left"
          leftComponent={<LeftComponent />}
          centerComponent={{ text: 'EARNINGS', style: { color: '#fff', fontWeight: 'bold', fontSize:20 } }}
          rightComponent={<RightComponent/>}
        />
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <View style={{ alignItems: 'center', alignSelf: 'center'}}>
            <Text style={{ textAlign : 'center', fontSize: 16 }}>Work is Progress of Tool Earning</Text>
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
    alignItems: 'center',
    justifyContent: 'center'
  },
  footerContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'white',
  }
});