import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  StyleSheet, 
} from 'react-native';

import * as Progress from 'react-native-progress';
import Icon from 'react-native-vector-icons/FontAwesome';
const ImagePicker = require('react-native-image-picker');
import { headerBackgroundColor, buttonBackgroundColor } from '../styles';  //common BackgroundColor style for Header.



class MultiImageUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isUploading: false,
      uploadPercent: 0,
      source: '',
    };
  }

  selectPhotoTapped() {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true
      }
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled photo picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const uri = response.uri;
        this.setState({
          source: uri,
        });
        this.props.imgShow = [...this.props.imgShow, uri]
      }
    });
  }


  removeImage = () => {
    this.props.removeImage(id);
  }

  _renderUploadButton = () => {
    const { maxImages, images = [] } = this.props;
    if (maxImages === -1 || images.length < maxImages) {
      return (
        <View>
            <TouchableOpacity style={{alignItems:'center', justifyContent:'center',marginTop:0 }} onPress={this.selectPhotoTapped.bind(this)}>
                {
                    this.state.source === '' ? <Image style={{ width:100, height:100,borderRadius:100/2 }} source={require('../images/photo.png')} /> :
                    <View style={{ backgroundColor: buttonBackgroundColor, padding: 10 }}><Text style={styles.fileTitle}> + Add More Image</Text></View>
                }
            </TouchableOpacity>
        </View>
      );
    }
    return null;
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.container}>{this._renderUploadButton()}</View>
        <View style={{ flexDirection: 'row', margin: 5 }}>
            {   
                this.props.imgShow.length > 1 ? this.props.imgShow.map((item) => <View style={{ marginLeft: 10, marginRight: 10 }}><Image style={{ width:100, height:100 }} source={{ uri : item }} /></View>) :
                    <Image style={{ width:100, height:100 }} source={{ uri : this.state.source }} />
            }
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center', 
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 10
  },
  fileTitle: {
    color: 'white',
    marginLeft: 5,
    fontSize: 16,
  },
  addMoreImage:{
    alignItems: 'center', 
    alignSelf: 'center', 
    width: 150, 
    height: 25, 
    backgroundColor: 'white', 
    borderColor: 'black', 
    borderWidth: 1, 
    borderRadius: 5,
  },
});

export default MultiImageUpload;

