import React, { Component } from 'react';
import {Router, Stack, Scene} from 'react-native-router-flux';

import Login from './pages/Login';
import Signup from './pages/Signup';
import Registration from './pages/Registration';
import ThingsYouNeedpage from './pages/ThingsYouNeedpage';
import Thingstoknowpage from './pages/Thingstoknowpage';
import ShowcaseYourToolPage from './pages/ShowcaseYourToolPage';
import CreateAccount from './pages/CreateAccount';
import ToolDetailspage from './pages/ToolDetailspage';


export default class Routes extends Component<{}> {
	render() {
		return(
			<Router>
			    <Stack key="root" hideNavBar={true}>
			      <Scene key="login" component={Login} title="Login" initial={true}/>
			      <Scene key="signup" component={Signup} title="Register"/>
			      <Scene key="forgot" component={Login} title="Forgot Password"/>
			      <Scene key="registration" component={CreateAccount} title="Register"/>
			     <Scene key="response" component={Signup} title="Login"/>			   
			     <Scene key="mainscreen" component={ShowcaseYourToolPage} title="SHOWCASE YOUR TOOL"/>
			     <Scene key="ShowcaseSkip" component={Thingstoknowpage} title="THINGS TO KNOW BEFORE YOU START"/>
			     <Scene key="ThingstoknowSkip" component={ThingsYouNeedpage} title="THINGS YOU NEED BEFORE YOU START"/>
		         <Scene key="Thingsyourneed" component={ToolDetailspage} title="TELL US ABOUT YOUR TOOL"/>
	
		
			    </Stack>
			 </Router>
			)
	}
}