import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity 
} from 'react-native';

import {Actions} from 'react-native-router-flux';

export default class CreateButton extends Component {
  registration() {
    Actions.registration()
  }

  render(){
    return(
      <View style={styles.container}>
        <TouchableOpacity  onPress={this.registration} style={styles.button}>
          <Text style={styles.buttonText}>Create New Account</Text>  
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container : {
    flexGrow: 1,
    justifyContent:'center',
    alignItems: 'center',
    width : 300,
  },
  button : {
    width: undefined,
    height: undefined,
    alignSelf: 'stretch',
    backgroundColor : '#00c1af',
    height : 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 20,
    color: '#ffffff',
    textAlign: 'center',
  }
});