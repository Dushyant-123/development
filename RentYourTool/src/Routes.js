import React, { Component } from 'react';
import { View, Text, StyleSheet, PixelRatio, Image } from 'react-native';
import {Router, Stack, Scene, Tabs } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';

import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Details from './pages/Details';
import ContactOwner from './pages/ContactOwner';
import Registration from './pages/Registration';

import ShowcaseYourToolPage from './showCase/screen1';
import Thingstoknowpage from './showCase/screen2';
import ThingsYouNeedpage from './showCase/screen3';
import ToolDetailspage from './showCase/toolDetails';
import Promote from './showCase/Promote';
import ToolAvailable from './showCase/ToolAvailable';
import ToolImageVideo from './showCase/uploadPhoto&pic';
import UpdatePhoto from './showCase/updatePhoto';
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
import CheckoutPage from './tabs/Checkout';
import PaymentPage from './tabs/Payment';

import OwnerMessageScreen from './ownerTabs/message';
import OwnerToolsScreen from './ownerTabs/tool';
import OwnerToolsDetailsScreen from './ownerTabs/toolDetails';
import ToolReviewScreen from './ownerTabs/toolReviewScreen';
import OwnerCalendarScreen from './ownerTabs/calendar';
import OwnerEarningsScreen from './ownerTabs/earnings';
import OwnerProfileScreen from './ownerTabs/ownerProfile';
import OwnerMessageDetailsScreen from './ownerTabs/ownerShowMessageDetails';
import OwnertoolDetailsLink from './ownerTabs/toolDetailsLink';

import { HomeTabIcon, SearchTabIcon, MessageTabIcon, RentalTabIcon, FavoriteTabIcon, ProfileTabIcon,
	OwnerMessageTabIcon, OwnerCalendarTabIcon, OwnerEarningTabIcon, OwnerProfileTabIcon, OwnerToolTabIcon } from './components/TabIcon';
import UploadePhotoPic from './showCase/uploadPhoto&pic';

export default class Routes extends Component{
	render() {
		return(
			<Router>
			    <Stack key="root" hideNavBar={true}>
					<Scene key="login" component={Login} title="Login"   initial={true}   />
					<Scene key="signup" component={Signup} title="Register"/>
					<Scene key="forgot" component={Login} title="Forgot Password"/>
					<Scene key="registration"   component={CreateAccount} title="Register" />
					<Scene key="response" component={Signup} title="Login"/>

					<Scene key="mainScreen"  component={ShowcaseYourToolPage} title="SHOWCASE YOUR TOOL" />
					<Scene key="ShowcaseSkip" component={Thingstoknowpage} title="THINGS TO KNOW BEFORE YOU START"/>
					<Scene key="ThingstoknowSkip" component={ThingsYouNeedpage} title="THINGS YOU NEED BEFORE YOU START"/>
					<Scene key="Thingsyourneed"  component={ToolDetailspage} title="TELL US ABOUT YOUR TOOL" />
					<Scene key="PromoteYourTool"  component={Promote} title="Promote Your Tool" />
					<Scene key="TOOLAVAILABILITY"    component={ToolAvailable} title="ToolAvailable" />
					<Scene key="photoVideo"  component={UploadePhotoPic} title="Photo/Video" />
					<Scene key="updatePhoto"  component={UpdatePhoto} title="Photo/Video" />
					<Scene key="publish"   component={PublishSuccessfully} title="Publish" />					

					<Scene key="tabbar1"  tabs={true} showLabel={false} tabBarStyle={styles.tabBarStyle} tabBarPosition="bottom">
						<Scene key="Dashboard" hideNavBar={true} icon={SearchTabIcon} title="Search" >
							<Scene key="Dashboard" icon={SearchTabIcon} title="Search" component={Dashboard} hideNavBar={true} />
							<Scene key="search" icon={SearchTabIcon} title="Search" component={SearchScreen} hideNavBar={true} />
							<Scene key="Details" icon={SearchTabIcon} title="Search" component={Details} hideNavBar={true} />
							<Scene key="ContactOwner"  icon={SearchTabIcon} title="Search" component={ContactOwner} hideNavBar={true}/>
							<Scene key="Checkout"  icon={SearchTabIcon} component={CheckoutPage} title="Checkout"  hideNavBar={true} />
							<Scene key="Payment" icon={SearchTabIcon} title="Payment" component={PaymentPage} hideNavBar={true} />
						</Scene>
						<Scene key="message"  hideNavBar={true}  icon={MessageTabIcon} title="Messages" onPress={() => Actions.message()}>
							<Scene key="message" icon={MessageTabIcon} title="Messages" component={MessageScreen} hideNavBar={true} />
							<Scene key="showMessageDetails" icon={MessageTabIcon} title="Message" component={MessageDetailsScreen} hideNavBar={true} />
						</Scene>
						<Scene key="excursions"  hideNavBar={true} icon={RentalTabIcon} title="Rentals" onPress={() => Actions.excursions()}>
							<Scene key="excursions" icon={RentalTabIcon} title="Rentals" component={ExcursionsScreen} hideNavBar={true}/>
							<Scene key="ratingreview" icon={RentalTabIcon} title="Dashboard" component={RatingComponent} hideNavBar={true} />
							<Scene key="toolReview" icon={RentalTabIcon} title="Tool Review" component={ToolReviewScreen} hideNavBar={true}/>							
							<Scene key="editTool" icon={RentalTabIcon} title="Rentals" component={EditToolScreen} hideNavBar={true}/>
							<Scene key="excurstionsDetails" icon={RentalTabIcon} title="Tool Details" component={ExcursionsToolScreen} hideNavBar={true}/>														
						</Scene>
						<Scene key="favorite" hideNavBar={true} icon={FavoriteTabIcon} title="Favorites" refresh={() => Actions.refresh({ key: 'favorite' }) }>
							<Scene key="favorite" icon={FavoriteTabIcon} title="Favorites" component={FavouriteScreen} hideNavBar={true} />
							<Scene key="favoriteDetails" icon={FavoriteTabIcon} title="Favorite" component={FavouriteDetailsScreen} hideNavBar={true}/>	
						</Scene>
						<Scene key="myProfile" hideNavBar={true} icon={ProfileTabIcon} title="Profile" onPress={() => Actions.myProfile()}>
							<Scene key="myProfile" icon={ProfileTabIcon} title="Profile" component={MyProfileScreen} hideNavBar={true}  />
							<Scene key="changePassword" icon={ProfileTabIcon} title="Profile" component={ChangePasswordScreen} hideNavBar={true} />
							<Scene key="editProfile" icon={ProfileTabIcon} title="Profile" component={EditProfileScreen} hideNavBar={true} />
						</Scene>
					</Scene>

					<Scene key="tabbar2"   tabs={true} showLabel={false} tabBarStyle={styles.tabBarStyle} tabBarPosition="bottom">
						<Scene key="ownerMessage" hideNavBar={true} icon={OwnerMessageTabIcon} title="Messages" >
							<Scene key="ownerMessage" icon={OwnerMessageTabIcon} title="Messages" component={OwnerMessageScreen} hideNavBar={true}/>	
							<Scene key="ownerMessageDetails" icon={OwnerMessageTabIcon} title="Messages" component={OwnerMessageDetailsScreen} hideNavBar={true}/>
						</Scene>
						<Scene key="ownerTool"  hideNavBar={true} icon={OwnerToolTabIcon} title="Tools">
							<Scene key="ownerTool" icon={OwnerToolTabIcon} title="Tools" component={OwnerToolsScreen} hideNavBar={true}/>
							<Scene key="ownerToolDetails" icon={OwnerToolTabIcon} title="Tool Details" component={OwnerToolsDetailsScreen} hideNavBar={true}/>
							<Scene key="toolDetailsLink" icon={OwnerToolTabIcon} title="Tool Details" component={OwnertoolDetailsLink} hideNavBar={true}/>																			
						</Scene>
						<Scene key="ownerCalendar" icon={OwnerCalendarTabIcon} title="Calendar" component={OwnerCalendarScreen} hideNavBar={true}/>
						<Scene key="ownerEarnings" icon={OwnerEarningTabIcon} title="Earnings" component={OwnerEarningsScreen} hideNavBar={true}/>
						<Scene key="ownerProfile" icon={OwnerProfileTabIcon} title="Profile" component={OwnerProfileScreen} hideNavBar={true}/>
					</Scene>
				</Stack>
			</Router>
		)
	}
}

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