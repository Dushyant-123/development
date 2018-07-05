import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  ToolbarAndroid,
  Text,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Header } from 'react-native-elements';
import {Actions} from 'react-native-router-flux';
import HeaderBackgroundColor from '../styles';

export default class EditScreen extends Component {
  render(){

    const LeftComponent = () => {
      return(
        <Icon.Button size={18} name="chevron-left" backgroundColor="transparent" onPress={() => Actions.pop()} />
      )
    }

    const RightComponent = () => {
      return(
        <View style={{ flexDirection: 'row' }}>
             
        </View>
      )
    }

    console.log(this.props.data, 'EDit')

    return(
      <View style={styles.outerContainer}>
        <Header
          outerContainerStyles={{ height: 55 }}
          backgroundColor={HeaderBackgroundColor}
          placement="left"
          leftComponent={<LeftComponent />}
          centerComponent={{ text: 'TOOL EDIT', style: { color: '#fff', fontWeight: 'bold', fontSize:20, marginBottom: 3 } }}
          rightComponent={<RightComponent/>}
        />
        <View styles={styles.innerContainer}>
          <Text>API Not ready</Text>
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
  }
});