import React, { Component } from 'react';
import {
   StyleSheet,
   Platform,
   Alert, 
} from 'react-native';
export default StyleSheet.create({
  container : {
    flexGrow: 1,
    justifyContent:'center',
        backgroundColor:'#5153e8',
    alignItems: 'center'
  },
    CircleShapeView: {
    width: 150,
    height: 150,
    borderRadius: 150/2,
    backgroundColor: '#ffffff',
    margin: 5,
    paddingTop: ( Platform.OS === 'ios' ) ? 20 : 0
},
 inputBox: {
    width: 280,
    height: 40,
    paddingHorizontal: 16,
    color:'#ffffff',
    marginVertical: 10,
  
  },
  picker: {
    width: 280,
    height: 40,
    color:'#ffffff'  
  
  },
sectionStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,    
    height: 40,    
    margin: 10
},
ImageStyle: {
    position: 'absolute',
    top: 50,
    left: 50,
    width: 50,
    height: 50
   },
   ImageStyleedit: {
    padding: 10,
    height: 25,
    width: 25,
    resizeMode : 'stretch',
    alignItems: 'center'
},
  logoText : {
    marginVertical: 10,
    fontSize:18,
    position: 'absolute',
    top: 80,
    left: 30,
    color:'rgba(0, 0, 0, 0.7)'
  },
   textBoxBtnHolder:
  {
    position: 'relative',
    alignSelf: 'stretch',
    justifyContent: 'center'
  },

  textBox:
  {
    fontSize: 18,
    alignSelf: 'stretch',
    height: 45,
    paddingRight: 45,
    paddingLeft: 8,
  
    paddingVertical: 0,
   
  },

  visibilityBtn:
  {
    position: 'absolute',
    right: 3,
    height: 40,
    width: 35,
    padding: 5
  },
button : {
    width: 300,
    height: 50,
    backgroundColor: '#FC7100',
    marginVertical: 10,
    paddingVertical: 13,
  },

  buttonText: {
    fontSize: 20,
    fontWeight: '500',
    color: '#ffffff',
    textAlign: 'center',
  },
  btnImage:
  {
    resizeMode: 'contain',
    height: '100%',
    width: '100%'
  }
});