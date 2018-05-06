import React, { Component, PureComponent } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image, ImageBackground } from 'react-native'

import { width, height } from '../common/confignew'
var width1 = width

export default class StdBtn extends PureComponent {
  render() {
    const{text,heightlighted,action,width,disabled,error,backColor,rounded,innerComp,withShadow,textColor,fontSize,iconImage,heighlightBackColor,heighlightTextColor,textWidth,textStyle,iconStyle,height,backImage,refName,disabledBtn,innerStyle}=this.props;const BtnComp=backImage ? ImageBackground:View;
    return (
      <TouchableOpacity disabled={disabledBtn}style={[{width:'80%',height:'30%',marginBottom : 100,justifyContent:'center',alignItems:'center',padding:2},width &&{width:width + 14},height &&{height:height + 14},]}onPress={action}><BtnComp{...this.props}source={backImage ? backImage:null}style={[{width:'100%',height:'100%',borderRadius:2,justifyContent:'center',alignItems:'center',paddingHorizontal:width1(2)},rounded &&{borderRadius:width1(20),},withShadow ? backColor !='transparent' ?{elevation:4,shadowColor:'#000',shadowOffset:{width:0,height:1},shadowOpacity:.2,shadowRadius:.2,}:{borderWidth:1,borderColor:'#E7DED7',borderStyle:'solid'}:null,heightlighted ? heighlightBackColor ?{backgroundColor:heighlightBackColor}:{backgroundColor:'#007DC6'}:{backgroundColor:backColor},disabled &&{opacity:.4},error &&{backgroundColor:'#282C34'},iconImage &&{flexDirection:'row',alignItems:'center',justifyContent:'center'},height &&{height:height},width &&{width:width},backImage &&{overflow:'hidden'},innerStyle && innerStyle]}>{iconImage ? <View style={[{height:'40%',width:'40%',},iconStyle && iconStyle]}><Image source={iconImage}style={{height:'100%',width:'100%',resizeMode:'contain',}}/></View>:null}{innerComp ? innerComp :<Text style={[{fontSize:width1(4.1)},heightlighted ? heighlightTextColor ?{color:heighlightTextColor}:{color:'white'}:textColor ?{color:textColor}:{color:'#3177A5'},fontSize &&{fontSize:fontSize},textWidth &&{width:textWidth},textStyle && textStyle]}>{text}</Text>}</BtnComp></TouchableOpacity> 
    );
  }
}

const styles = {}