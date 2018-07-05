import React, { Component } from 'react';
import { View, Text, StyleSheet, PixelRatio, Image } from 'react-native';
import {Router, Stack, Scene, Tabs } from 'react-native-router-flux';
import { headerBackgroundColor, ownerFotterColor, renterFotterColor } from '../styles';
import Icon from 'react-native-vector-icons/FontAwesome';

export const OwnerMessageTabIcon = (props) => {
	const color = props.focused ? ownerFotterColor : 'black';
	return (
		<View style={{flex:1, flexDirection:'column', alignItems:'center', alignSelf:'center', justifyContent: 'center'}}>
		    {
				props.focused ? <Image style={{ width:30, height:25, marginTop:5}} source={require('../images/ownerMessageAc.png')}/> :
				<Image style={{width:30, height:25, marginTop:5}} source={require('../images/messageIn.png')}/>
			}
		    <Text style={{color: color, fontSize: 12}}>{props.title}</Text>
		</View>
	)
};

export const OwnerToolTabIcon = (props) => {
	const color = props.focused ? ownerFotterColor : 'black';
	return (
		<View style={{flex:1, flexDirection:'column', alignItems:'center', alignSelf:'center', justifyContent: 'center'}}>
		    {
				props.focused ? <Image style={{width:38, height:30, marginTop:5}} source={require('../images/ownerToolAc.png')}/> :
				<Image style={{width:38, height:30, marginTop:5}} source={require('../images/ownerToolIn.png')}/>
			}
		    <Text style={{color: color, fontSize: 12}}>{props.title}</Text>
		</View>
	)
};


export const OwnerCalendarTabIcon = (props) => {
	const color = props.focused ? ownerFotterColor : 'black';
	return (
		<View style={{flex:1, flexDirection:'column', alignItems:'center', alignSelf:'center', justifyContent: 'center'}}>
		    {
				props.focused ? <Image style={{width:30, height:25, marginTop:5}} source={require('../images/calendarAc.png')}/> :
				<Image style={{width:30, height:25, marginTop:5}} source={require('../images/calendarIn.png')}/>
			}
		    <Text style={{color: color, fontSize: 12}}>{props.title}</Text>
		</View>
	)
};

export const OwnerEarningTabIcon = (props) => {
	const color = props.focused ? ownerFotterColor : 'black';
	return (
		<View style={{flex:1, flexDirection:'column', alignItems:'center', alignSelf:'center', justifyContent: 'center'}}>
		    {
				props.focused ? <Image style={{width:30, height:25, marginTop:5}} source={require('../images/earningAc.png')}/> :
				<Image style={{width:30, height:25, marginTop:5}} source={require('../images/earningIn.png')}/>
			}
		    <Text style={{color: color, fontSize: 12}}>{props.title}</Text>
		</View>
	)
};

export const OwnerProfileTabIcon = (props) => {
	const color = props.focused ? ownerFotterColor : 'black';
	return (
		<View style={{flex:1, flexDirection:'column', alignItems:'center', alignSelf:'center', justifyContent: 'center'}}>
		    {
				props.focused ? <Image style={{width:30, height:25, marginTop:5}} source={require('../images/ownerProfileAc.png')}/> :
				<Image style={{width:30, height:25, marginTop:5}} source={require('../images/profileIn.png')}/>
			}
		    <Text style={{color: color, fontSize: 12}}>{props.title}</Text>
		</View>
	)
};

export const HomeTabIcon = (props) => {
	const color = props.focused ? renterFotterColor : 'black';
	return (
		<View style={{flex:1, paddingTop: 5, flexDirection:'column', alignItems:'center', alignSelf:'center', justifyContent: 'center'}}>
		    {
				props.focused ? <Icon name="home" color={color} size={27} /> :
				<Icon name="home" color={color} size={22} />
			}
		    <Text style={{color: color, fontSize: 12, marginTop: 2 }}>{props.title}</Text>
		</View>
	)
};


export const SearchTabIcon = (props) => {
	const color = props.focused ? renterFotterColor : 'black';
	return (
		<View style={{flex:1, flexDirection:'column', alignItems:'center', alignSelf:'center', justifyContent: 'center'}}>
		    {
				props.focused ? <Image style={{width:30, height:25, marginTop:5}} source={require('../images/searchAc.png')}/> :
				<Image style={{width:30, height:25, marginTop:5}} source={require('../images/searchIn.png')}/>
			}
		    <Text style={{color: color, fontSize: 12}}>{props.title}</Text>
		</View>
	)
};

export const MessageTabIcon = (props) => {
	const color = props.focused ? renterFotterColor : 'black';
	return (
		<View style={{flex:1, flexDirection:'column', alignItems:'center', alignSelf:'center', justifyContent: 'center'}}>
		    {
				props.focused ? <Image style={{width:30, height:25, marginTop:5}} source={require('../images/messageAc.png')}/> :
				<Image style={{width:30, height:25, marginTop:5}} source={require('../images/messageIn.png')}/>
			}
		    <Text style={{color: color, fontSize: 12}}>{props.title}</Text>
		</View>
	)
};
export const FavoriteTabIcon = (props) => {
	const color = props.focused ? renterFotterColor : 'black';
	return (
		<View style={{flex:1, flexDirection:'column', alignItems:'center', alignSelf:'center', justifyContent: 'center'}}>
		    {
				props.focused ? <Image style={{width:30, height:25, marginTop:5}} source={require('../images/favoriteAc.png')}/> :
				<Image style={{width:30, height:25, marginTop:5}} source={require('../images/favoriteIn.png')}/>
			}
		    <Text style={{color: color, fontSize: 12}}>{props.title}</Text>
		</View>
	)
};

export const ProfileTabIcon = (props) => {
	const color = props.focused ? renterFotterColor : 'black';
	return (
		<View style={{flex:1, flexDirection:'column', alignItems:'center', alignSelf:'center', justifyContent: 'center'}}>
		    {
				props.focused ? <Image style={{width:30, height:25, marginTop:5}} source={require('../images/profileAc.png')}/> :
				<Image style={{width:30, height:25, marginTop:5}} source={require('../images/profileIn.png')}/>
			}
		    <Text style={{color: color, fontSize: 12}}>{props.title}</Text>
		</View>
	)
};

export const RentalTabIcon = (props) => {
	const color = props.focused ? renterFotterColor : 'black';
	return (
		<View style={{flex:1, flexDirection:'column', alignItems:'center', alignSelf:'center', justifyContent: 'center'}}>
		    {
				props.focused ? <Image style={{width:30, height:25, marginTop:5}} source={require('../images/rentalAc.png')}/> :
				<Image style={{width:30, height:25, marginTop:5}} source={require('../images/rentalIn.png')}/>
			}
		    <Text style={{color: color, fontSize: 12}}>{props.title}</Text>
		</View>
	)
};
