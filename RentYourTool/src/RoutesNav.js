import React, { Component } from 'react';
import { SwitchNavigator, createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { View, Text, StyleSheet, PixelRatio, Image } from 'react-native';
import {Router, Stack, Scene, Tabs } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';

import LoginScreen from './pages/Login';
import SignupScreen from './pages/Signup';


import Dashboard from './pages/Dashboard';
import Details from './pages/Details';
import CheckoutPage from './tabs/Checkout';
import PaymentPage from './tabs/Payment';
import ContactOwner from './pages/ContactOwner';
import Registration from './pages/Registration';

import ShowcaseYourToolPage from './showCase/screen1';
import Thingstoknowpage from './showCase/screen2';
import ThingsYouNeedpage from './showCase/screen3';
import ToolDetailspage from './showCase/toolDetails';
import Promote from './showCase/Promote';
import ToolAvailable from './showCase/ToolAvailable';
import ToolImageVideo from './showCase/uploadPhoto&pic';
import PublishSuccessfully from './showCase/publish';


import CreateAccount from './pages/CreateAccount';

import FavouriteScreen from './tabs/Favorites';
import FavouriteDetailsScreen from './tabs/FavoriteDetails';
import MessageScreen from './tabs/Message';
import MessageDetailsScreen from './tabs/ShowMessageDetails';
import MyProfileScreen from './tabs/MyProfile';
import EditProfileScreen from './tabs/EditProfile';
import ExcursionsScreen from './tabs/Excursions';
import ExcursionsToolScreen from './tabs/ExcursionsDetails';  //same used for payment page
import RatingComponent from './tabs/Rating&Review';
import EditToolScreen from './tabs/EditToolScreen';
import SearchScreen from './tabs/Search';
import ChangePasswordScreen from './tabs/ChangePassword';
import CheckoutScreen from './tabs/Checkout';
import PaymentScreen from './tabs/Payment';

import OwnerMessageScreen from './ownerTabs/message';
import OwnerToolsScreen from './ownerTabs/tool';
import OwnerToolsDetailsScreen from './ownerTabs/toolDetails';
import ToolReviewScreen from './ownerTabs/toolReviewScreen';
import OwnerCalendarScreen from './ownerTabs/calendar';
import OwnerEarningsScreen from './ownerTabs/earnings';
import OwnerProfileScreen from './ownerTabs/ownerProfile';
import OwnerMessageDetailsScreen from './ownerTabs/ownerShowMessageDetails';

import UploadePhotoPic from './showCase/uploadPhoto&pic';
import CalendarScreen from './ownerTabs/calendar';
import EarningScreen from './ownerTabs/earnings';

const UserLogin = createStackNavigator({
	Login: LoginScreen,
	Signup: SignupScreen,
  },
  {
	headerMode: 'none',
	navigationOptions: {
		headerVisible: false,
  }
});

const HomeStackScreen= createStackNavigator({
	Dashboard: Dashboard,
	Search : SearchScreen,
	Details : Details,
	ContactOwner : ContactOwner,
	CheckoutPage : CheckoutPage,
	PaymentPage : PaymentPage
  },
  {
	headerMode: 'none',
	navigationOptions: {
		headerVisible: false,
	}
  }
);

const RentersMessageStackScreen = createStackNavigator({
	RenterMessage: MessageScreen,
	RenterMessageDetails: MessageDetailsScreen,
  },
  {
	headerMode: 'none',
	navigationOptions: {
		headerVisible: false,
	}
  }
);

const RentalsStackScreen = createStackNavigator({
	Excursion : ExcursionsScreen,
	Rating : RatingComponent,
	Review : ToolReviewScreen,
	ExcursionDetails : ExcursionsToolScreen,
  },
  {
	headerMode: 'none',
	navigationOptions: {
		headerVisible: false,
	}
  }
);

const FavoriteStackScreen = createStackNavigator({
	Favorite : FavouriteScreen,
	FavoriteDetails : FavouriteDetailsScreen,
  },
  {
	headerMode: 'none',
	navigationOptions: {
		headerVisible: false,
	}
  }
);

const RenterProfileStackScreen = createStackNavigator({
	Profile : MyProfileScreen,
	EditProfile : EditProfileScreen,
  },
  {
	headerMode: 'none',
	navigationOptions: {
		headerVisible: false,
	}
  }
);

const OwnerMessageStackScreen = createStackNavigator({
	OwnerMessage: OwnerMessageScreen,
	OwnerMessageDetails: OwnerMessageDetailsScreen,
  },
  {
	headerMode: 'none',
	navigationOptions: {
		headerVisible: false,
	}
  }
);

const ShowCaseStackScreen = createStackNavigator({
	Screen1 : ShowcaseYourToolPage,
	Screen2 : Thingstoknowpage,
	Screen3 : ThingsYouNeedpage,
	Screen4 : ToolDetailspage,
	Screen5 : Promote,
	Screen6 : ToolAvailable,
	Screen7 : UploadePhotoPic,
	Screen8 : PublishSuccessfully,
  },
  {
	headerMode: 'none',
	navigationOptions: {
		headerVisible: false,
	}
  }
);

const OwnerToolStackScreen = createStackNavigator({
	OwnerTool: OwnerToolsScreen,
	OwnerToolDetails: OwnerToolsDetailsScreen,
	Showcase : ShowCaseStackScreen,
  },
  {
	headerMode: 'none',
	navigationOptions: {
		headerVisible: false,
	}
  }
);

const RentarTab = createBottomTabNavigator({
	Search: HomeStackScreen,
	Message: RentersMessageStackScreen,
	Rentals: RentalsStackScreen,
	Favorite: FavoriteStackScreen,
	RenterProfile: RenterProfileStackScreen
  },
  {
	navigationOptions: ({ navigation }) => ({
	tabBarIcon: ({ focused, tintColor }) => {
		const { routeName } = navigation.state;
		let iconName;
		if (routeName === 'Search') {
		  iconName = focused ? require('./images/searchAc.png') : require('./images/searchIn.png');
		} else if (routeName === 'Message') {
		  iconName = focused ? require('./images/messageAc.png') : require('./images/messageIn.png');
		} else if (routeName === 'Rentals') {
		  iconName = focused ? require('./images/rentalAc.png') : require('./images/rentalAc.png');
		}  else if (routeName === 'Favorite') {
		  iconName = focused ? require('./images/favoriteAc.png') : require('./images/favoriteIn.png');
		}  else {
		  iconName = focused ? require('./images/profileAc.png') : require('./images/profileIn.png');
		}
		return <Image style={{ width:30, height:25, marginTop:5}} source={iconName}/>;
	},
	}),
	tabBarOptions: {
	activeTintColor: 'tomato',
	inactiveTintColor: 'gray',
  },
});

const OwnerTab = createBottomTabNavigator({
	Message: OwnerMessageStackScreen,
	Tool: OwnerToolStackScreen,
	Calendar : CalendarScreen,
	Earnings : EarningScreen,
	OwnerProfile: OwnerProfileScreen
  },
  {
	navigationOptions: ({ navigation }) => ({
	tabBarIcon: ({ focused, tintColor }) => {
		const { routeName } = navigation.state;
		let iconName;
		if (routeName === 'Message') {
			iconName = focused ? require('./images/ownerMessageAc.png') : require('./images/messageIn.png');
		  } else if (routeName === 'Tool') {
			iconName = focused ? require('./images/ownerToolAc.png') : require('./images/ownerToolIn.png');
		  } else if (routeName === 'Calendar') {
			iconName = focused ? require('./images/calendarAc.png') : require('./images/calendarIn.png');
		  }  else if (routeName === 'Earnings') {
			iconName = focused ? require('./images/earningAc.png') : require('./images/earningIn.png');
		  }  else {
			iconName = focused ? require('./images/ownerProfileAc.png') : require('./images/profileIn.png');
		  }
		return <Image style={{ width:30, height:25, marginTop:5}} source={iconName}/>;
	},
	}),
	tabBarOptions: {
	activeTintColor: 'tomato',
	inactiveTintColor: 'gray',
  },
});



export default SwitchNavigator(
	{
	  UserLogin : UserLogin,
	  RentarTab : RentarTab,
	  OwnerTab : OwnerTab
	},
	{
	  initialRouteName: 'UserLogin',
	},
  );

const styles = StyleSheet.create({
	container: {
	  flex: 1,
	},
	tabBar: {
	  borderTopColor: 'darkgrey',
	  borderTopWidth: 1 / PixelRatio.get(),
	  backgroundColor: 'ghostwhite',
	  opacity: 0.98
	},
  });