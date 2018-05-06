import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
   Image,
    TextInput,
  TouchableOpacity 
} from 'react-native';
import FBSDK, {
    LoginManager
} from 'react-native-fbsdk'
import Ins from 'react-native-instagram-login';
import Cookie from 'react-native-cookie';
import {Actions} from 'react-native-router-flux';




export default class FacebookButton extends Component {
    constructor(props) {
    super(props)
    this.state = {

    }
  }
  SocialSuccessLogin() {
		Actions.SocialSuccessLogin()
	}
   logout() {
    Cookie.clear().then(() => {
      this.setState({ token: null })
    })
  }
_fbAuth() {
    LoginManager.logInWithReadPermissions(['public_profile']).then(
        function(result) {
            if (result.isCancelled) {
                alert('Login cancelled');
            } else {
                alert('Login success with permissions: ' +
                    result.grantedPermissions.toString());
                this.SocialSuccessLogin()
            }
        },
        function(error) {
            alert('Login fail with error: ' + error);
        }
    );

}
  


	render(){
		return(
			<View style={styles.container}>
				<TouchableOpacity style={styles.facebookbutton} onPress={this._fbAuth}>
		    	 <Image source={require('../images/face.png')}/>

			 </TouchableOpacity>
			 		 		 	
		<View>
        {!this.state.token ? (
          <TouchableOpacity style={styles.instagramkbutton} onPress={() => this.refs.ins.show()}>
            <Image source={require('../images/insta.png')}/>
          </TouchableOpacity>
        ) : (
                        
              this.SocialSuccessLogin()
           
          )
        }
          {this.state.failure && <View>
            alert('Something went wrong.please try again');
          </View>}
        <Ins
          ref='ins'
          clientId='61ad8600a77343c59487572199f67275'
          redirectUrl='https://google.com'
          scopes={['public_content+follower_list']}
          onLoginSuccess={(token) => this.setState({ token })}
          onLoginFailure={(data)  => this.setState({failure: data})}
        />
      </View>
			</View>

			)
	}
}

const styles = StyleSheet.create({
	container : {
		flexGrow: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	
	facebookbutton : {
		width: undefined,
		height: undefined,
	  
     	 alignSelf: 'stretch'
		},

	instagramkbutton : {
	    alignSelf: 'stretch',
		width: undefined,
		height: undefined
	   
	},

	buttonText: {
		fontSize: 20,
		fontWeight: '500',
		color: '#ffffff',
		textAlign: 'center',
	}
});