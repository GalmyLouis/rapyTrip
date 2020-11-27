import React from 'react';
import { auth, fire } from '../firebase';
import { IonContent, IonButton, isPlatform } from '@ionic/react';
import { GooglePlus } from '@ionic-native/google-plus';
import './Style.css';

(window as any).fire = fire;
(window as any).auth = auth;
(window as any).google = GooglePlus;

function signIn() {
	const googleProv = new fire.auth.GoogleAuthProvider()
	auth.signInWithPopup(googleProv).then(res => {
		// console.log(res)

		location.href = '#/';
	})
}

const googlePlusLogin = () => {

	if (isPlatform("mobile")) {


		GooglePlus.login({
			'scopes': 'profile email ',
			'webClientId': '55660796852-b95fk8jovsulvd8pu5tpngma0j137eh2.apps.googleusercontent.com',
			'offline': true
		}).then(cred => {
			console.log(cred)
		}).catch(err => {
			console.log(err)
		})

	}
}

(window as any).login = googlePlusLogin

const Login: React.FC = props => {
	return (
		<IonContent>
			<div id="loginBox">
				<IonButton color="primary" onClick={signIn}>
					Sign In
				</IonButton>
			</div>
		</IonContent>
	)
}

export default Login;