import React from 'react';
import { Text, View, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import HomeScreen from './Test1/dashboard';
import DetailsScreen from './Test1/details';
import FavoriteScreen from './Test2/favorite';
import FavoriteDetailsScreen from './Test2/favoriteDetails';
import RentalsScreen from './Test3/rentals';


const HomeStackScreen = createStackNavigator({
  Home: HomeScreen,
  Details: DetailsScreen,
},
{
  headerMode: 'none',
  navigationOptions: {
      headerVisible: false,
  }
});


export default createBottomTabNavigator({
  Home: HomeStackScreen,
  Favorite: FavoriteScreen,
  Rentals: RentalsScreen,
  favoriteDetails: FavoriteDetailsScreen
},
{
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = focused ? require('./images/ownerToolIn.png') : require('./images/ownerToolAc.png');
        } else if (routeName === 'Favorite') {
          iconName = focused ? require('./images/favoriteIn.png') : require('./images/favoriteAc.png');
        }
        return <Image style={{ width:38, height:30, marginTop:5,  }} source={iconName}/>;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
});
